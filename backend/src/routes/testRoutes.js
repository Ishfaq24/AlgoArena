import express from "express";
import { generateTest } from "../controllers/testController.js";

const router = express.Router();
router.post('/generate', generateTest);

export default router;