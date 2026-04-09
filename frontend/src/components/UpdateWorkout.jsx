import { useState } from 'react';

function UpdateWorkout({ workout, fetchWorkouts }) {
  const [title, setTitle] = useState(workout.title);
  const [reps, setReps] = useState(workout.reps);
  const [load, setLoad] = useState(workout.load);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        reps: Number(reps),
        load: Number(load)
      })
    });

    fetchWorkouts();
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <input value={reps} onChange={e => setReps(e.target.value)} />
      <input value={load} onChange={e => setLoad(e.target.value)} />
      <button>Update</button>
    </form>
  );
}

export default UpdateWorkout;