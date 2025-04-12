import type {Exercise} from "@/core/types.ts";

export const mockExercises: Exercise[] = [
	// Biceps
	{
		id: "1",
		name: "Barbell Curl",
		primaryMuscle: "biceps",
		secondaryMuscles: ["forearms"],
	},
	{
		id: "2",
		name: "Hammer Curl",
		primaryMuscle: "biceps",
		secondaryMuscles: ["forearms"],
	},

	// Triceps
	{
		id: "3",
		name: "Tricep Pushdown",
		primaryMuscle: "triceps",
		secondaryMuscles: [],
	},
	{
		id: "4",
		name: "Overhead Tricep Extension",
		primaryMuscle: "triceps",
		secondaryMuscles: [],
	},

	// Shoulders
	{
		id: "5",
		name: "Overhead Press",
		primaryMuscle: "front-delts",
		secondaryMuscles: ["triceps", 'side-delts'],
	},
	{
		id: "6",
		name: "Lateral Raise",
		primaryMuscle: "side-delts",
		secondaryMuscles: [],
	},

	// Traps
	{
		id: "7",
		name: "Barbell Shrug",
		primaryMuscle: "traps",
		secondaryMuscles: ["side-delts"],
	},
	{
		id: "8",
		name: "Dumbbell Shrug",
		primaryMuscle: "traps",
		secondaryMuscles: ["side-delts"],
	},

	// Lats
	{
		id: "9",
		name: "Lat Pulldown",
		primaryMuscle: "lats",
		secondaryMuscles: ["biceps"],
	},
	{
		id: "10",
		name: "Pull-Up",
		primaryMuscle: "lats",
		secondaryMuscles: ["biceps"],
	},

	// Chest
	{
		id: "11",
		name: "Bench Press",
		primaryMuscle: "chest",
		secondaryMuscles: ["triceps", "front-delts"],
	},
	{
		id: "12",
		name: "Incline Dumbbell Press",
		primaryMuscle: "chest",
		secondaryMuscles: ["front-delts", "triceps"],
	},

	// Core
	{ id: "13", name: "Plank", primaryMuscle: "core", secondaryMuscles: [] },
	{
		id: "14",
		name: "Hanging Leg Raise",
		primaryMuscle: "core",
		secondaryMuscles: ["hip flexors"],
	},

	// Forearms
	{
		id: "15",
		name: "Wrist Curl",
		primaryMuscle: "forearms",
		secondaryMuscles: [],
	},
	{
		id: "16",
		name: "Reverse Curl",
		primaryMuscle: "forearms",
		secondaryMuscles: ["biceps"],
	},

	// Glutes
	{
		id: "17",
		name: "Hip Thrust",
		primaryMuscle: "glutes",
		secondaryMuscles: ["hamstrings"],
	},
	{
		id: "18",
		name: "Glute Kickback",
		primaryMuscle: "glutes",
		secondaryMuscles: [],
	},

	// Quads
	{
		id: "19",
		name: "Squat",
		primaryMuscle: "quads",
		secondaryMuscles: ["glutes", "hamstrings"],
	},
	{
		id: "20",
		name: "Leg Press",
		primaryMuscle: "quads",
		secondaryMuscles: ["glutes"],
	},

	// Hamstrings
	{
		id: "21",
		name: "Romanian Deadlift",
		primaryMuscle: "hamstrings",
		secondaryMuscles: ["glutes", "lower back"],
	},
	{
		id: "22",
		name: "Seated Leg Curl",
		primaryMuscle: "hamstrings",
		secondaryMuscles: [],
	},

	// Calves
	{
		id: "23",
		name: "Standing Calf Raise",
		primaryMuscle: "calves",
		secondaryMuscles: [],
	},
	{
		id: "24",
		name: "Seated Calf Raise",
		primaryMuscle: "calves",
		secondaryMuscles: [],
	},

	// Lower Back
	{
		id: "25",
		name: "Back Extension",
		primaryMuscle: "lower back",
		secondaryMuscles: ["glutes", "hamstrings"],
	},
	{
		id: "26",
		name: "Deadlift",
		primaryMuscle: "lower back",
		secondaryMuscles: ["glutes", "hamstrings", "traps"],
	},
];
