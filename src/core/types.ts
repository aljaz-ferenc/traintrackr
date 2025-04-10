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

export type WorkoutLog = {
    _id: string,
    mesoTitle: Mesocycle['title']
    mesoDuration: Mesocycle['duration']
    includeDeload: boolean,
    splitType: SplitType,
    createdBy: User['_id']
    weeks: LogWeek[]
}

export type LogWeek = {
    weekNumber: number,
    workouts: Workout<ExerciseWithSets>[]
}

export type SplitType = "synchronous" | "asynchronous"

export type Mesocycle = {
    _id: string;
    title: string;
    duration: number;
    includeDeload: boolean;
    splitType: SplitType;
    workouts: Workout[];
    createdBy: string;
};

export type Set = {
    weight: number | null,
    reps: number | null,
    id: string
}

export type User = {
    _id: string,
    clerkId: string;
    email: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    image?: string;
    activeMesocycle: {
        mesocycle: Mesocycle,
        startDate: Date,
        endDate: Date
    } | null;
};