import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import Workout from "@/components/workout/Workout.tsx";
import { Ellipsis } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover.tsx";
import Button from "@/components/shared/Button.tsx";
import { useState } from "react";
import useDeleteMesocycle from "@/hooks/api/useDeleteMesocycle.ts";
import type { Workout as TWorkout, Mesocycle } from "@/core/types.ts";
import useActivateMesocycle, {
	type ActivateMesoPayload,
} from "@/hooks/api/useActivateMesocycle.ts";
import { addWeeks, previousMonday, subDays } from "date-fns";
import { useNavigate } from "react-router";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";

type MesocyclesAccordionProps = {
	mesocycles: Mesocycle[];
};

export default function MesocyclesAccordion({
	mesocycles,
}: MesocyclesAccordionProps) {
	//TODO: create popover component?
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const navigate = useNavigate();
	const { mutateAsync: deleteMeso, isPending: isDeleting } =
		useDeleteMesocycle();
	const { mutateAsync: activateMeso, isPending: isActivating } =
		useActivateMesocycle();
	const user = useUserStore(useShallow((state) => state.user));

	const handleDeleteMesocycle = async (mesoId: Mesocycle["_id"]) => {
		await deleteMeso(mesoId);
		setIsPopoverOpen(false);
	};

	const handleActivateMesocycle = async (meso: Mesocycle) => {
		const startDate = previousMonday(new Date());
		const endDate = subDays(addWeeks(new Date(), meso.duration + 1), 1);

		const activeMesocycle: ActivateMesoPayload = {
			mesocycle: meso._id,
			startDate,
			endDate,
		};

		await activateMeso({ userId: user?._id as string, activeMesocycle });
		setIsPopoverOpen(false);
	};

	const handleUpdateMesocycle = (mesoId: Mesocycle["_id"]) => {
		navigate(`/my-mesocycles/${mesoId}/edit`);
	};

	return (
		<Accordion type="multiple" className="w-full">
			{mesocycles.map((meso) => (
				<AccordionItem key={meso._id} value={meso._id}>
					<AccordionTrigger className="cursor-pointer">
						<div
							key={meso._id}
							className="flex justify-between items-center w-full"
						>
							<span>{meso.title}</span>
							{user?.activeMesocycle?.mesocycle._id === meso._id && (
								<span className="mr-auto text-green-500 font-bold ml-2">
									ACTIVE
								</span>
							)}
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<div className="flex justify-between">
							<ul key={meso._id} className="flex gap-2  overflow-auto">
								{meso.workouts?.map((workout: TWorkout) => (
									<li key={workout.id}>
										<Workout workout={workout} editable={false} />
									</li>
								))}
							</ul>
							<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
								<PopoverTrigger className="z-20 self-start cursor-pointer">
									<Ellipsis />
								</PopoverTrigger>
								<PopoverContent
									side="top"
									className="w-min p-2 flex flex-col gap-2"
								>
									<Button
										onClick={() => handleDeleteMesocycle(meso._id)}
										variant="destructive"
										isLoading={isDeleting}
										className="w-full min-w-max"
									>
										Delete Mesocycle
									</Button>
									<Button
										onClick={() => handleUpdateMesocycle(meso._id)}
										variant="secondary"
										className="w-full min-w-max"
									>
										Update Mesocycle
									</Button>
								</PopoverContent>
							</Popover>
						</div>
						{user?.activeMesocycle?.mesocycle._id !== meso._id && (
							<Button
								className="mt-2 cursor-pointer"
								onClick={() => handleActivateMesocycle(meso)}
								isLoading={isActivating}
							>
								Activate
							</Button>
						)}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
