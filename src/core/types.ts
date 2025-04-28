import type { ActivityLevels } from "@/core/enums/ActivityLevel.enum.ts";

export type Workout<TExercise = Exercise> = {
	id: string;
	day: number;
	exercises: TExercise[];
	completedAt?: Date;
};

export type Exercise = {
	id: string;
	name: string;
	primaryMuscle: string;
	secondaryMuscles: string[];
};

export type ExerciseWithSets = Exercise & {
	sets: Set[];
};

export type WorkoutLog = {
	_id: string;
	mesoTitle: Mesocycle["title"];
	mesoDuration: Mesocycle["duration"];
	includeDeload: boolean;
	splitType: SplitType;
	createdBy: User["_id"];
	weeks: {
		_id: string;
		workouts: Workout<ExerciseWithSets>[];
	}[];
};

export type SplitType = "synchronous" | "asynchronous";

export type Mesocycle = {
	_id: string;
	title: string;
	duration: number;
	includeDeload: boolean;
	splitType: SplitType;
	workouts: Workout[];
	calorieGoal: number;
	createdBy: string;
};

export type Set = {
	weight: number | null;
	reps: number | null;
	id: string;
};

export type Measurement = {
	date: Date;
	value: number;
};

export type BodyParts = {
	neck: Measurement[];
	shoulders: Measurement[];
	chest: Measurement[];
	belly: Measurement[];
	glutes: Measurement[];
	leftCalf: Measurement[];
	rightCalf: Measurement[];
	leftLeg: Measurement[];
	rightLeg: Measurement[];
	leftArm: Measurement[];
	rightArm: Measurement[];
	leftForearm: Measurement[];
	rightForearm: Measurement[];
};

export type User = {
	_id: string;
	clerkId: string;
	email: string;
	username?: string;
	firstName?: string;
	lastName?: string;
	image?: string;
	lastWorkout?: Date;
	calorieGoal?: number;
	activeMesocycle: {
		mesocycle: Mesocycle;
		startDate: Date;
		endDate: Date;
	} | null;
	stats: {
		weight: Measurement[];
		height: number;
		gender: Gender;
		dob: Date;
		tdee: number;
		activityLevel: ActivityLevels;
		bodyParts: BodyParts;
	};
};

export type FoodItem = {
	_id: string;
	name: string;
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
	createdBy: string;
	portions?: {
		name: string;
		grams: number;
		_id?: string;
	}[];
};

export type Nutrition = {
	_id: string;
	amount: number;
	createdBy: string;
	item: FoodItem;
	createdAt: Date;
};

export type Macros = {
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
};

export type Gender = "male" | "female";

export type Units = "metric" | "imperial";
