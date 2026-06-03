import { createFileRoute } from "@tanstack/react-router";
import { authService } from "#/integrations/auth/auth";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => {
        return authService.handler(request);
      },
      POST: ({ request }) => {
        return authService.handler(request);
      },
    },
  },
});
