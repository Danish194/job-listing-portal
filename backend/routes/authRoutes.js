import express from 'express';
import { login, register, createUser } from '../controllers/authController.js';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Create or update user route
router.post('/createUser', createUser);

export default router;
