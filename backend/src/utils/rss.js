import fs from "fs";
import path from "path";

export const updateRSS = (url) => {
  const filePath = path.join(process.cwd(), "rss.xml");

  let content = "";

  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, "utf-8");
  } else {
    content = `<?xml version="1.0"?>
<rss version="2.0">
<channel>
<title>Indexer</title>
</channel>
</rss>`;
  }

  const item = `
  <item>
    <link>${url}</link>
  </item>`;

  content = content.replace("</channel>", `${item}\n</channel>`);
  fs.writeFileSync(filePath, content);
};
