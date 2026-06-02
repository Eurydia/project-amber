import { createFileRoute } from "@tanstack/react-router";
import type z from "zod";
import type { QuestionStatusSchema } from "#/types/schemas/question";

export const Route = createFileRoute("/admin/api/q")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				console.debug(request);
				return Response.json({
					// openUntil: new Date(Date.now() + 1000).toISOString(),
					qOpen: false,
					openAt: new Date(Date.now() + 20_000).toISOString(),
				} satisfies z.output<typeof QuestionStatusSchema>);
			},
		},
	},
});
