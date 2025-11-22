
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/user.js';

const router = express.Router();

// ✅ Update Settings (Profile + Password)
router.post('/', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, mobile, aadhaar, notifications, theme, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ✅ Update profile fields
    if (fullName) user.fullName = fullName;
    if (mobile) user.mobile = mobile;

    // ✅ Aadhaar update only if user doesn't have Aadhaar yet
    if (!user.aadhaar && aadhaar) {
      user.aadhaar = aadhaar;
    }

    // ✅ Update notifications
    if (notifications && typeof notifications === 'object') {
      user.notifications.sms = notifications.sms ?? user.notifications.sms;
      user.notifications.email = notifications.email ?? user.notifications.email;
    }

    // ✅ Update theme
    if (theme) user.theme = theme;

    // ✅ Update password if provided
    if (oldPassword && newPassword) {
      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });
      user.password = newPassword; // Hashing happens in pre('save')
    }

    await user.save();
    res.json({
      message: 'Settings updated successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        mobile: user.mobile,
        aadhaar: user.aadhaar || '',
        notifications: user.notifications,
        theme: user.theme
      }
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate Aadhaar or Email detected' });
    }
    res.status(500).json({ message: err.message });
  }
});

export default router;

