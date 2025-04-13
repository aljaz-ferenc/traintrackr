import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {Workout} from "@/core/types.ts";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getMuscleIntensities(workouts: Workout[]){
	const muscles: {
		muscle: string,
		intensity: number
		volume: number
	}[] = []

	workouts.forEach(w => {
		w.exercises.map(ex => {
			const indexPrimary = muscles.findIndex(m => m.muscle === ex.primaryMuscle)
			if (indexPrimary >= 0) {
				muscles[indexPrimary].intensity += 3
				muscles[indexPrimary].volume += 1
			} else {
				muscles.push({muscle: ex.primaryMuscle, intensity: 2, volume: 1})
			}

			ex.secondaryMuscles.forEach(m => {
				const indexSecondary = muscles.findIndex(muscle => muscle.muscle === m)
				if (indexSecondary >= 0) {
					muscles[indexSecondary].intensity += 1
					muscles[indexSecondary].volume += 0.5
				} else {
					muscles.push({muscle: m, intensity: 1, volume: 0.5})
				}
			})
		})
	})
	return muscles
}