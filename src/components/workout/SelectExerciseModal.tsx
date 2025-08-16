import Button from "@/components/shared/Button.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.tsx";
import { exercises } from "@/constants/exercises.ts";
import { muscleGroups } from "@/constants/muscleGroups.ts";
import type { Exercise, Workout } from "@/core/types.ts";
import { useNewMesoStore } from "@/state/NewMesoStore.ts";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";

type SelectExerciseModalProps = {
	workoutId: Workout["id"];
};

export default function SelectExerciseModal({
	workoutId,
}: SelectExerciseModalProps) {
	const { t } = useTranslation();
	const [addExerciseToWorkout] = useNewMesoStore(
		useShallow((state) => [state.addExerciseToWorkout]),
	);
	const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const exercisesByMuscleGroup = useMemo(() => {
		return exercises.filter((ex) => ex.primaryMuscle === selectedMuscleGroup);
	}, [selectedMuscleGroup]);

	const handleSelectExercise = (
		workoutId: Workout["id"],
		exercise: Exercise,
	) => {
		addExerciseToWorkout(workoutId, exercise);
		setIsOpen(false);
		setSelectedMuscleGroup("");
	};

	const onOpenChange = (val: boolean) => {
		if (val) {
			setIsOpen(val);
			return;
		}
		setIsOpen(val);
		setSelectedMuscleGroup("");
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<VisuallyHidden>
				<DialogTitle>Add a new exercise.</DialogTitle>
				<DialogDescription>
					Select a new exercise to be added to yout workout.
				</DialogDescription>
			</VisuallyHidden>
			<DialogTrigger asChild>
				<Button className="cursor-pointer" variant="secondary">
					+ {t("NEW_MESOCYCLE.addExercise")}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>{t("NEW_MESOCYCLE.addExercise")}</DialogHeader>
				<Select
					value={selectedMuscleGroup}
					onValueChange={setSelectedMuscleGroup}
				>
					<SelectTrigger className="w-full cursor-pointer capitalize">
						<SelectValue
							placeholder={t("NEW_MESOCYCLE.selectMuscleGroup")}
							className="bg-white"
						/>
					</SelectTrigger>
					<SelectContent>
						{muscleGroups.map((mg) => (
							<SelectItem
								key={mg}
								value={mg}
								className="cursor-pointer capitalize"
							>
								{t(`MUSCLE_GROUPS.${mg}`)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<ul className="flex flex-col">
					{exercisesByMuscleGroup.map((exercise) => (
						<li key={exercise.id} className="w-full">
							<Button
								onClick={() => handleSelectExercise(workoutId, exercise)}
								variant="ghost"
								className="cursor-pointer w-full text-left block hover:bg-muted"
							>
								{exercise.name}
							</Button>
						</li>
					))}
				</ul>
			</DialogContent>
		</Dialog>
	);
}
