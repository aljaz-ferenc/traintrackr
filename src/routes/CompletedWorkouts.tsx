import RouteTitle from "@/components/shared/RouteTitle.tsx";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import Workout from "@/components/workout/Workout.tsx";
import useWorkoutLogs from "@/hooks/api/useWorkoutLogs.ts";

export default function CompletedWorkouts() {
	const { data: logs, isLoading } = useWorkoutLogs();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<section className="w-[1200px]">
			<RouteTitle title="Completed Workouts" />
			<Accordion type="single" className="w-full">
				{logs?.map((log) => (
					<AccordionItem value={log._id} key={log._id}>
						<AccordionTrigger className="w-full">
							{log.mesoTitle}
						</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-5 overflow-auto">
							{log.weeks
								.filter((week) => week.workouts.length)
								.map((week, i) => (
									<div key={`${week}-${i + 1}`} className="flex gap-3 p-2">
										<h2 className="font-bold text-xl w-max self-center">
											Week {i + 1}
										</h2>
										{week.workouts.map((workout) => (
											<Workout
												workout={workout}
												key={workout.id}
												editable={false}
											/>
										))}
									</div>
								))}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
