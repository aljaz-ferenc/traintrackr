import { create } from 'zustand'

export type Workout = {
    id: string
}

export type Mesocycle = {
    _id: string,
    title: string,
    duration: number,
    includeDeload: boolean,
    workouts: Workout[]
}

type NewMesoStore = {
    mesoTitle: string,
    mesoDuration: number,
    includeDeload: boolean,
    workouts: Workout[],
    updateMesoTitle: (mesoTitle: string) => void,
    updateMesoDuration: (mesoDuration: number) => void,
    toggleIncludeDeload: (value: boolean) => void,
    addWorkout: (workout: Workout) => void,
    removeWorkout: (workoutId: string) => void,
    updateWorkout: (workoutId: string, workout: Workout) => void,
    constructMesocycle: () => Omit<Mesocycle, '_id'>
}

export const useNewMesoStore = create<NewMesoStore>((set, getState) => ({
    mesoTitle: '',
    mesoDuration: 0,
    includeDeload: false,
    workouts: [],
    updateMesoTitle: (mesoTitle) => set(state => ({ ...state, mesoTitle })),
    updateMesoDuration: (mesoDuration) => set(state => ({ ...state, mesoDuration })),
    toggleIncludeDeload: (value) => set(state => ({ ...state, includeDeload: value })),
    addWorkout: (workout) => set(state => ({ ...state, workouts: [...state.workouts, workout] })),
    removeWorkout: (workoutId) => set(state => ({
        ...state,
        workouts: state.workouts.filter(workout => workout.id !== workoutId)
    })),
    updateWorkout: (workoutId, updatedWorkout) => set(state => ({
        ...state,
        workouts: state.workouts.map(w => w.id === workoutId ? updatedWorkout : w)
    })),
    constructMesocycle: () => {
        const {mesoTitle, mesoDuration, includeDeload, workouts} = getState()
        return {
            title: mesoTitle,
            duration: mesoDuration,
            includeDeload,
            workouts
        }
    }
}))
