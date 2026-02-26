import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { generateTest } from "../controllers/testController.js";

const router = express.Router();

router.post('/generate', protectRoute, generateTest);

export default router;