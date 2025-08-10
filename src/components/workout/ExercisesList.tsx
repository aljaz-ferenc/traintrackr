import { Badge } from "@/components/ui/badge.tsx";
import { useNewMesoStore } from "@/state/NewMesoStore.ts";
import { cn } from "@/utils/utils.ts";
import { X } from "lucide-react";
import { Reorder, useDragControls } from "motion/react";
import { useShallow } from "zustand/react/shallow";
import type { Exercise, Workout } from "@/core/types.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { useTranslation } from "react-i18next";

type ExercisesListProps = {
	exercises: Exercise[];
	workoutId: Workout["id"];
	editable: boolean;
};

export default function ExercisesList({
	exercises,
	workoutId,
	editable,
}: ExercisesListProps) {
	const [setExercises, removeExercise] = useNewMesoStore(
		useShallow((state) => [
			state.setExercises,
			state.removeExerciseFromWorkout,
		]),
	);
	const controls = useDragControls();
	const { t } = useTranslation();

	return (
		<Reorder.Group
			values={exercises}
			onReorder={(newOrder) => setExercises(workoutId, newOrder)}
			className="flex flex-col gap-3"
		>
			{exercises.map((exercise, index) => {
				return (
					<Reorder.Item
						value={exercise}
						key={exercise.id}
						dragControls={controls}
						dragListener={editable}
					>
						<Card className="py-4">
							<CardContent
								className={cn([
									"flex items-center justify-between relative",
									index === exercises.length - 1 && "mb-0",
									editable && "cursor-grab",
								])}
							>
								<div className="flex flex-col gap-2 select-none">
									<Badge variant="default" className="uppercase font-bold">
										{t(`MUSCLE_GROUPS.${exercise.primaryMuscle}`)}
									</Badge>
									{exercise.name}
								</div>
								{editable && (
									<X
										className="cursor-pointer"
										color={"red"}
										onClick={() => removeExercise(workoutId, exercise.id)}
									/>
								)}
							</CardContent>
						</Card>
					</Reorder.Item>
				);
			})}
		</Reorder.Group>
	);
}
