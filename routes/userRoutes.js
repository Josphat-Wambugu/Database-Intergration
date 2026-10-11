import express from 'express';
import * as userController from '../controllers/userController.js';
 
const router = express.Router();
 
// Define user routes
router.post('/createUser', userController.createUser); // Create a new user
router.get('/', userController.getAllUsers); // Get all users
router.put('/:id', userController.updateUser); // Update an existing user
router.delete('/:id', userController.deleteUser); // Delete a user
 
export default router;