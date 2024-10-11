import express from 'express';
import { createJob } from '../controllers/jobController.js';
import authMiddleware from '../middleware/authMiddleware.js';  // Import default middleware

const router = express.Router();

router.post('/post', authMiddleware, createJob);  // Use the middleware

export default router;
