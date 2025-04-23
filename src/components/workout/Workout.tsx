import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.tsx";
import ExercisesList from "@/components/workout/ExercisesList.tsx";
import SelectExerciseModal from "@/components/workout/SelectExerciseModal.tsx";
import type { Workout as TWorkout } from "@/core/types.ts";
import { useNewMesoStore } from "@/state/NewMesoStore.ts";
import { type RefObject, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/utils/utils.ts";
import { useOnClickOutside } from "usehooks-ts";
import WorkoutActions from "@/components/workout/WorkoutActions.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import {useTranslation} from "react-i18next";

type WorkoutProps = {
	workout: TWorkout;
	editable: boolean;
	focusable?: boolean;
};

export const weekDays = [
	{
		day: "Monday",
		value: 1,
	},
	{
		day: "Tuesday",
		value: 2,
	},
	{
		day: "Wednesday",
		value: 3,
	},
	{
		day: "Thursday",
		value: 4,
	},
	{
		day: "Friday",
		value: 5,
	},
	{
		day: "Saturday",
		value: 6,
	},
	{
		day: "Sunday",
		value: 0,
	},
];

export default function Workout({
	workout,
	editable = false,
	focusable = false,
}: WorkoutProps) {
	const workoutRef = useRef<HTMLDivElement>(null);
	const {t} = useTranslation()
	const [
		removeWorkout,
		setWorkoutDay,
		cloneWorkout,
		setFocusedWorkout,
		focusedWorkout,
	] = useNewMesoStore(
		useShallow((state) => [
			state.removeWorkout,
			state.setWorkoutDay,
			state.cloneWorkout,
			state.setFocusedWorkout,
			state.focusedWorkout,
		]),
	);

	useOnClickOutside(
		workoutRef as RefObject<HTMLElement>,
		() => () => focusWorkout(false),
	);

	const focusWorkout = (shouldFocus: boolean) => {
		if (!focusable) return;
		setFocusedWorkout(shouldFocus ? workout.id : "");
	};

	return (
		<div className="relative">
			<Card
				ref={workoutRef}
				onFocus={() => focusWorkout(true)}
				onMouseDown={() => focusWorkout(true)}
				onBlur={() => setFocusedWorkout("")}
				className={cn([
					focusedWorkout === workout.id &&
						"outline-2 outline-accent-primary -outline-offset-2 transition-all",
				])}
			>
				<CardContent className="flex flex-col group">
					{editable && (
						<WorkoutActions
							onClone={() => cloneWorkout(workout.id)}
							onDelete={() => removeWorkout(workout.id)}
						/>
					)}
					<article className={cn(["flex flex-col gap-3 min-w-xs w-full"])}>
						{editable ? (
							<div className="flex gap-2 items-center">
								<Select
									onValueChange={(val) => {
										setWorkoutDay(workout.id, Number(val));
									}}
									defaultValue={workout.day.toString()}
								>
									<SelectTrigger className="w-full cursor-pointer">
										<SelectValue
											placeholder="Select day..."
											className="bg-white capitalize"
										/>
										<SelectContent>
											{weekDays.map((day) => (
												<SelectItem
													value={day.value.toString()}
													key={day.value}
													className="capitalize cursor-pointer"
												>
													<span className='capitalize'>{t(`GENERAL.days.${day.day.toLowerCase()}.long`)}</span>
												</SelectItem>
											))}
										</SelectContent>
									</SelectTrigger>
								</Select>
							</div>
						) : (
							<p className="uppercase font-bold">
								{weekDays.find((day) => day.value === workout.day)?.day}
							</p>
						)}
						<ExercisesList
							editable={editable}
							exercises={workout.exercises}
							workoutId={workout.id}
						/>
						{editable && <SelectExerciseModal workoutId={workout.id} />}
					</article>
				</CardContent>
			</Card>
		</div>
	);
}
