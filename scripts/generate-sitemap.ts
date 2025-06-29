import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { routes } from "../src/router/index.ts";

const hostname = process.env.SITE_URL || "https://yetanother.mp";

// Exclude dynamic routes (those with ':')
const staticPaths = routes
  .map((r: any) => (typeof r === "string" ? r : r.path))
  .filter((p: string) => !p.includes(":"));

const urls = staticPaths
  .map((route) => `  <url><loc>${hostname}${route}</loc></url>`) // indentation for readability
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

const outPath = resolve("public", "sitemap.xml");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, xml);

console.log(`Sitemap generated with ${staticPaths.length} routes.`); 