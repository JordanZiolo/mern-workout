 // server.js
 import express from 'express';
 import workoutRoutes from './src/routes/workoutRoutes.js';
 import mongoose from 'mongoose';

 const app = express();
 const PORT = process.env.PORT || 4000;

 // Middleware
 app.use(express.json());

 // Routes
 app.use('/api/workouts', workoutRoutes);

 // Test route
 app.get('/', (req, res) => {
   res.json({ message: 'Backend draait!' });
 });

 mongoose.connect(process.env.MONGO_URI)
   .then(() => {
     console.log('Verbonden met MongoDB');

     // Start server ALLEEN als database gelukt is
     app.listen(PORT, () => {
       console.log(`Server draait op http://localhost:${PORT}`);
     });
   })
   .catch((error) => {
     console.error('Database verbinding mislukt:', error.message);
   });