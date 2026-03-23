import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getSitemapEntries } from "./site-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteOrigin = "https://www.stemise.org";
const sitemapPath = path.resolve(__dirname, "../public/sitemap.xml");

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const sitemapEntries = await getSitemapEntries();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated automatically by scripts/generate-sitemap.js -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(`${siteOrigin}${entry.path}`)}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(sitemapPath, xml, "utf8");
console.log(`Generated sitemap with ${sitemapEntries.length} routes at ${sitemapPath}`);

