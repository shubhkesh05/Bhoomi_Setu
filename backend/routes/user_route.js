import express from 'express';
import {
  getAllUsers,
  getCurrentUser,
  updateUserProfile,
  changePassword
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Get all users (Admin)
router.get('/', protect, getAllUsers);

// ✅ Get current user details
router.get('/me', protect, getCurrentUser);

// ✅ Update current user profile
router.put('/me', protect, updateUserProfile);

// ✅ Change password
router.put('/me/password', protect, changePassword);

export default router;
