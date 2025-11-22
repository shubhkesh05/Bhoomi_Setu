import express from 'express';
import {
  getAllUsers,
  getCurrentUser,
  updateUserProfile,
  changePassword
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllUsers);

router.get('/me', protect, getCurrentUser);

router.put('/me', protect, updateUserProfile);

router.put('/me/password', protect, changePassword);

export default router;
