import {Button} from "@/components/ui/button.tsx";
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
import {mockExercises} from "@/constants/mockExercises.ts";
import {mockMuscleGroups} from "@/constants/mockMuscleGroups.ts";
import {useNewMesoStore,} from "@/state/NewMesoStore.ts";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {useMemo, useState} from "react";
import {useShallow} from "zustand/react/shallow";
import {Exercise, Workout} from "@/core/types.ts";

type SelectExerciseModalProps = {
    workoutId: Workout["id"];
};

export default function SelectExerciseModal({
                                                workoutId,
                                            }: SelectExerciseModalProps) {
    const [addExerciseToWorkout] = useNewMesoStore(
        useShallow((state) => [state.addExerciseToWorkout]),
    );
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const exercisesByMuscleGroup = useMemo(() => {
        return mockExercises.filter(
            (ex) => ex.primaryMuscle === selectedMuscleGroup,
        );
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
                <Button
                    className="cursor-pointer"
                    variant="secondary"
                    // disabled={!!workouts.find((workout) => workout.id === workoutId)?.day}
                >
                    + Add exercise
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Add Exercise</DialogHeader>
                <Select
                    value={selectedMuscleGroup}
                    onValueChange={setSelectedMuscleGroup}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue
                            placeholder="Select muscle group..."
                            className="bg-white capitalize"
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {mockMuscleGroups.map((mg) => (
                            <SelectItem key={mg} value={mg}>
                                {mg}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <ul>
                    {exercisesByMuscleGroup.map((exercise) => (
                        <li key={exercise.id}>
                            <Button
                                onClick={() => handleSelectExercise(workoutId, exercise)}
                                variant="ghost"
                            >
                                <span>{exercise.name}</span>
                            </Button>
                        </li>
                    ))}
                </ul>
            </DialogContent>
        </Dialog>
    );
}
