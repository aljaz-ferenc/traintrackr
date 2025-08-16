import { ActivityLevels } from "@/core/enums/ActivityLevel.enum.ts";
import type { Gender, Nutrition, User, Workout } from "@/core/types.ts";
import clsx, { type ClassValue } from "clsx";
import { differenceInYears, format, isBefore } from "date-fns";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

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
				muscles.push({
					muscle: ex.primaryMuscle,
					intensity: 2,
					volume: 1,
				});
			}

			for (const m of ex.secondaryMuscles) {
				const indexSecondary = muscles.findIndex(
					(muscle) => muscle.muscle === m,
				);
				if (indexSecondary >= 0) {
					muscles[indexSecondary].intensity += 1;
					muscles[indexSecondary].volume += 0.5;
				} else {
					muscles.push({
						muscle: m,
						intensity: 1,
						volume: 0.5,
					});
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

export function getApexHeatmapData(
	statuses: {
		date: Date;
		status: "rest" | "missed" | "completed" | "upcoming";
	}[],
) {
	const statusToCount = {
		rest: 0,
		missed: 1,
		completed: 2,
		upcoming: 3,
	};

	const dataByWeek: Record<
		string,
		{
			x: string;
			y: number;
		}[]
	> = {};

	for (const entry of statuses) {
		const week = format(entry.date, "yyyy-'W'II");
		const day = format(entry.date, "EEE");
		const count = statusToCount[entry.status];

		if (!dataByWeek[week]) dataByWeek[week] = [];

		dataByWeek[week].push({
			x: day,
			y: count,
		});
	}

	return Object.entries(dataByWeek).map(([week, data]) => ({
		name: week,
		data,
	}));
}

export const isValidDate = (dob: string) => {
	if (dob.length !== 8) return false;

	const day = dob.slice(0, 2);
	const month = dob.slice(2, 4);
	const year = dob.slice(4, 8);

	const formatted = `${year}-${month}-${day}`;
	const result = z.coerce.date().safeParse(formatted);

	if (!result.success) return false;

	const parsed = result.data;
	return (
		parsed.getFullYear() === +year &&
		parsed.getMonth() + 1 === +month &&
		parsed.getDate() === +day
	);
};

export function isUserOnboarded(user: User) {
	if (!user.stats) return false;

	const { weight, height, dob, gender, tdee, activityLevel } = user.stats;

	return (
		weight.length > 0 &&
		!!height &&
		!!dob &&
		!!gender &&
		!!tdee &&
		!!activityLevel
	);
}

export function calcTdee({
	gender,
	age,
	weight,
	height,
	activityLevel,
}: {
	gender: Gender;
	age: number;
	weight: number;
	height: number;
	activityLevel: ActivityLevels;
}) {
	const activityFactors = {
		[ActivityLevels.SEDENTARY]: 1.2,
		[ActivityLevels.LIGHT]: 1.375,
		[ActivityLevels.MODERATE]: 1.55,
		[ActivityLevels.VERY_ACTIVE]: 1.725,
		[ActivityLevels.EXTRA_ACTIVE]: 1.9,
	};

	const bmr =
		10 * weight + 6.25 * height - 5 * age + (gender === "male" ? 5 : -161);

	return Math.round(bmr * activityFactors[activityLevel]);
}

export function calcAgeFromDob(dob: Date) {
	const today = new Date();

	let age = differenceInYears(today, dob);

	const thisYearBirthday = new Date(
		today.getFullYear(),
		dob.getMonth(),
		dob.getDate(),
	);
	if (isBefore(today, thisYearBirthday)) {
		age--;
	}
	console.log("CALCULATED_AGE: ", age);
	return age;
}
