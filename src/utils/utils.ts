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
	}[] = []

	workouts.forEach(w => {
		w.exercises.map(ex => {
			const indexPrimary = muscles.findIndex(m => m.muscle === ex.primaryMuscle)
			console.log(indexPrimary)
			if (indexPrimary >= 0) {
				muscles[indexPrimary].intensity += 3
			} else {
				muscles.push({muscle: ex.primaryMuscle, intensity: 2})
			}

			ex.secondaryMuscles.forEach(m => {
				const indexSecondary = muscles.findIndex(muscle => muscle.muscle === m)
				console.log(indexSecondary)
				if (indexSecondary >= 0) {
					muscles[indexSecondary].intensity += 1
				} else {
					muscles.push({muscle: m, intensity: 1})
				}
			})
		})
	})
	return muscles
}