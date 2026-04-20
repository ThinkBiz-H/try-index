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

    const newUrl = await Url.create({ url });

    // queue me daal
    addToQueue(async () => {
      await updateSitemap(url);
      updateRSS(url);
    });

    newUrl.status = "processed";
    await newUrl.save();

    res.json({
      success: true,
      id: newUrl._id,
      status: newUrl.status,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
