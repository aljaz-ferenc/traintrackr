import RouteTitle from "@/components/shared/RouteTitle.tsx";
import { Range } from "@/core/enums/Range.enum.ts";
import useStats from "@/hooks/api/useStats.ts";
import useNutrition from "@/hooks/api/useNutrition.ts";
import NutritionCards from "@/components/dashboard/NutritionCards.tsx";
import WeightCards from "@/components/dashboard/WeightCards.tsx";
import MesocycleCards from "@/components/dashboard/MesocycleCards.tsx";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";
import PageLoading from "@/components/shared/PageLoading.tsx";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
	const {
		data: stats,
		isLoading: isLoadingStats,
		error: statsError,
	} = useStats(Range.Week);
	const {
		data: nutrition,
		isLoading: isLoadingNutrition,
		error: nutritionError,
	} = useNutrition();
	const user = useUserStore(useShallow((state) => state.user));
	const { t } = useTranslation();

	if (isLoadingStats || isLoadingNutrition || !nutrition || !stats) {
		return <PageLoading />;
	}

	if (statsError || nutritionError) {
		console.log(statsError);
		console.log(nutritionError);
	}

	return (
		<section className="mx-auto">
			<RouteTitle title={t("ROUTES.dashboard")} />
			{
				<div className="flex flex-col gap-10">
					<NutritionCards nutrition={stats.nutrition} />
					<WeightCards />
					{user?.activeMesocycle && <MesocycleCards />}
				</div>
			}
		</section>
	);
}
