import UpdateWorkout from './UpdateWorkout';
import DeleteWorkout from './DeleteWorkout';

function WorkoutItem({ workout, fetchWorkouts }) {
  return (
    <div>
      <h3>{workout.title}</h3>
      <p>Reps: {workout.reps}</p>
      <p>Load: {workout.load}</p>

      <UpdateWorkout workout={workout} fetchWorkouts={fetchWorkouts} />
      <DeleteWorkout workout={workout} fetchWorkouts={fetchWorkouts} />
    </div>
  );
}

export default WorkoutItem;