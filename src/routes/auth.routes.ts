import express from 'express';
import { userControllers } from '../controller/user.controller';

const router = express.Router();

// Auth-only routes
router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.post('/refresh-token', userControllers.refreshToken);

export const AuthRoutes = router;
