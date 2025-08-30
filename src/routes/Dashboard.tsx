import MesocycleCards from "@/components/dashboard/MesocycleCards.tsx";
import NutritionCards from "@/components/dashboard/NutritionCards.tsx";
import WeightCards from "@/components/dashboard/WeightCards.tsx";
import PageLoading from "@/components/shared/PageLoading.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import { Range } from "@/core/enums/Range.enum.ts";
import useStats from "@/hooks/api/useStats.ts";
import useUserStore from "@/state/UserStore.ts";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";

export default function Dashboard() {
	const { data: stats, error: statsError, isFetched } = useStats(Range.Week);

	const user = useUserStore(useShallow((state) => state.user));
	const { t } = useTranslation();

	if (!isFetched) {
		return <PageLoading />;
	}

	if (statsError) {
		console.log(statsError);
	}

	return (
		<section className="mx-auto max-w-[1440px]">
			<RouteTitle title={t("ROUTES.dashboard")} />
			{
				<div className="flex flex-col gap-10">
					{stats && <NutritionCards nutrition={stats.nutrition} />}
					<WeightCards />
					{user?.activeMesocycle && <MesocycleCards />}
				</div>
			}
		</section>
	);
}
