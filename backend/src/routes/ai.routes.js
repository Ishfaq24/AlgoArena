import express from "express";
import { aiTutor } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/tutor", aiTutor);

export default router;
