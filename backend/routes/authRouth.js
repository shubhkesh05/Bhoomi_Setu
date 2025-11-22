


  import express from 'express';
  import { signup, login, deleteUser } from '../controllers/authController.js';
  import { protect } from '../middleware/authMiddleware.js';

  import User from '../models/user.js'; // ✅ Your User model

  const router = express.Router(); // ✅ Must come BEFORE using router

  // 🟢 Add the route AFTER router is declared
  router.get('/all', async (req, res) => {
    const users = await User.find();
    res.json(users);
  });

  router.post('/signup', signup);
  router.post('/login', login);

  router.delete('/:id', protect, deleteUser);

  router.get('/userinfo', protect, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('name username');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ name: user.name, username: user.username });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  export default router;

