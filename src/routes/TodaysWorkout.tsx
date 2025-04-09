import {weekDays} from "@/components/workout/Workout.tsx";
import useGetMesocycleById from "@/hooks/api/useGetMesocyleById.ts";
import {getDay} from 'date-fns'
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import {Input} from "@/components/ui/Input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect} from "react";
import {useTodaysWorkoutStore} from "@/state/TodaysWorkoutStore.ts";
import {useShallow} from "zustand/react/shallow";
import {X} from "lucide-react";
import type {Set as TSet} from '@/core/types.ts'

export default function TodaysWorkout() {
    //TODO: fetch active meso, currently just using the first one from all of them, first workout
    const {data, isLoading} = useGetMesocycleById('67f69328f5e5b6c596cc9326');
    const [exercises, setExercises, addSetToExercise, removeSetFromExercise, updateSet] = useTodaysWorkoutStore(useShallow(state => [state.exercises, state.setExercises, state.addSetToExercise, state.removeSetFromExercise, state.updateSet]))

    const todaysWorkout = data?.mesocycle.workouts.find(workout => workout.day === getDay(new Date()))

    useEffect(() => {
        if (!data || exercises.length || !todaysWorkout) return
        setExercises(todaysWorkout.exercises)
    }, [data, exercises.length, setExercises, todaysWorkout]);

    if (isLoading || !data) {
        return <div>Loading...</div>;
    }

    console.log(todaysWorkout)

    if (!todaysWorkout) {
        return <div>No workout?</div>
    }

    return (
        <section className="w-[600px]">
            <RouteTitle title="Today's Workout"/>
            <div className='bg-blue-100 p-2 flex flex-col gap-1 mb-2'>
                <span className='uppercase'>{data.mesocycle.title}</span>
                {/*//TODO: calculate week*/}
                <span className='text-xl font-bold uppercase'>Week 1/6 - {weekDays[todaysWorkout?.day]}</span>
            </div>
            <ul className='flex flex-col gap-2 mb-2'>
                {exercises.map((exercise, exerciseIndex) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <li key={exerciseIndex} className='bg-blue-100 p-2'>
                        <span className='uppercase font-bold'>{exercise.name}</span>
                        <table className='table-auto w-full border-separate border-spacing-2'>
                            <thead>
                            <tr>
                                <th>SET</th>
                                <th>WEIGHT</th>
                                <th>REPS</th>
                                <th />
                            </tr>
                            </thead>
                            <tbody>
                            {exercise.sets.map((set: TSet , setIndex: number) => (
                                <tr key={set.id}>
                                    <td>{setIndex + 1}</td>
                                    <td><Input className='bg-white' onChange={e => updateSet(exerciseIndex, set.id, 'weight', e.target.value)}/></td>
                                    <td><Input className='bg-white'/></td>
                                    <td>
                                        <Button variant='ghost' className='cursor-pointer' onClick={() => removeSetFromExercise(exerciseIndex, set.id)}>
                                        <X color='red'/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Button className='uppercase cursor-pointer' type='button'
                                onClick={() => addSetToExercise(exerciseIndex)}>ADD SET</Button>
                    </li>
                ))}
            </ul>
            <Button className='w-full'>Complete Workout</Button>
        </section>
    );
}
