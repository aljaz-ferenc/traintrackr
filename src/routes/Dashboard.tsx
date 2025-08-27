import MesocycleCards from "@/components/dashboard/MesocycleCards.tsx";
import NutritionCards from "@/components/dashboard/NutritionCards.tsx";
import WeightCards from "@/components/dashboard/WeightCards.tsx";
import PageLoading from "@/components/shared/PageLoading.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import { Range } from "@/core/enums/Range.enum.ts";
import useNutrition from "@/hooks/api/useNutrition.ts";
import useStats from "@/hooks/api/useStats.ts";
import useUserStore from "@/state/UserStore.ts";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";

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
		<section className="mx-auto max-w-[1440px]">
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
