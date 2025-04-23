import RouteTitle from "@/components/shared/RouteTitle.tsx";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import WorkoutLog from "@/components/workout/WorkoutLog.tsx";
import useWorkoutLogs from "@/hooks/api/useWorkoutLogs.ts";
import PageLoading from "@/components/shared/PageLoading.tsx";
import ErrorPage, {
	ErrorDescription,
	ErrorTitle,
} from "@/components/shared/ErrorPage.tsx";
import Button from "@/components/shared/Button.tsx";
import { Route } from "@/core/enums/Routes.enum.ts";
import { useTranslation } from "react-i18next";

export default function CompletedWorkouts() {
	const { data: logs, isLoading } = useWorkoutLogs();
	const { t } = useTranslation();

	if (isLoading) {
		return <PageLoading />;
	}

	if (!logs?.length) {
		return (
			<ErrorPage>
				<ErrorTitle>No completed workouts</ErrorTitle>
				<ErrorDescription>
					You have not yet completed any workouts. To do so, you need to have an
					active mesocycle, which you can activate on the{" "}
					<Button variant="link" to={`/${Route.MyMesocycles}`}>
						My Mesocycles
					</Button>{" "}
					page and complete a workout on the{" "}
					<Button variant="link" to={`/${Route.TodaysWorkout}`}>
						Today's Workout
					</Button>{" "}
					page when scheduled.
				</ErrorDescription>
			</ErrorPage>
		);
	}

	return (
		<section>
			<RouteTitle title={t("ROUTES.completedWorkouts")} />
			<Accordion type="multiple" className="w-full">
				{logs?.map((log) => (
					<AccordionItem value={log._id} key={log._id}>
						<AccordionTrigger className="w-full cursor-pointer font-bold uppercase">
							{log.mesoTitle}
						</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-5 overflow-auto">
							{log.weeks
								.filter((week) => week.workouts.length)
								.map((week, i) => (
									<div key={`${week}-${i + 1}`} className="flex gap-3 p-2">
										<h2 className="font-bold uppercase text-xl w-max self-center min-w-max">
											{t("GENERAL.week")} {i + 1}
										</h2>
										<div className="flex gap-10">
											{week.workouts.map((workout) => (
												<WorkoutLog key={workout.id} workout={workout} />
											))}
										</div>
									</div>
								))}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
