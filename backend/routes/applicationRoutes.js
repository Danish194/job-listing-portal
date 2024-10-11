import express from 'express';
import { applyForJob } from '../controllers/applicationController.js'; // Ensure this path is correct
import authMiddleware from '../middleware/authMiddleware.js'; // Ensure this path is correct

const router = express.Router();

router.post('/apply', authMiddleware, applyForJob); // Route to apply for jobs

export default router;
