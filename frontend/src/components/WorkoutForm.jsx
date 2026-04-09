import { useState } from 'react';

function WorkoutForm({ fetchWorkouts }) {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const workout = {
      title,
      reps: Number(reps),
      load: Number(load)
    };

    await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(workout)
    });

    setTitle('');
    setReps('');
    setLoad('');

    fetchWorkouts();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titel" />
      <input value={reps} onChange={e => setReps(e.target.value)} placeholder="Reps" />
      <input value={load} onChange={e => setLoad(e.target.value)} placeholder="Load" />
      <button>Toevoegen</button>
    </form>
  );
}

export default WorkoutForm;