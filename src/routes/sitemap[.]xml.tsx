import { createFileRoute } from "@tanstack/react-router";
import { getOriginFromRequest, PUBLIC_ROUTES } from "#/utils/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = getOriginFromRequest(request);
        const urls = PUBLIC_ROUTES.map((pathname) => {
          return [
            "  <url>",
            `    <loc>${escapeXml(`${origin}${pathname}`)}</loc>`,
            "    <changefreq>weekly</changefreq>",
            "    <priority>1.0</priority>",
            "  </url>",
          ].join("\n");
        }).join("\n");

        return new Response(
          [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            urls,
            "</urlset>",
            "",
          ].join("\n"),
          {
            headers: {
              "Cache-Control": "public, max-age=3600",
              "Content-Type": "application/xml; charset=utf-8",
            },
          },
        );
      },
    },
  },
});

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    switch (character) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return character;
    }
  });
}
