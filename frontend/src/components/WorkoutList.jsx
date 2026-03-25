import WorkoutItem from './WorkoutItem';

const WorkoutList = ({workouts, fetchWorkouts}) => {
  return ( 
    <>
    {workouts.map(workout => (
      <WorkoutItem key={workout._id} workout={workout} fetchWorkouts={fetchWorkouts} />
    ))}
    </>
   );
}
 
export default WorkoutList;