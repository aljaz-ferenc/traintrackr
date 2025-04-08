import {useNewMesoStore, type Workout as TWorkout} from "@/state/NewMesoStore.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Ellipsis} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react";
import {useShallow} from "zustand/react/shallow";


type WorkoutProps = {
    workout: TWorkout
}

const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export default function Workout({workout}: WorkoutProps) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [removeWorkout] = useNewMesoStore(useShallow(state => [state.removeWorkout]))

    const handleRemoveWorkout = () => {
        removeWorkout(workout.id)
        setIsPopoverOpen(false)
    }

    return (
        <article className='p-2 border-gray-400 rounded flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
                <Select>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select day' className='bg-white'/>
                        <SelectContent>
                            {weekDays.map(day => <SelectItem value={day} key={day} className='capitalize'>{day}</SelectItem>)}
                        </SelectContent>
                    </SelectTrigger>
                </Select>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger>
                        <Ellipsis/>
                    </PopoverTrigger>
                    <PopoverContent side='top' className='w-min p-0'>
                        <Button onClick={handleRemoveWorkout} variant='destructive'>Delete Workout</Button>
                    </PopoverContent>
                </Popover>
            </div>
            <Button variant='outline'>+ Add muscle group</Button>
        </article>
    )
}