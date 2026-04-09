import { useEffect, useState } from 'react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import Navbar from './components/Navbar'; // 🔥 IMPORT

function App() {
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log("Geen token → eerst inloggen");
        return;
      }

      const res = await fetch('http://localhost:4000/api/workouts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log("Backend error:", errorData);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setWorkouts(data);

    } catch (error) {
      console.error('Error fetching workouts:', error);
      setWorkouts([]);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div>
      {/* 🔥 NAVBAR HIER */}
      <Navbar />

      <h1>Workout App</h1>

      <WorkoutForm fetchWorkouts={fetchWorkouts} />
      <WorkoutList workouts={workouts} fetchWorkouts={fetchWorkouts} />
    </div>
  );
}

export default App;