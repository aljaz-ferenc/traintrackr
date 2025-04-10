import type { Exercise, ExerciseWithSets, Mesocycle } from "@/core/types.ts";
import { create } from "zustand";

type TodaysWorkoutStore = {
	exercises: ExerciseWithSets[];
	setExercises: (exercises: Exercise[]) => void;
	addSetToExercise: (exerciseIndex: number) => void;
	removeSetFromExercise: (exerciseIndex: number, setId: string) => void;
	updateSet: (
		exerciseIndex: number,
		setId: string,
		key: "weight" | "reps",
		value: string,
	) => void;
	constructLog: (meso: Mesocycle) => any;
};

export const useTodaysWorkoutStore = create<TodaysWorkoutStore>(
	(set, getState) => ({
		exercises: [],
		setExercises: (exercises) =>
			set((state) => {
				const exercisesWithSets: ExerciseWithSets[] = exercises.map(
					(exercise) => {
						return {
							...exercise,
							sets: [{ weight: null, reps: null, id: crypto.randomUUID() }],
						};
					},
				);

				return { ...state, exercises: exercisesWithSets };
			}),
		addSetToExercise: (exerciseIndex) =>
			set((state) => {
				const updatedExercises = state.exercises.map((exercise, i) => {
					if (i === exerciseIndex) {
						return {
							...exercise,
							sets: [
								...exercise.sets,
								{ weight: null, reps: null, id: crypto.randomUUID() },
							],
						};
					}
					return exercise;
				});

				return { ...state, exercises: updatedExercises };
			}),
		removeSetFromExercise: (exerciseIndex, setId) =>
			set((state) => {
				const updatedExercises = state.exercises.map(
					(exercise, exerciseIdx) => {
						if (exerciseIdx === exerciseIndex) {
							const filteredSets = exercise.sets.filter(
								(set) => set.id !== setId,
							);

							return { ...exercise, sets: filteredSets };
						}
						return exercise;
					},
				);

				return { ...state, exercises: updatedExercises };
			}),
		updateSet: (exerciseIndex, setId, key, value) =>
			set((state) => {
				const updatedExercises = state.exercises.map(
					(exercise, exerciseIdx) => {
						if (exerciseIndex === exerciseIdx) {
							exercise.sets.map((set) => {
								if (set.id === setId) {
									return { ...set, [key]: +value };
								}
								return set;
							});
						}
						return exercise;
					},
				);

				return { ...state, exercises: updatedExercises };
			}),
		constructLog: (meso) => {
			const state = getState();
			const week = 1;
			const weeks = {
				[week]: state.exercises,
			};
			const log = {
				weeks,
				completedAt: new Date(),
				mesoTitle: meso.title,
				mesoId: meso._id,
				mesoDuration: meso.duration,
				user: meso.createdBy,
			};
			console.log("LOG: ", log);
			return state;
		},
	}),
);
