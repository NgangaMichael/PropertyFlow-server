// routes/authroutes/authRoute.js
import express from 'express';
import { login, logout, me } from '../../controllers/authcontrollers/authController.js';
import { verifyToken } from '../../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', verifyToken, me);

export default router;