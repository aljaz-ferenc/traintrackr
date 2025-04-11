import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import Workout from "@/components/workout/Workout.tsx";
import {Ellipsis} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import useDeleteMesocycle from "@/hooks/api/useDeleteMesocycle.ts";
import type {Workout as TWorkout, Mesocycle} from '@/core/types.ts'
import useActivateMesocycle, {type ActivateMesoPayload} from "@/hooks/api/useActivateMesocycle.ts";
import {addWeeks, previousMonday} from "date-fns";
import {useAuth} from "@clerk/clerk-react";
import {useNavigate} from "react-router";

type MesocyclesAccordionProps = {
    mesocycles: Mesocycle[]
}

export default function MesocyclesAccordion({mesocycles}: MesocyclesAccordionProps) {
    //TODO: create popover component?
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const {userId} = useAuth()
    const navigate = useNavigate()
    const {mutateAsync: deleteMeso} = useDeleteMesocycle()
    const {mutateAsync: activateMeso} = useActivateMesocycle()

    const handleDeleteMesocycle = async (mesoId: Mesocycle['_id']) => {
        await deleteMeso(mesoId)
    }

    const handleActivateMesocycle = async (meso: Mesocycle) => {
        const startDate = previousMonday(new Date())
        const endDate = addWeeks(new Date(), meso.duration + 1)

        const activeMesocycle: ActivateMesoPayload = {
            mesocycle: meso._id,
            startDate,
            endDate
        }

        await activateMeso({clerkId: userId as string, activeMesocycle})
    }

    return (
        <Accordion type="multiple" className="w-full">
            {mesocycles.map((meso) => (
                <AccordionItem key={meso._id} value={meso._id}>
                    <AccordionTrigger>
                        <div key={meso._id} className='flex justify-between items-center w-full'>
                            <span>{meso.title}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='flex justify-between'>

                        <ul key={meso._id} className="flex gap-2  overflow-auto">
                            {meso.workouts?.map((workout: TWorkout) => (
                                <li key={workout.id}>
                                    <Workout workout={workout} editable={false}/>
                                </li>
                            ))}
                        </ul>
                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger className='z-20 self-start'>
                                <Ellipsis/>
                            </PopoverTrigger>
                            <PopoverContent side="top" className="w-min p-0">
                                <Button onClick={() => handleDeleteMesocycle(meso._id)} variant="destructive">
                                    Delete Mesocycle
                                </Button>
                                <Button onClick={() => navigate(`/my-mesocycles/${meso._id}/edit`)} variant="secondary">
                                    Update Mesocycle
                                </Button>

                            </PopoverContent>
                        </Popover>
                        </div>
                        {/*//TODO: remove Activate button if already active*/}
                        <Button className='mt-2' onClick={() => handleActivateMesocycle(meso)}>Activate</Button>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
