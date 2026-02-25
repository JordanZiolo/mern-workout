// Importeer Express
import express from 'express';

// Maak Express app
const app = express();

// Haal PORT uit .env (of gebruik 4000)
const PORT = process.env.PORT || 4000;

// Middleware: lees JSON
app.use(express.json());

// GET alle workouts
app.get('/api/workouts', (req, res) => {
  res.json({ 
    message: 'Alle workouts',
    data: [] // Later echte data
  });
});

// POST nieuwe workout
app.post('/api/workouts', (req, res) => {
  const { title, reps, load } = req.body;

  res.json({ 
    message: 'Workout aangemaakt',
    data: { title, reps, load }
  });
});

// PATCH workout
app.patch('/api/workouts/:id', (req, res) => {
  const { id } = req.params;

  res.json({ 
    message: `Workout ${id} aangepast`,
    updates: req.body
  });
});

// DELETE workout
app.delete('/api/workouts/:id', (req, res) => {
  const { id } = req.params;

  res.json({ 
    message: `Workout ${id} verwijderd`
  });
});

// GET één workout
app.get('/api/workouts/:id', (req, res) => {
  const { id } = req.params;

  res.json({ 
    message: `Workout ${id}`,
    id: id
  });
});

// Start de server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});