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
import { weekDays } from "@/constants/weekDays.ts";
import type { ExerciseWithSets, Workout } from "@/core/types";
import { useTranslation } from "react-i18next";

type WorkoutLogProps = {
	workout: Workout<ExerciseWithSets>;
};

export default function WorkoutLog({ workout }: WorkoutLogProps) {
	const { t } = useTranslation();

	return (
		<Card className="min-w-md">
			<CardHeader>
				<CardTitle className="uppercase font-bold">
					{t(
						`GENERAL.days.${weekDays.find((day) => day.value === workout.day)?.day.toLowerCase()}.long`,
					)}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-5">
				{workout.exercises.map((exercise) => (
					<Card key={exercise.id}>
						<CardHeader>
							<CardTitle>{exercise.name}</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead />
										{exercise.sets.map((set, index) => (
											<TableHead
												key={set.id}
												className="text-center text-muted-foreground font-bold"
											>
												{index + 1}
											</TableHead>
										))}
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="uppercase font-bold text-muted-foreground">
											{t("COMPLETED_WORKOUTS.reps")}
										</TableCell>
										{exercise.sets.map((set) => (
											<TableCell key={set.id} className="text-center font-bold">
												{set.reps}
											</TableCell>
										))}
									</TableRow>
									<TableRow>
										<TableCell className="uppercase font-bold text-muted-foreground">
											{t("COMPLETED_WORKOUTS.weight")}
										</TableCell>
										{exercise.sets.map((set) => (
											<TableCell key={set.id} className="text-center font-bold">
												{set.weight} kg
											</TableCell>
										))}
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				))}
			</CardContent>
		</Card>
	);
}
