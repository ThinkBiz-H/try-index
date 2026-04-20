import express from "express";
import { getUrls } from "../utils/store.js";

const router = express.Router();

router.get("/links", (req, res) => {
  res.json(getUrls());
});

export default router;
