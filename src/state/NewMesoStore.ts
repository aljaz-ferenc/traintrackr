import type { Exercise, Mesocycle, SplitType, Workout } from "@/core/types.ts";
import { create } from "zustand";

type NewMesoStore = {
	_id: Mesocycle["_id"];
	mesoTitle: string;
	mesoDuration: Mesocycle["duration"];
	includeDeload: Mesocycle["includeDeload"];
	splitType: SplitType;
	workouts: Workout[];
	focusedWorkout: Workout["id"];
	updateMesoTitle: (mesoTitle: Mesocycle["title"]) => void;
	updateMesoDuration: (mesoDuration: Mesocycle["duration"]) => void;
	toggleIncludeDeload: (value: Mesocycle["includeDeload"]) => void;
	setMesoSplitType: (splitType: SplitType) => void;
	addWorkout: (workout: Workout) => void;
	removeWorkout: (workoutId: Workout["id"]) => void;
	updateWorkout: (workoutId: Workout["id"], workout: Workout) => void;
	setFocusedWorkout: (workoutId: Workout["id"]) => void;
	constructMesocycle: (createdBy: Mesocycle["createdBy"]) => Mesocycle;
	setWorkoutDay: (workoutId: Workout["id"], day: Workout["day"]) => void;
	setExercises: (workoutId: Workout["id"], exercises: Exercise[]) => void;
	addExerciseToWorkout: (workoutId: Workout["id"], exercise: Exercise) => void;
	removeExerciseFromWorkout: (
		workoutId: Workout["id"],
		exerciseId: Exercise["id"],
	) => void;
	cloneWorkout: (workoutId: Workout["id"]) => void;
	setMesoToEdit: (meso: Mesocycle) => void;
	resetMesoStore: () => void;
};

export const useNewMesoStore = create<NewMesoStore>((set, getState) => ({
	_id: "",
	mesoTitle: "",
	mesoDuration: 4,
	includeDeload: false,
	splitType: "synchronous",
	workouts: [],
	focusedWorkout: "",
	updateMesoTitle: (mesoTitle) => set((state) => ({ ...state, mesoTitle })),
	updateMesoDuration: (mesoDuration) =>
		set((state) => ({ ...state, mesoDuration })),
	toggleIncludeDeload: (value) =>
		set((state) => ({ ...state, includeDeload: value })),
	setMesoSplitType: (splitType) => set((state) => ({ ...state, splitType })),
	addWorkout: (workout) =>
		set((state) => ({ ...state, workouts: [...state.workouts, workout] })),
	removeWorkout: (workoutId) =>
		set((state) => ({
			...state,
			workouts: state.workouts.filter((workout) => workout.id !== workoutId),
		})),

	updateWorkout: (workoutId, updatedWorkout) =>
		set((state) => ({
			...state,
			workouts: state.workouts.map((w) =>
				w.id === workoutId ? updatedWorkout : w,
			),
		})),
	setFocusedWorkout: (workoutId) => set({ focusedWorkout: workoutId }),
	constructMesocycle: (createdBy: Mesocycle["createdBy"]) => {
		const { mesoTitle, mesoDuration, includeDeload, splitType, workouts, _id } =
			getState();
		console.log(createdBy);

		const newMeso: Mesocycle = {
			_id,
			title: mesoTitle,
			duration: mesoDuration,
			includeDeload,
			splitType,
			workouts,
			createdBy,
		};

		if (_id) {
			newMeso._id = _id;
		}

		return newMeso;
	},
	setWorkoutDay: (workoutId, day) => {
		const { workouts } = getState();

		const updatedWorkouts = workouts.map((w) => {
			if (w.id === workoutId) {
				return {
					...w,
					day,
				};
			}
			return w;
		});
		set({
			workouts: updatedWorkouts.sort((a, b) => {
				const dayA = a.day === 0 ? 7 : a.day;
				const dayB = b.day === 0 ? 7 : b.day;
				return dayA - dayB;
			}),
		});
	},

	setExercises: (workoutId, exercises) => {
		const { workouts } = getState();

		const updatedWorkouts = workouts.map((w) => {
			if (w.id === workoutId) {
				return {
					...w,
					exercises,
				};
			}
			return w;
		});
		set({ workouts: updatedWorkouts });
	},
	addExerciseToWorkout: (workoutId, exercise) =>
		set((state) => ({
			workouts: state.workouts.map((workout) =>
				workout.id === workoutId
					? { ...workout, exercises: [...workout.exercises, exercise] }
					: workout,
			),
		})),
	removeExerciseFromWorkout: (workoutId, exerciseId) =>
		set((state) => {
			const updatedWorkouts = state.workouts.map((w) => {
				if (workoutId === w.id) {
					return {
						...w,
						exercises: w.exercises.filter(
							(exercise) => exercise.id !== exerciseId,
						),
					};
				}
				return w;
			});

			return {
				...state,
				workouts: updatedWorkouts,
			};
		}),
	cloneWorkout: (workoutId) =>
		set((state) => {
			const workout = state.workouts.find((w) => w.id === workoutId);
			if (!workout) return state;

			const clonedWorkout = { ...workout, id: crypto.randomUUID() };

			return { ...state, workouts: [...state.workouts, clonedWorkout] };
		}),
	setMesoToEdit: (meso) =>
		set({
			_id: meso._id,
			mesoTitle: meso.title,
			mesoDuration: meso.duration,
			includeDeload: meso.includeDeload,
			splitType: meso.splitType,
			workouts: meso.workouts,
		}),
	resetMesoStore: () =>
		set({
			_id: "",
			mesoTitle: "",
			mesoDuration: 4,
			includeDeload: false,
			splitType: "synchronous",
			workouts: [],
			focusedWorkout: "",
		}),
}));
