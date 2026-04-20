import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import submitRoute from "./routes/submit.js";
import linksRoute from "./routes/links.js";
import statusRoute from "./routes/status.js";

import { connectDB } from "./config/db.js";
import Url from "./models/Url.js";

dotenv.config();

const app = express();

// DB connect
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// 🔥 IMPORTANT: static files serve (sitemap, rss)
app.use(express.static(process.cwd()));

// routes
app.use("/api", submitRoute);
app.use("/api", linksRoute);
app.use("/api", statusRoute);

// homepage → redirect
app.get("/", (req, res) => {
  res.redirect("/live");
});

// 🔥 dynamic page (DB based)
app.get("/link/:id", async (req, res) => {
  try {
    const urlData = await Url.findById(req.params.id);

    if (!urlData) return res.status(404).send("Not found");

    res.send(`
      <html>
        <head>
          <title>Indexed Link</title>
          <meta name="robots" content="index, follow" />
        </head>
        <body>
          <h2>Submitted URL</h2>

          <a href="${urlData.url}" target="_blank">
            ${urlData.url}
          </a>

          <hr/>
          <a href="/live">All Links</a>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send("Error");
  }
});

// 🔥 live page (DB based)
app.get("/live", async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });

  const links = urls
    .map((u) => `<li><a href="/link/${u._id}">${u.url}</a></li>`)
    .join("");

  res.send(`
    <html>
      <head>
        <title>Live Links</title>
      </head>
      <body>
        <h2>Live Links</h2>
        <ul>${links}</ul>
      </body>
    </html>
  `);
});

// PORT fix
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
