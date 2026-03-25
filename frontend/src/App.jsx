import { useEffect, useState } from 'react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';

function App() {
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/workouts');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setWorkouts([]); // or handle error state
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div>
      <h1>Workout App</h1>

      <WorkoutForm fetchWorkouts={fetchWorkouts} />
      <WorkoutList workouts={workouts} fetchWorkouts={fetchWorkouts} />
    </div>
  );
}

export default App;