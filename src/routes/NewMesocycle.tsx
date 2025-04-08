import {Input} from "@/components/ui/Input.tsx";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import AppTooltip from "@/components/shared/Tooltip.tsx";
import {Separator} from "@/components/ui/separator"
import {Button} from "@/components/ui/button.tsx";
import Workout from "@/components/workout/Workout.tsx";
import {useNewMesoStore} from "@/state/NewMesoStore.ts";
import {useShallow} from "zustand/react/shallow";

const mesoDurationOptions = [4, 6, 8, 10]

export default function NewMesocycle() {
    const [
        mesoTitle,
        mesoDuration,
        includeDeload,
        workouts,
        updateMesoTitle,
        updateMesoDuration,
        toggleIncludeDeload,
        addWorkout,
        constructMesocycle
    ] = useNewMesoStore(useShallow(state => [
        state.mesoTitle,
        state.mesoDuration,
        state.includeDeload,
        state.workouts,
        state.updateMesoTitle,
        state.updateMesoDuration,
        state.toggleIncludeDeload,
        state.addWorkout,
        state.constructMesocycle
    ]))

    const handleCreateMeso = () => {
        console.log(constructMesocycle())
    }

    return (
        <section className='w-[600px] flex flex-col gap-5'>
            <div className='flex flex-col gap-5'>
                <div>
                    <Label>Mesocycle Name</Label>
                    <Input value={mesoTitle} className='w-full' onChange={e => updateMesoTitle(e.target.value)}/>
                </div>
                <div>
                    <Label>Mesocycle duration in weeks</Label>
                    <ToggleGroup value={String(mesoDuration)} type='single' className='flex gap-2'
                                 onValueChange={duration => updateMesoDuration(Number(duration))}>
                        {mesoDurationOptions.map(option => <ToggleGroupItem className='cursor-pointer p-5' key={option}
                                                                            value={String(option)}>{option}</ToggleGroupItem>)}
                    </ToggleGroup>
                </div>
                <div className='flex items-center gap-1'>
                    <Checkbox checked={includeDeload} id='mesoDuration' className='cursor-pointer' onCheckedChange={val => toggleIncludeDeload(val as boolean)}/>
                    <Label htmlFor='mesoDuration'>Include deload week</Label>
                    <AppTooltip content='Weight will be lowered by 50% on the last week of the mesoccle.'/>
                </div>
                <Separator/>
            </div>
            <div className='flex flex-col gap-5 overflow-auto relative'>
                <Button variant='secondary' className='cursor-pointer max-w-20 sticky top-0 left-0' onClick={() => addWorkout({id: crypto.randomUUID()})}>Add day</Button>
                <div className='flex gap-5'>
                {workouts.map(workout => <Workout key={workout.id} workout={workout}/>)}
                </div>
            </div>
            <Button variant='default' onClick={handleCreateMeso}>Create Mesocycle</Button>
        </section>
    )
}
