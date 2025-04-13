import type {Workout, ExerciseWithSets} from '@/core/types'
import {weekDays} from "@/components/workout/Workout.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, TableBody, TableRow, TableCell, TableHeader, TableHead} from "@/components/ui/table.tsx";

type WorkoutLogProps = {
    workout: Workout<ExerciseWithSets>
}

export default function WorkoutLog({workout}: WorkoutLogProps) {
    return (
        <Card className='min-w-sm'>
            <CardHeader>
                <CardTitle className='uppercase'>
                    {weekDays[workout.day]}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {workout.exercises.map(exercise => (
                    <Table className='mb-5'>
                        <TableHeader>
                            <TableHead className='font-bold uppercase text-md'>{exercise.name}</TableHead>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Reps</TableCell>
                                {exercise.sets.map(set => (
                                    <TableCell>{set.reps}</TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell>Weight</TableCell>
                                {exercise.sets.map(set => (
                                    <TableCell>{set.weight}</TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                ))}
            </CardContent>
        </Card>
    )
}