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
router.patch('/role', userControllers.updateUserRole);  // Moved above /:id to prevent conflict
router.patch('/:id', userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);

export const UserRoutes = router;