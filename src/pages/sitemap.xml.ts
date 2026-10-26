import type { APIRoute } from "astro";

// Indexable pages; extend when new routes are added
const pages = ["/"];

export const GET: APIRoute = ({ site }) => {
    // A sitemap needs absolute URLs, so it stays empty until SITE_URL is set
    const urls = site
        ? pages.map(
              (path) =>
                  `  <url>\n    <loc>${new URL(path, site).href}</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n  </url>`,
          )
        : [];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
};
