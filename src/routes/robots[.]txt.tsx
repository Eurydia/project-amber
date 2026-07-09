import { createFileRoute } from "@tanstack/react-router";
import { getOriginFromRequest } from "#/utils/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = getOriginFromRequest(request);
        const body = [
          "User-agent: *",
          "Allow: /",
          "Disallow: /api/",
          "Disallow: /dev",
          "",
          `Sitemap: ${origin}/sitemap.xml`,
          "",
        ].join("\n");

        return new Response(body, {
          headers: {
            "Cache-Control": "public, max-age=3600",
            "Content-Type": "text/plain; charset=utf-8",
          },
        });
      },
    },
  },
});
