import { createServerFn } from "@tanstack/react-start";
import dayjs from "dayjs";
import z from "zod";
import { prisma } from "#/db";
import { getServerAuthSession } from "#/integrations/auth/auth";

export const submitQuestion = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      question: z.string().nonempty().trim().normalize().max(200),
    }),
  )
  .handler(async ({ data }) => {
    const session = await getServerAuthSession();
    if (session === null) {
      return false;
    }

    return await prisma.question.create({
      data: { question: data.question, sender: session.user.email },
    });
  });
export const getQuestionsFromPerson = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string().nonempty() }))
  .handler(async ({ data }) => {
    const res = await prisma.question
      .findMany({
        where: { sender: data.id },
        include: {
          answer: true,
        },
      })
      .catch(() => []);
    return res.map(({ answer, id, question }) => ({
      id: String(id),
      answer: answer?.answer ?? null,
      questions: [{ question, id: String(id) }],
    }));
  });

export const getQnaSession = createServerFn({ method: "GET" }).handler(
  async (): Promise<
    { qnaOpen: false; openAt: null | Date } | { qnaOpen: true; openUntil: Date }
  > => {
    const res = await prisma.qnaSession
      .findFirst({
        orderBy: { createdAt: "desc" },
      })
      .catch(() => null);

    if (res === null) {
      return { qnaOpen: false, openAt: null };
    }

    if (dayjs().isBefore(res.openAt)) {
      return { qnaOpen: false, openAt: res.openAt };
    }

    if (dayjs().isAfter(res.openUntil)) {
      return { qnaOpen: false, openAt: null };
    }

    return { qnaOpen: true, openUntil: res.openUntil };
  },
);

export const getAggregatedQuestions = createServerFn({ method: "GET" })
  .inputValidator(z.object({ page: z.number().int().nonnegative() }))
  .handler(async ({ data }) => {
    const group = new Map<
      string,
      {
        id: string;
        answer: string | null;
        questions: Array<{ id: string; question: string }>;
      }
    >();
    const result: Array<{
      questions: Array<{ id: string; question: string }>;
      answer: string | null;
      id: string;
    }> = [];

    for (const row of await prisma.question.findMany({
      include: { answer: true },
      take: 25,
      skip: data.page * 25,
      orderBy: {
        sentAt: "desc",
      },
    })) {
      if (row.answerId === null) {
        result.push({
          questions: [{ id: String(row.id), question: row.question }],
          answer: null,
          id: String(row.id),
        });
        continue;
      }
      const g = group.get(row.answerId);
      if (g !== undefined) {
        g.questions.push({ id: String(row.id), question: row.question });
      } else {
        group.set(row.answerId, {
          id: String(row.id),
          answer: row.answer?.answer ?? null,
          questions: [{ id: String(row.id), question: row.question }],
        });
      }
    }

    result.push(...group.values());

    return {
      result,
      totalPageCount: Math.ceil((await prisma.question.count()) / 25),
      currPageIndex: data.page,
    };
  });
