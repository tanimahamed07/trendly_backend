import express from 'express';
import { userControllers } from '../controller/user.controller';


const router = express.Router();

// Auth routes
router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.post('/refresh-token', userControllers.refreshToken);

// User routes
router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getUserById);
router.patch('/:id', userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);
router.patch('/role', userControllers.updateUserRole);  // ⚠️ নিচে দেখো

export const UserRoutes = router;