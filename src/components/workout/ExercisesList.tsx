import { Badge } from "@/components/ui/badge.tsx";
import {useNewMesoStore,} from "@/state/NewMesoStore.ts";
import { cn } from "@/utils/utils.ts";
import { X } from "lucide-react";
import { Reorder, useDragControls } from "motion/react";
import { useShallow } from "zustand/react/shallow";
import {Exercise, Workout} from "@/core/types.ts";

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

	return (
		<Reorder.Group
			values={exercises}
			onReorder={(newOrder) => setExercises(workoutId, newOrder)}
		>
			{exercises.map((exercise, index) => {
				return (
					<Reorder.Item
						value={exercise}
						key={exercise.id}
						dragControls={controls}
						dragListener={editable}
					>
						<div
							className={cn([
								"bg-blue-100 mb-2 p-2 rounded flex items-center justify-between relative",
								index === exercises.length - 1 && "mb-0",
								editable && "cursor-grab",
							])}
						>
							<div className="flex flex-col gap-2 select-none">
								<Badge variant="secondary" className="uppercase">
									{exercise.primaryMuscle}
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
						</div>
					</Reorder.Item>
				);
			})}
		</Reorder.Group>
	);
}
