// import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
// import './config/db.js';

// import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import landRoutes from './routes/landRoutes.js';
// import mutationRoutes from './routes/mutationRoutes.js';
// import documentRoutes from './routes/DocumentRoutes.js';
// import chatbotRoutes from './routes/chatbotRoutes.js';

// const app = express();
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/lands', landRoutes);
// app.use('/api/mutations', mutationRoutes);
// app.use('/api/documents', documentRoutes);
// app.use('/api/chatbot', chatbotRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



//I MARKED

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // ✅ Make sure path is correct
import landRoutes from './routes/LandRoutes.js'; // ✅ Add this line

import { protect } from './middleware/authMiddleware.js'; // ✅ correct

dotenv.config();
const app = express();
connectDB();

app.use(express.json()); // ✅ Required for POST body


// ✅ Protected route example
app.get('/protected', protect, (req, res) => {
  res.status(200).json(`Welcome user with ID: ${req.user.id}`);
});


// ✅ Register the /auth routes
app.use('/auth', authRoutes);


// ✅ Register the /land routes
app.use('/land', landRoutes); // ✅ ADD THIS LINE HERE


// ✅ Dummy route to check server
app.get('/', (req, res) => {
  res.send('Server is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
