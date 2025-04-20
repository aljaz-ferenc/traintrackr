import MesocyclesAccordion from "@/components/workout/MesocyclesAccordion.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import useMyMesocycles from "@/hooks/api/useMyMesocycles.ts";
import PageLoading from "@/components/shared/PageLoading.tsx";
export default function MyMesocycles() {
	const { data: myMesos, isLoading } = useMyMesocycles();

	if (isLoading || !myMesos) {
		return <PageLoading />;
	}

	if (!myMesos.length) {
		return <div>No mesocycles</div>;
	}

	return (
		<section>
			<RouteTitle title="My Mesocycles" />
			<MesocyclesAccordion mesocycles={myMesos} />
		</section>
	);
}
