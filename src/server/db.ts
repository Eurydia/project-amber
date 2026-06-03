import { createServerFn } from "@tanstack/react-start";
import dayjs from "dayjs";
import z from "zod";
import { createPrisma } from "#/db";
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
    const prisma = createPrisma();
    return await prisma.question.create({
      data: { question: data.question, sender: session.user.email },
    });
  });
export const getQuestions = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string().nonempty() }))
  .handler(async ({ data }) => {
    const prisma = createPrisma();
    const res = await prisma.question.findMany({
      where: { sender: data.id },
      include: {
        answer: true,
      },
    });
    return res;
  });

export const getQnaSession = createServerFn({ method: "GET" }).handler(
  async (): Promise<
    { qnaOpen: false; openAt: null | Date } | { qnaOpen: true; openUntil: Date }
  > => {
    const prisma = createPrisma();
    const res = await prisma.qnaSession.findFirst({
      orderBy: { createdAt: "desc" },
    });

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
