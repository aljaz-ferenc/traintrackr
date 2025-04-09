import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import Workout from "@/components/workout/Workout.tsx";
import useGetAllMesocycles from "@/hooks/api/useGetAllMesocycles.ts";
//TODO: fetch by userId, now fetching all mesos
export default function MyMesocycles() {
	const { data, isLoading } = useGetAllMesocycles();

	console.log(data);
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<section className="w-[900px]">
			<Accordion type="multiple" className="w-full">
				{data?.mesocycles.map((meso) => (
					<AccordionItem key={meso._id} value={meso._id}>
						<AccordionTrigger>
							<div key={meso._id}>{meso.title}</div>
						</AccordionTrigger>
						<AccordionContent>
							<ul key={meso._id} className="flex gap-2  overflow-auto">
								{meso.workouts?.map((workout) => (
									<li key={workout.id}>
										<Workout workout={workout} editable={false} />
									</li>
								))}
							</ul>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
