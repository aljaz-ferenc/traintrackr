export type Workout<TExercise = Exercise> = {
    id: string;
    day: number;
    exercises: TExercise[];
    completedAt?: Date
};

export type Exercise = {
    id: string;
    name: string;
    primaryMuscle: string;
    secondaryMuscles: string[];
};

export type ExerciseWithSets = Exercise & {
    sets: Set[]
}

type WeekNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type WorkoutLog = {
    _id: string,
    mesoTitle: string,
    workouts: Record<WeekNumber, Workout<ExerciseWithSets>>
}

export type Mesocycle = {
    _id: string;
    title: string;
    duration: number;
    includeDeload: boolean;
    splitType: "synchronized" | "asynchronized";
    workouts: Workout[];
    createdBy: string;
};

export type Set = {
    weight: number | null,
    reps: number | null,
    id: string
}

export type User = {
    clerkId: string;
    email: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    image?: string;
    activeMesocycle: {
        mesoId: string,
        startDate: Date,
        endDate: Date
    } | null;
};