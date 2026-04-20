import Url from "../models/Url.js";
import { updateSitemap } from "../utils/sitemap.js";
import { updateRSS } from "../utils/rss.js";
import { addToQueue } from "../utils/queue.js";

export const submitUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL required" });
    }

    // save in DB
    const newUrl = await Url.create({ url });

    // 🔥 public link (IMPORTANT)
    const publicLink = `https://try-index.onrender.com/link/${newUrl._id}`;

    // 🔥 queue processing
    addToQueue(async () => {
      await updateSitemap(publicLink);
      updateRSS(publicLink);

      try {
        // Google ping
        await fetch(
          "https://www.google.com/ping?sitemap=https://try-index.onrender.com/sitemap.xml",
        );

        // Bing ping
        await fetch(
          "https://www.bing.com/ping?sitemap=https://try-index.onrender.com/sitemap.xml",
        );

        console.log("Ping sent 🚀");
      } catch (err) {
        console.log("Ping failed ❌", err);
      }
    });

    // update status
    newUrl.status = "processed";
    await newUrl.save();

    res.json({
      success: true,
      id: newUrl._id,
      status: newUrl.status,
      link: publicLink, // 👈 frontend ke liye
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
