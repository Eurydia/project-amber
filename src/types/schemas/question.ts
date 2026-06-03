import z from "zod";

export const QuestionStatusSchema = z.object({
  submission: z.xor([
    z.object({ q: z.null() }),
    z.object({ q: z.string().nonempty(), a: z.null() }),
    z.object({ q: z.string().nonempty(), a: z.string().nonempty() }),
  ]),
  qnaStatus: z.discriminatedUnion("qnaOpen", [
    z.object({
      qnaOpen: z.literal(false),
      openAt: z.iso.datetime().nullable(),
    }),
    z.object({
      qnaOpen: z.literal(true),
      openUntil: z.iso.datetime(),
    }),
  ]),
});
