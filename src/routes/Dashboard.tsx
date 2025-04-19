import RouteTitle from "@/components/shared/RouteTitle.tsx";
import { Range } from "@/core/enums/Range.enum.ts";
import useStats from "@/hooks/api/useStats.ts";
import useNutrition from "@/hooks/api/useNutrition.ts";
import NutritionCards from "@/components/dashboard/NutritionCards.tsx";
import WeightCards from "@/components/dashboard/WeightCards.tsx";
import MesocycleCards from "@/components/dashboard/MesocycleCards.tsx";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";

export default function Dashboard() {
	const { data: stats, isLoading: isLoadingStats } = useStats(Range.Week);
	const { data: nutrition, isLoading: isLoadingNutrition } = useNutrition();
	const user = useUserStore(useShallow((state) => state.user));

	if (isLoadingStats || isLoadingNutrition || !nutrition || !stats) {
		return <div>Loading...</div>;
	}

	return (
		<section className="mx-auto">
			<RouteTitle title="Dashboard" />
			{
				<div className="flex flex-col gap-10">
					<NutritionCards />
					<WeightCards />
					{user?.activeMesocycle && <MesocycleCards />}
				</div>
			}
		</section>
	);
}
