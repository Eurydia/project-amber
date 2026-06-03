import { createFileRoute } from "@tanstack/react-router";
import type z from "zod";
import type { QuestionStatusSchema } from "#/types/schemas/question";

export const Route = createFileRoute("/api/q")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return Response.json({
          qnaStatus: {
            qnaOpen: false,
            openAt: "2026-06-04T05:35:00.000Z",
          },
          // openUntil: new Date(Date.now() + 1000).toISOString(),
          submission: { q: null },
        } satisfies z.output<typeof QuestionStatusSchema>);
      },
      POST: async () => {},
    },
  },
});
