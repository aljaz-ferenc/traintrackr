import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import ExercisesList from "@/components/workout/ExercisesList.tsx";
import SelectExerciseModal from "@/components/workout/SelectExerciseModal.tsx";
import type {Workout as TWorkout} from "@/core/types.ts";
import {useNewMesoStore} from "@/state/NewMesoStore.ts";
import {RefObject, useRef} from "react";
import {useShallow} from "zustand/react/shallow";
import {cn} from "@/utils/utils.ts";
import {useOnClickOutside} from "usehooks-ts";
import WorkoutActions from "@/components/workout/WorkoutActions.tsx";

type WorkoutProps = {
    workout: TWorkout;
    editable: boolean;
    focusable: boolean
};

export const weekDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

export default function Workout({workout, editable = false, focusable = false}: WorkoutProps) {
    const workoutRef = useRef<HTMLElement>(null)
    const [removeWorkout, setWorkoutDay, splitType, cloneWorkout, setFocusedWorkout, focusedWorkout] =
        useNewMesoStore(
            useShallow((state) => [
                state.removeWorkout,
                state.setWorkoutDay,
                state.splitType,
                state.cloneWorkout,
                state.setFocusedWorkout,
                state.focusedWorkout
            ]),
        );


    useOnClickOutside(workoutRef as RefObject<HTMLElement>, () => () => focusWorkout(false))

    const focusWorkout = (shouldFocus: boolean) => {
        if (!focusable) return
        setFocusedWorkout(shouldFocus ? workout.id : '')
    }

    return (
        <div className='flex flex-col group'>
            {editable &&
                <WorkoutActions
                    onClone={() => cloneWorkout(workout.id)}
                    onDelete={() => removeWorkout(workout.id)}
                />}
            <article
                ref={workoutRef}
                onFocus={() => focusWorkout(true)}
                onMouseDown={() => focusWorkout(true)}
                onBlur={() => setFocusedWorkout('')}
                className={cn(["p-2 border-gray-200 rounded flex flex-col gap-2 min-w-xs border-2", focusedWorkout === workout.id && 'border-2 border-sky-400'])}>
                {editable ? (
                    <div className="flex gap-2 items-center">
                        <Select
                            onValueChange={(val) =>
                                setWorkoutDay(
                                    workout.id,
                                    splitType === "synchronous"
                                        ? weekDays.indexOf(val)
                                        : weekDays.indexOf(val) + 1,
                                )
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder="Select day"
                                    className="bg-white capitalize"
                                />
                                <SelectContent>
                                    {weekDays.map((day, index) => (
                                        <SelectItem value={day} key={day} className="capitalize">
										<span className="capitalize">
											{splitType === "synchronous" ? day : index + 1}
										</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </SelectTrigger>
                        </Select>
                    </div>
                ) : (
                    <p className="uppercase font-bold">{weekDays[workout.day]}</p>
                )}
                <ExercisesList
                    editable={editable}
                    exercises={workout.exercises}
                    workoutId={workout.id}
                />
                {editable && <SelectExerciseModal workoutId={workout.id}/>}
            </article>
        </div>
    );
}
