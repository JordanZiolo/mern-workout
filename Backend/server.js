import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import workoutRoutes from './src/routes/workoutRoutes.js';
import dotenv from 'dotenv';
 
dotenv.config();
 
const app = express();
 
// ✅ CORS (HEEL BELANGRIJK)
app.use(cors({
  origin: 'http://localhost:5173'
}));
 
app.use(express.json());
 
// routes
app.use('/api/workouts', workoutRoutes);
 
// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log('Server draait op http://localhost:4000');
    });
  })
  .catch(err => console.log(err));