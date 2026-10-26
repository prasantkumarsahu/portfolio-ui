import type { APIRoute } from "astro";
import sharp from "sharp";
import { site } from "../data/site";

// 1200×630 social preview rendered at build time in the light theme palette
const escape = (text: string) =>
    text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const GET: APIRoute = async () => {
    const dots = Array.from({ length: 10 }, (_, row) =>
        Array.from({ length: 11 }, (_, col) => `<circle cx="${880 + col * 26}" cy="${70 + row * 26}" r="1.5" fill="#d5d5d1"/>`).join(""),
    ).join("");

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fafaf9"/>
  ${dots}
  <g font-family="Inter, 'Segoe UI', Arial, sans-serif">
    <text x="96" y="110" font-size="26" font-weight="600" fill="#171717">${escape(site.name)}</text>
    <circle cx="100" cy="226" r="5" fill="#171717"/>
    <text x="116" y="232" font-size="18" font-weight="500" letter-spacing="1" fill="#666663">${escape(site.eyebrow.toUpperCase())}</text>
    <text x="96" y="330" font-size="76" font-weight="500" fill="#171717">${escape(site.role)}</text>
    <text x="96" y="400" font-size="24" fill="#666663">${escape(site.tagline)}</text>
    <rect x="96" y="470" width="1008" height="1" fill="#e1e1de"/>
    <text x="96" y="540" font-size="34" font-weight="500" fill="#171717">${escape(site.stats.value)}</text>
    <text x="1104" y="540" font-size="22" fill="#2563eb" text-anchor="end">${escape(site.stats.focus.join(" · "))}</text>
  </g>
</svg>`;

    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
