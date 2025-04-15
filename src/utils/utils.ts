import type { Nutrition, Workout } from "@/core/types.ts";
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getMuscleIntensities(workouts: Workout[]) {
	const muscles: {
		muscle: string;
		intensity: number;
		volume: number;
	}[] = [];

	for (const w of workouts) {
		w.exercises.map((ex) => {
			const indexPrimary = muscles.findIndex(
				(m) => m.muscle === ex.primaryMuscle,
			);
			if (indexPrimary >= 0) {
				muscles[indexPrimary].intensity += 3;
				muscles[indexPrimary].volume += 1;
			} else {
				muscles.push({ muscle: ex.primaryMuscle, intensity: 2, volume: 1 });
			}

			for (const m of ex.secondaryMuscles) {
				const indexSecondary = muscles.findIndex(
					(muscle) => muscle.muscle === m,
				);
				if (indexSecondary >= 0) {
					muscles[indexSecondary].intensity += 1;
					muscles[indexSecondary].volume += 0.5;
				} else {
					muscles.push({ muscle: m, intensity: 1, volume: 0.5 });
				}
			}
		});
	}
	return muscles;
}

export function calcMacros(
	foodItem: Nutrition["item"],
	amount: Nutrition["amount"],
) {
	return {
		calories: Math.round((foodItem.calories * amount) / 100),
		protein: Math.round((foodItem.protein * amount) / 100),
		fat: Math.round((foodItem.fat * amount) / 100),
		carbs: Math.round((foodItem.carbs * amount) / 100),
	};
}
