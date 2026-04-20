import express from "express";
import { submitUrl } from "../controllers/submitController.js";

const router = express.Router();

router.post("/submit", submitUrl);

export default router;
