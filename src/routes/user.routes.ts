import express from 'express';
import { userControllers } from '../controller/user.controller';

const router = express.Router();

// User CRUD routes (no auth routes here — those are in auth.routes.ts)
router.get('/', userControllers.getUsers);
router.patch('/role', userControllers.updateUserRole);  // Must be ABOVE /:id to prevent conflict
router.get('/:id', userControllers.getUserById);
router.patch('/:id', userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);

export const UserRoutes = router;