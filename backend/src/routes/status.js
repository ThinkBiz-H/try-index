import express from "express";
import Url from "../models/Url.js";

const router = express.Router();

router.get("/status", async (req, res) => {
  const data = await Url.find().sort({ createdAt: -1 });
  res.json(data);
});

export default router;
