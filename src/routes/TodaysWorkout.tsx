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
import {
	differenceInWeeks,
	getDay,
	isAfter,
	isToday,
	startOfDay,
} from "date-fns";
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
import ErrorPage, {
	ErrorDescription,
	ErrorTitle,
} from "@/components/shared/ErrorPage.tsx";
import { Route } from "@/core/enums/Routes.enum.ts";
import { Trans, useTranslation } from "react-i18next";

export default function TodaysWorkout() {
	const [user] = useUserStore(useShallow((state) => [state.user]));
	const navigate = useNavigate();
	const { t } = useTranslation();
	const {
		data: mesocycle,
		isLoading,
		error,
	} = useGetMesocycleById(user?.activeMesocycle?.mesocycle._id as string);
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

	const todaysWorkout = mesocycle?.workouts.find(
		(workout) => workout.day === getDay(new Date()),
	);

	useEffect(() => {
		if (!mesocycle || exercises.length || !todaysWorkout) return;
		setExercises(todaysWorkout.exercises);
	}, [mesocycle, exercises.length, setExercises, todaysWorkout]);

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
		return (
			<ErrorPage>
				<ErrorTitle>{t("TODAYS_WORKOUT.noActiveMeso.title")}</ErrorTitle>
				<ErrorDescription>
					<Trans
						i18nKey="TODAYS_WORKOUT.noActiveMeso.text"
						components={{
							myMesocyclesLink: (
								<Button variant="link" to={`/${Route.MyMesocycles}`} />
							),
							newMesocycleLink: (
								<Button variant="link" to={`/${Route.NewMesocycle}`} />
							),
						}}
					/>
				</ErrorDescription>
			</ErrorPage>
		);
	}

	if (
		user?.activeMesocycle?.endDate &&
		isAfter(startOfDay(new Date()), startOfDay(user?.activeMesocycle?.endDate))
	) {
		return (
			<ErrorPage>
				<ErrorTitle>Mesocycle completed</ErrorTitle>
				<ErrorDescription>
					<Trans
						i18nKey="TODAYS_WORKOUT.mesoCompleted.text"
						components={{
							newMesocycleLink: (
								<Button variant="link" to={`/${Route.NewMesocycle}`} />
							),
							myMesocyclesLink: (
								<Button variant="link" to={`/${Route.MyMesocycles}`} />
							),
						}}
					/>
				</ErrorDescription>
			</ErrorPage>
		);
	}

	if (mesocycle && !todaysWorkout) {
		return (
			<ErrorPage>
				<ErrorTitle>{t("TODAYS_WORKOUT.restDay.title")}</ErrorTitle>
				<ErrorDescription>{t("TODAYS_WORKOUT.restDay.text")}</ErrorDescription>
			</ErrorPage>
		);
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
			navigate("/completed-workouts");
		} catch (err) {
			console.log("Error completing workout: ", err);
		}
	};

	if (!todaysWorkout) {
		return <div>No workout?</div>;
	}

	if (user?.lastWorkout && isToday(new Date(user.lastWorkout))) {
		return (
			<ErrorPage>
				<ErrorTitle>{t("TODAYS_WORKOUT.workoutCompleted.title")}</ErrorTitle>
				<ErrorDescription>
					{t("TODAYS_WORKOUT.workoutCompleted.text")}
				</ErrorDescription>
			</ErrorPage>
		);
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
								`GENERAL.days.${weekDays.find((day) => day.value === todaysWorkout.day)?.day.toLowerCase()}.long`,
							)}
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
															value={exercise.sets[setIndex].weight || 0}
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
															value={exercise.sets[setIndex].reps || 0}
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
