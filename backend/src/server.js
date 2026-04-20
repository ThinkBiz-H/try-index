import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import submitRoute from "./routes/submit.js";
import linksRoute from "./routes/links.js";
import statusRoute from "./routes/status.js";

import { connectDB } from "./config/db.js";
import { getUrlById, getUrls } from "./utils/store.js";

dotenv.config();

const app = express();

// ✅ DB connect
connectDB();

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ routes
app.use("/api", submitRoute);
app.use("/api", linksRoute);
app.use("/api", statusRoute);

// ✅ homepage → redirect to live (bot entry)
app.get("/", (req, res) => {
  res.redirect("/live");
});

// ✅ dynamic page
app.get("/link/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const url = getUrlById(id);

  if (!url) return res.status(404).send("Not found");

  res.send(`
    <html>
      <head>
        <title>Indexed Link</title>
        <meta name="robots" content="index, follow" />
      </head>
      <body>
        <h2>Submitted URL</h2>

        <a href="${url}" target="_blank">${url}</a>

        <hr/>

        <a href="/live">All Links</a><br/>
        <a href="/link/${id - 1}">Prev</a> |
        <a href="/link/${id + 1}">Next</a>
      </body>
    </html>
  `);
});

// ✅ live page
app.get("/live", (req, res) => {
  const links = getUrls()
    .map((u, i) => `<li><a href="/link/${i}">${u}</a></li>`)
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

// ✅ IMPORTANT: dynamic PORT (Render fix)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
