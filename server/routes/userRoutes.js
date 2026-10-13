import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Mounted at /api/users in server/index.js
router.post('/', userController.createUser); // Create a new user
router.get('/', userController.getAllUsers); // Get all users
router.get('/:id', userController.getUserById); // Get a single user
router.put('/:id', userController.updateUser); // Update an existing user
router.delete('/:id', userController.deleteUser); // Delete a user

export default router;
