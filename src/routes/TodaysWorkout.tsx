import RouteTitle from "@/components/shared/RouteTitle.tsx";
import { Input } from "@/components/ui/Input.tsx";
import Button from "@/components/shared/Button.tsx";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/components/ui/card.tsx";
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
import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableHeader,
	TableHead,
} from "@/components/ui/table.tsx";
import { useNavigate } from "react-router";
import PageLoading from "@/components/shared/PageLoading.tsx";

export default function TodaysWorkout() {
	const [user] = useUserStore(useShallow((state) => [state.user]));
	const navigate = useNavigate();
	const { data, isLoading } = useGetMesocycleById(
		user?.activeMesocycle?.mesocycle._id as string,
	);
	const { mutateAsync: completeWorkout, isPending } = useCompleteWorkout();
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

	if (isLoading) {
		return <PageLoading />;
	}

	if (!data) {
		return <>No active mesocycle.</>;
	}

	if (data.mesocycle && !todaysWorkout) {
		return <>Rest day</>;
	}

	//TODO: add 'completed' to user.activeMesocycle and display the message that the meso has been completed

	const handleCompleteWorkout = async () => {
		const log = constructLog(
			user?.activeMesocycle?.startDate as Date,
			todaysWorkout as Workout<Exercise>,
			user?.activeMesocycle?.mesocycle._id as string,
			user?._id as string,
		);

		try {
			await completeWorkout(log);
			navigate("/completed-workouts");
		} catch (err) {
			console.log("Error completing workout: ", err);
		}
	};

	if (!todaysWorkout) {
		return <div>No workout?</div>;
	}

	if (user?.lastWorkout && isToday(new Date(user.lastWorkout))) {
		return <>Today's workout completed.</>;
	}
	return (
		<section className="max-w-[600px] mx-auto">
			<RouteTitle title="Today's Workout" />
			<div className="mx-auto flex flex-col gap-5">
				<Card>
					<CardContent>
						<CardHeader>
							<CardTitle />
						</CardHeader>
						<h2>{data.mesocycle.title}</h2>
						<span className="text-xl font-bold uppercase">
							Week{" "}
							{differenceInWeeks(
								new Date(),
								user?.activeMesocycle?.startDate as Date,
							) + 1}
							/{data.mesocycle.duration} - {weekDays[todaysWorkout?.day]}
						</span>
					</CardContent>
				</Card>
				<ul className="flex flex-col gap-5">
					{exercises.map((exercise, exerciseIndex) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<li key={exerciseIndex}>
							<Card>
								<CardContent>
									<span className="uppercase font-bold">{exercise.name}</span>
									<Table className="table-auto w-full border-separate border-spacing-0">
										<TableHeader>
											<TableRow>
												<TableHead>SET</TableHead>
												<TableHead>WEIGHT</TableHead>
												<TableHead>REPS</TableHead>
												<TableHead />
											</TableRow>
										</TableHeader>
										<TableBody>
											{exercise.sets.map((set: TSet, setIndex: number) => (
												<TableRow key={set.id}>
													<TableCell>{setIndex + 1}</TableCell>
													<TableCell className="pr-2">
														<Input
															className="bg-white"
															onChange={(e) => {
																updateSet(
																	exerciseIndex,
																	set.id,
																	"weight",
																	e.target.value,
																);
															}}
														/>
													</TableCell>
													<TableCell className="p-0">
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
													</TableCell>
													<TableCell className="p-0">
														<Button
															variant="ghost"
															className="cursor-pointer"
															onClick={() =>
																removeSetFromExercise(exerciseIndex, set.id)
															}
														>
															<X color="red" />
														</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
									<Button
										className="uppercase cursor-pointer"
										type="button"
										onClick={() => addSetToExercise(exerciseIndex)}
										variant="secondary"
									>
										ADD SET
									</Button>
								</CardContent>
							</Card>
						</li>
					))}
				</ul>
				<Button
					isLoading={isPending}
					onClick={handleCompleteWorkout}
					variant="secondary"
				>
					Complete Workout
				</Button>
			</div>
		</section>
	);
}
