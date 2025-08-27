import Button from "@/components/shared/Button.tsx";
import ErrorPage, {
	ErrorDescription,
	ErrorTitle,
} from "@/components/shared/ErrorPage.tsx";
import PageLoading from "@/components/shared/PageLoading.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import { Input } from "@/components/ui/Input.tsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table.tsx";
import { Guards } from "@/components/workout/TodaysWorkoutGuards.tsx";
import { weekDays } from "@/constants/weekDays.ts";
import { Route } from "@/core/enums/Routes.enum.ts";
import type { Exercise, Set as TSet, Workout } from "@/core/types.ts";
import useCompleteWorkout from "@/hooks/api/useCompleteWorkout.ts";
import useGetMesocycleById from "@/hooks/api/useGetMesocyleById.ts";
import { useTodaysWorkoutStore } from "@/state/TodaysWorkoutStore.ts";
import useUserStore from "@/state/UserStore.ts";
import {
	differenceInWeeks,
	getDay,
	isAfter,
	isBefore,
	isSameDay,
	isToday,
	startOfDay,
	startOfToday,
} from "date-fns";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

export default function TodaysWorkout() {
	const [user] = useUserStore(useShallow((state) => [state.user]));
	const navigate = useNavigate();
	const { t } = useTranslation();
	const {
		data: mesocycle,
		isLoading,
		error,
	} = useGetMesocycleById(user?.activeMesocycle?.mesocycle?._id as string);
	const { mutateAsync: completeWorkout, isPending } = useCompleteWorkout();
	const [
		exercises,
		setExercises,
		addSetToExercise,
		removeSetFromExercise,
		updateSet,
		constructLog,
		day,
		setDay,
	] = useTodaysWorkoutStore(
		useShallow((state) => [
			state.exercises,
			state.setExercises,
			state.addSetToExercise,
			state.removeSetFromExercise,
			state.updateSet,
			state.constructLog,
			state.day,
			state.setDay,
		]),
	);

	const todaysWorkout = mesocycle?.workouts.find(
		(workout) => workout.day === getDay(new Date()),
	);

	useEffect(() => {
		if (!mesocycle || !todaysWorkout) return;
		if (!day || !isSameDay(day, todaysWorkout.day)) {
			setExercises(todaysWorkout.exercises);
			setDay(todaysWorkout.day);
		}
	}, [mesocycle, setExercises, todaysWorkout, day, setDay]);

	const currentWeek =
		differenceInWeeks(new Date(), user?.activeMesocycle?.startDate as Date) + 1;

	if (isLoading) {
		return <PageLoading />;
	}

	if (error) {
		console.error(error.message);
		return (
			<ErrorPage>
				<ErrorTitle>{t("TODAYS_WORKOUT.error.title")}</ErrorTitle>
				<ErrorDescription>{t("TODAYS_WORKOUT.error.text")}</ErrorDescription>
			</ErrorPage>
		);
	}
	if (!mesocycle) {
		return <Guards.NoActiveMeso />;
	}

	if (
		user?.activeMesocycle?.startDate &&
		isBefore(new Date(), startOfDay(new Date(user?.activeMesocycle?.startDate)))
	) {
		return <Guards.StartsMonday />;
	}

	if (
		user?.activeMesocycle?.endDate &&
		isAfter(startOfToday(), startOfDay(user?.activeMesocycle?.endDate))
	) {
		return <Guards.MesoCompleted />;
	}

	if (mesocycle && !todaysWorkout) {
		return <Guards.RestDay />;
	}

	const handleCompleteWorkout = async () => {
		const log = constructLog(
			user?.activeMesocycle?.startDate as Date,
			todaysWorkout as Workout<Exercise>,
			user?.activeMesocycle?.mesocycle._id as string,
			user?._id as string,
		);

		try {
			await completeWorkout(log);
			setExercises([]);
			navigate(`/app/${Route.CompletedWorkouts}`);
		} catch (err) {
			console.log("Error completing workout: ", err);
		}
	};

	if (user?.lastWorkout && isToday(new Date(user.lastWorkout))) {
		return <Guards.WorkoutCompleted />;
	}
	return (
		<section className="max-w-[600px] mx-auto">
			<RouteTitle title={t("ROUTES.todaysWorkout")} />
			<div className="mx-auto flex flex-col gap-5">
				<Card>
					<CardContent>
						<CardHeader>
							<CardTitle />
						</CardHeader>
						<h2>{mesocycle.title}</h2>
						<span className="text-xl font-bold uppercase">
							{t("GENERAL.week")}
							<span className="text-3xl font-bold"> {currentWeek}</span>/
							{mesocycle.duration} -{" "}
							{t(
								`GENERAL.days.${weekDays.find((day) => day.value === todaysWorkout?.day)?.day.toLowerCase()}.long`,
							)}
						</span>
					</CardContent>
				</Card>
				<ul className="flex flex-col gap-5">
					{exercises.map((exercise, exerciseIndex) => (
						<li key={`exercise-${exerciseIndex + 1}`}>
							<Card>
								<CardContent>
									<span className="uppercase font-bold">{exercise.name}</span>
									<Table className="table-auto w-full border-separate border-spacing-0">
										<TableHeader>
											<TableRow className="uppercase">
												<TableHead>{t("TODAYS_WORKOUT.set")}</TableHead>
												<TableHead>{t("TODAYS_WORKOUT.weight")}</TableHead>
												<TableHead>{t("TODAYS_WORKOUT.reps")}</TableHead>
												<TableHead />
											</TableRow>
										</TableHeader>
										<TableBody>
											{exercise.sets.map((set: TSet, setIndex: number) => (
												<TableRow key={set.id}>
													<TableCell>{setIndex + 1}</TableCell>
													<TableCell className="pr-2">
														<Input
															value={exercise.sets[setIndex].weight || ""}
															className="bg-white"
															onChange={(e) => {
																const value = e.target.value;
																const { success } = z
																	.string()
																	.regex(
																		/^\d*\.?\d?$/,
																		"Only use numbers with up to one decimal place.",
																	)
																	.or(z.literal(""))
																	.safeParse(value);

																if (success) {
																	updateSet(
																		exerciseIndex,
																		set.id,
																		"weight",
																		e.target.value,
																	);
																}
															}}
														/>
													</TableCell>
													<TableCell className="p-0">
														<Input
															value={exercise.sets[setIndex].reps || ""}
															className="bg-white"
															onChange={(e) => {
																const value = e.target.value;
																const { success } = z
																	.string()
																	.regex(
																		/^\d*\.?\d?$/,
																		"Only use numbers with up to one decimal place.",
																	)
																	.or(z.literal(""))
																	.safeParse(value);

																if (success) {
																	updateSet(
																		exerciseIndex,
																		set.id,
																		"reps",
																		value,
																	);
																}
															}}
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
										{t("TODAYS_WORKOUT.addSet")}
									</Button>
								</CardContent>
							</Card>
						</li>
					))}
				</ul>
				<Button
					isLoading={isPending}
					onClick={handleCompleteWorkout}
					variant="primary"
				>
					{t("TODAYS_WORKOUT.completeWorkout")}
				</Button>
			</div>
		</section>
	);
}
