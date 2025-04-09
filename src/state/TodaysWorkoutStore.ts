import { type Workout } from "@/state/NewMesoStore.ts";
import { create } from "zustand";

type TodaysWorkoutStore = {
	workout: Workout | null;
	setWorkout: (workout: Workout) => void;
};

export const useTodaysWorkoutStore = create<TodaysWorkoutStore>((set) => ({
	workout: null,
	setWorkout: (workout) => set({ workout }),
}));
