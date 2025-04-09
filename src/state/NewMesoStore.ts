import { create } from "zustand";

export type Workout = {
	id: string;
	day: number;
	exercises: Exercise[];
};

export type Mesocycle = {
	_id: string;
	title: string;
	duration: number;
	includeDeload: boolean;
	splitType: "synchronized" | "asynchronized";
	workouts: Workout[];
	createdBy: string;
};

export type Exercise = {
	id: string;
	name: string;
	primaryMuscle: string;
	secondaryMuscles: string[];
};

type NewMesoStore = {
	mesoTitle: string;
	mesoDuration: Mesocycle["duration"];
	includeDeload: Mesocycle["includeDeload"];
	splitType: "synchronized" | "asynchronized";
	workouts: Workout[];
	updateMesoTitle: (mesoTitle: Mesocycle["title"]) => void;
	updateMesoDuration: (mesoDuration: Mesocycle["duration"]) => void;
	toggleIncludeDeload: (value: Mesocycle["includeDeload"]) => void;
	setMesoSplitType: (splitType: "synchronized" | "asynchronized") => void;
	addWorkout: (workout: Workout) => void;
	removeWorkout: (workoutId: Workout["id"]) => void;
	updateWorkout: (workoutId: Workout["id"], workout: Workout) => void;
	constructMesocycle: (
		createdBy: Mesocycle["createdBy"],
	) => Omit<Mesocycle, "_id">;
	setWorkoutDay: (workoutId: Workout["id"], day: Workout["day"]) => void;
	setExercises: (workoutId: Workout["id"], exercises: Exercise[]) => void;
	addExerciseToWorkout: (workoutId: Workout["id"], exercise: Exercise) => void;
	removeExerciseFromWorkout: (
		workoutId: Workout["id"],
		exerciseId: Exercise["id"],
	) => void;
};

export const useNewMesoStore = create<NewMesoStore>((set, getState) => ({
	mesoTitle: "",
	mesoDuration: 4,
	includeDeload: false,
	splitType: "synchronized",
	workouts: [],
	createdBy: "",
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

	//TODO: unused for now
	updateWorkout: (workoutId, updatedWorkout) =>
		set((state) => ({
			...state,
			workouts: state.workouts.map((w) =>
				w.id === workoutId ? updatedWorkout : w,
			),
		})),
	constructMesocycle: (createdBy: Mesocycle["createdBy"]) => {
		const { mesoTitle, mesoDuration, includeDeload, splitType, workouts } =
			getState();
		return {
			title: mesoTitle,
			duration: mesoDuration,
			includeDeload,
			splitType,
			workouts,
			createdBy,
		};
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
		set({ workouts: updatedWorkouts });
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
}));
