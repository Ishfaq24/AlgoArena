import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { aiTutor } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/tutor", protectRoute, aiTutor);

export default router;
