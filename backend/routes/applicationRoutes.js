import express from 'express';
import { applyForJob } from '../controllers/applicationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/apply', authMiddleware, applyForJob); 
export default router;
