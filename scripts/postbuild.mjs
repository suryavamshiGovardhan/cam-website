import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const indexHtml = path.join(dist, "index.html");
if (!fs.existsSync(indexHtml)) {
  console.error("postbuild: dist/index.html missing");
  process.exit(1);
}

fs.copyFileSync(indexHtml, path.join(dist, "404.html"));
fs.writeFileSync(path.join(dist, ".nojekyll"), "");
if (fs.existsSync("public/robots.txt")) {
  fs.copyFileSync("public/robots.txt", path.join(dist, "robots.txt"));
}

const articleSlugs = [];
try {
  const camSrc = fs.readFileSync("src/data/cam.ts", "utf8");
  for (const m of camSrc.matchAll(/"slug":\s*"([^"]+)"/g)) articleSlugs.push(m[1]);
} catch {
  /* ignore */
}

const routes = [
  "play",
  "atlas",
  "careers",
  "talk",
  "about",
  "fit",
  "challenge",
  "admin",
  "admin/session",
  ...articleSlugs.map((s) => `articles/${s}`),
  "articles/the-knowing-gap",
];

for (const route of [...new Set(routes)]) {
  const dir = path.join(dist, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(indexHtml, path.join(dir, "index.html"));
}

console.log(`postbuild: wrote index.html into ${routes.length} route folders`);
