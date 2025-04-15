import MesocyclesAccordion from "@/components/workout/MesocyclesAccordion.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import useMyMesocycles from "@/hooks/api/useMyMesocycles.ts";
export default function MyMesocycles() {
	const { data: myMesos, isLoading } = useMyMesocycles();

	if (isLoading || !myMesos) {
		return <div>Loading...</div>;
	}

	if (!myMesos.length) {
		return <div>No mesocycles</div>;
	}

	return (
		<section className="w-[1200px]">
			<RouteTitle title="My Mesocycles" />
			<MesocyclesAccordion mesocycles={myMesos} />
		</section>
	);
}
