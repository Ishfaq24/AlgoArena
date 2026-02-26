import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getDashboardData, updateStats, addActivity, updateGoals } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', protectRoute, getDashboardData);
router.put('/stats', protectRoute, updateStats);
router.post('/activity', protectRoute, addActivity);
router.put('/goals', protectRoute, updateGoals);

export default router;