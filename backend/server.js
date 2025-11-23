

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; 
import landRoutes from './routes/LandRoutes.js'; 

import { protect } from './middleware/authMiddleware.js'; 

dotenv.config();
const app = express();
connectDB();

app.use(express.json()); 

app.get('/protected', protect, (req, res) => {
  res.status(200).json(`Welcome user with ID: ${req.user.id}`);
});

app.use('/auth', authRoutes);



app.use('/land', landRoutes); 


app.get('/', (req, res) => {
  res.send('Server is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
