import {useMutation} from "@tanstack/react-query";
import {Endpoints} from "@/core/endpoints.ts";
import type {ExerciseWithSets, Workout} from "@/core/types.ts";

type CompleteWorkoutPayload = {
    weekNumber: number
    workout: Workout<ExerciseWithSets>
    mesoId: string
}

async function fetchCompleteWorkout(payload: CompleteWorkoutPayload){
    const res = await fetch(Endpoints.logs, {
        body: JSON.stringify(payload),
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        }
    })
    return await res.json()
}

export default function useCompleteWorkout(){
    return useMutation({
        mutationKey: ['workout-complete'],
        mutationFn: (payload: CompleteWorkoutPayload) => fetchCompleteWorkout(payload)
    })
}