import fs from "fs";
import path from "path";

export const updateSitemap = async (url) => {
  const filePath = path.join(process.cwd(), "sitemap.xml");

  let content = "";

  // current date
  const today = new Date().toISOString().split("T")[0];

  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, "utf-8");

    // ❗ duplicate check
    if (content.includes(url)) {
      return; // already exists → skip
    }
  } else {
    content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
  }

  const newUrl = `
  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
  </url>`;

  content = content.replace("</urlset>", `${newUrl}\n</urlset>`);

  fs.writeFileSync(filePath, content);
};
