import z from "zod";

export const QuestionStatusSchema = z.discriminatedUnion("qOpen", [
	z.object({ qOpen: z.literal(false), openAt: z.iso.datetime().nullable() }),
	z.object({
		qOpen: z.literal(true),
		openUntil: z.iso.datetime(),
	}),
]);
