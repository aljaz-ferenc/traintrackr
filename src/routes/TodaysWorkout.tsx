import { weekDays } from "@/components/workout/Workout.tsx";
import useGetAllMesocycles from "@/hooks/api/useGetAllMesocycles.ts";

export default function TodaysWorkout() {
	//TODO: fetch active meso, currently just using the first one from all of them, first workout
	const { data, isLoading } = useGetAllMesocycles();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const todaysWorkout = data?.mesocycles[0]?.workouts[0];

	if (!todaysWorkout) {
		return <div>No active mesocycle.</div>;
	}
	console.log(todaysWorkout);

	return (
		<section className="w-[600px]">
			<h3 className="text-xl font-bold uppercase">
				{data.mesocycles[0].title}
				{" - "}
				{weekDays[data.mesocycles[0].workouts[0].day]}
			</h3>
			{todaysWorkout.exercises.map((exercise) => (
				<div key={exercise.id}>
					<span>{exercise.name}</span>
				</div>
			))}
		</section>
	);
}
