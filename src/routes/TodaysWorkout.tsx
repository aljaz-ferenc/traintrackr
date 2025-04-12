import RouteTitle from "@/components/shared/RouteTitle.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { weekDays } from "@/components/workout/Workout.tsx";
import type { Exercise, Set as TSet, Workout } from "@/core/types.ts";
import useCompleteWorkout from "@/hooks/api/useCompleteWorkout.ts";
import useGetMesocycleById from "@/hooks/api/useGetMesocyleById.ts";
import { useTodaysWorkoutStore } from "@/state/TodaysWorkoutStore.ts";
import useUserStore from "@/state/UserStore.ts";
import { differenceInWeeks, getDay, isToday } from "date-fns";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import RouteFallback from "@/components/RouteFallback/RouteFallback.tsx";

export default function TodaysWorkout() {
	const [user] = useUserStore(useShallow((state) => [state.user]));
	const { data, isLoading } = useGetMesocycleById(
		user?.activeMesocycle?.mesocycle._id as string,
	);
	const { mutateAsync } = useCompleteWorkout();
	const [
		exercises,
		setExercises,
		addSetToExercise,
		removeSetFromExercise,
		updateSet,
		constructLog,
	] = useTodaysWorkoutStore(
		useShallow((state) => [
			state.exercises,
			state.setExercises,
			state.addSetToExercise,
			state.removeSetFromExercise,
			state.updateSet,
			state.constructLog,
		]),
	);

	const todaysWorkout = data?.mesocycle.workouts.find(
		(workout) => workout.day === getDay(new Date()),
	);

	useEffect(() => {
		if (!data || exercises.length || !todaysWorkout) return;
		setExercises(todaysWorkout.exercises);
	}, [data, exercises.length, setExercises, todaysWorkout]);

	if(isLoading){
		return <RouteFallback/>
	}

	if (!data) {
		return <>No active mesocycle.</>;
	}

	if(data.mesocycle && !todaysWorkout){
		return <>Rest day</>
	}

	//TODO: add 'completed' to user.activeMesocycle and display the message that the meso has been completed

	const handleCompleteWorkout = async () => {
		const log = constructLog(
			user?.activeMesocycle?.startDate as Date,
			todaysWorkout as Workout<Exercise>,
			user?.activeMesocycle?.mesocycle._id as string,
			user?._id as string,
		);
		await mutateAsync(log);
	};

	if (isLoading || !data) {
		return <div>Loading...</div>;
	}

	if (!todaysWorkout) {
		return <div>No workout?</div>;
	}

	if (user?.lastWorkout && isToday(new Date(user.lastWorkout))) {
		return <>Today's workout completed.</>;
	}
	return (
		<section className="w-[1200px]">
			<RouteTitle title="Today's Workout" />
			<div className='w-[600px] mx-auto'>
			<div className="bg-blue-100 p-2 flex flex-col gap-1 mb-2">
				<span className="uppercase">{data.mesocycle.title}</span>
				<span className="text-xl font-bold uppercase">
					Week{" "}
					{differenceInWeeks(
						new Date(),
						user?.activeMesocycle?.startDate as Date,
					) + 1}
					/6 - {weekDays[todaysWorkout?.day]}
				</span>
			</div>
			<ul className="flex flex-col gap-2 mb-2">
				{exercises.map((exercise, exerciseIndex) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<li key={exerciseIndex} className="bg-blue-100 p-2">
						<span className="uppercase font-bold">{exercise.name}</span>
						<table className="table-auto w-full border-separate border-spacing-2">
							<thead>
								<tr>
									<th>SET</th>
									<th>WEIGHT</th>
									<th>REPS</th>
									<th />
								</tr>
							</thead>
							<tbody>
								{exercise.sets.map((set: TSet, setIndex: number) => (
									<tr key={set.id}>
										<td>{setIndex + 1}</td>
										<td>
											<Input
												className="bg-white"
												onChange={(e) => {
													// console.log(exerciseIndex, set.id, e.target.value);
													updateSet(
														exerciseIndex,
														set.id,
														"weight",
														e.target.value,
													);
												}}
											/>
										</td>
										<td>
											<Input
												className="bg-white"
												onChange={(e) =>
													updateSet(
														exerciseIndex,
														set.id,
														"reps",
														e.target.value,
													)
												}
											/>
										</td>
										<td>
											<Button
												variant="ghost"
												className="cursor-pointer"
												onClick={() =>
													removeSetFromExercise(exerciseIndex, set.id)
												}
											>
												<X color="red" />
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<Button
							className="uppercase cursor-pointer"
							type="button"
							onClick={() => addSetToExercise(exerciseIndex)}
						>
							ADD SET
						</Button>
					</li>
				))}
			</ul>
			<Button className="w-full" onClick={() => handleCompleteWorkout()}>
				Complete Workout
			</Button>
			</div>
		</section>
	);
}
