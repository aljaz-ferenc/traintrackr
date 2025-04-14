import useGetAllMesocycles from "@/hooks/api/useGetAllMesocycles.ts";
import MesocyclesAccordion from "@/components/workout/MesocyclesAccordion.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
//TODO: fetch by userId, now fetching all mesos
export default function MyMesocycles() {
	const { data, isLoading } = useGetAllMesocycles();

	if (isLoading || !data) {
		return <div>Loading...</div>;
	}

	if (!data.mesocycles.length) {
		return <div>No mesocycles</div>;
	}

	return (
		<section className="w-[1200px]">
			<RouteTitle title="My Mesocycles" />
			<MesocyclesAccordion mesocycles={data.mesocycles} />
		</section>
	);
}
