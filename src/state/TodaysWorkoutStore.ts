import type {
	Exercise,
	ExerciseWithSets,
	Mesocycle,
	User,
	Workout,
} from "@/core/types.ts";
import type { CompleteWorkoutPayload } from "@/hooks/api/useCompleteWorkout.ts";
import { differenceInWeeks } from "date-fns";
import { create } from "zustand";

type TodaysWorkoutStore = {
	exercises: ExerciseWithSets[];
	setExercises: (exercises: Exercise[]) => void;
	day: number | null;
	setDay: (day: number) => void;
	addSetToExercise: (exerciseIndex: number) => void;
	removeSetFromExercise: (exerciseIndex: number, setId: string) => void;
	updateSet: (
		exerciseIndex: number,
		setId: string,
		key: "weight" | "reps",
		value: string,
	) => void;
	constructLog: (
		startDate: Date,
		todaysWorkout: Workout<Exercise>,
		mesoId: Mesocycle["_id"],
		userId: User["_id"],
	) => CompleteWorkoutPayload;
};

export const useTodaysWorkoutStore = create<TodaysWorkoutStore>()(
	(set, getState) => ({
		exercises: [],
		day: null,
		setExercises: (exercises) =>
			set((state) => {
				const exercisesWithSets: ExerciseWithSets[] = exercises.map(
					(exercise) => {
						return {
							...exercise,
							sets: [
								{
									weight: null,
									reps: null,
									id: crypto.randomUUID(),
								},
							],
						};
					},
				);

				return {
					...state,
					exercises: exercisesWithSets,
				};
			}),
		setDay: (day) =>
			set({
				day,
			}),
		addSetToExercise: (exerciseIndex) =>
			set((state) => {
				const updatedExercises = state.exercises.map((exercise, i) => {
					if (i === exerciseIndex) {
						return {
							...exercise,
							sets: [
								...exercise.sets,
								{
									weight: null,
									reps: null,
									id: crypto.randomUUID(),
								},
							],
						};
					}
					return exercise;
				});

				return {
					...state,
					exercises: updatedExercises,
				};
			}),
		removeSetFromExercise: (exerciseIndex, setId) =>
			set((state) => {
				const updatedExercises = state.exercises.map(
					(exercise, exerciseIdx) => {
						if (exerciseIdx === exerciseIndex) {
							const filteredSets = exercise.sets.filter(
								(set) => set.id !== setId,
							);

							return {
								...exercise,
								sets: filteredSets,
							};
						}
						return exercise;
					},
				);

				return {
					...state,
					exercises: updatedExercises,
				};
			}),
		updateSet: (exerciseIndex, setId, key, value) =>
			set((state) => {
				const updatedExercises = state.exercises.map(
					(exercise, exerciseIdx) => {
						if (exerciseIndex === exerciseIdx) {
							return {
								...exercise,
								sets: exercise.sets.map((set) => {
									if (set.id === setId) {
										return {
											...set,
											[key]: value,
										};
									}
									return set;
								}),
							};
						}
						return exercise;
					},
				);

				return {
					...state,
					exercises: updatedExercises,
				};
			}),

		constructLog: (startDate, todaysWorkout, mesoId, userId) => {
			const now = new Date();

			return {
				weekNumber: differenceInWeeks(now, startDate) + 1,
				mesoId,
				workout: {
					id: todaysWorkout.id,
					day: todaysWorkout.day,
					exercises: getState().exercises,
					completedAt: now,
				},
				userId,
			};
		},
	}),
);
