import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import workoutRoutes from './src/routes/workoutRoutes.js';
import dotenv from 'dotenv';
 import authRoutes from './src/routes/authRoutes.js'; // Nieuw!
dotenv.config();
 
const app = express();
 
// ✅ CORS (HEEL BELANGRIJK)
app.use(cors({
  origin: 'http://localhost:5173',
   credentials: true
}));
 
app.use(express.json());
 
// routes
app.use('/api/workouts', workoutRoutes);
 app.use('/api/auth', authRoutes); // Nieuw!
// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log('Server draait op http://localhost:4000');
    });
  })
  .catch(err => console.log(err));