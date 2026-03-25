function DeleteWorkout({ workout, fetchWorkouts }) {
  const handleDelete = async () => {
    if (!window.confirm('Weet je het zeker?')) return;

    await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
      method: 'DELETE'
    });

    fetchWorkouts();
  };

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteWorkout;