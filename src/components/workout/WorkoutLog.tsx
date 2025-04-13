import type {Workout, ExerciseWithSets} from '@/core/types'
import {weekDays} from "@/components/workout/Workout.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, TableBody, TableRow, TableCell, TableHead, TableHeader} from "@/components/ui/table.tsx";

type WorkoutLogProps = {
    workout: Workout<ExerciseWithSets>
}

export default function WorkoutLog({workout}: WorkoutLogProps) {
    return (
        <Card className='min-w-md'>
            <CardHeader>
                <CardTitle className='uppercase font-bold'>
                    {weekDays[workout.day]}
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-5'>
                {workout.exercises.map(exercise => (
                    <Card className=''>
                        <CardHeader>
                            <CardTitle>
                                {exercise.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead />
                                        {exercise.sets.map((_set, index) => (
                                            <TableHead key={index} className="text-center text-muted-foreground font-bold">
                                                {index + 1}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className='uppercase font-bold text-muted-foreground'>Reps</TableCell>
                                        {exercise.sets.map((set, idx) => (
                                            <TableCell key={idx} className="text-center font-bold">
                                                {set.reps}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='uppercase font-bold text-muted-foreground'>Weight</TableCell>
                                        {exercise.sets.map((set, idx) => (
                                            <TableCell key={idx} className="text-center font-bold">
                                                {set.weight} kg
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>

                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}