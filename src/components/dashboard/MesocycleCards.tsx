import Spinner from "@/components/Spinner/Spinner.tsx";
import WidgetWrapper from "@/components/dashboard/WidgetWrapper.tsx";
import Heatmap from "@/components/stats/Heatmap.tsx";
import { Range } from "@/core/enums/Range.enum.ts";
import useStats from "@/hooks/api/useStats.ts";
import { cn } from "@/lib/utils.ts";
import useUserStore from "@/state/UserStore.ts";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";

type MesocycleCardsProps = {
	className?: string;
};

export default function MesocycleCards({
	className = "",
}: MesocycleCardsProps) {
	const { data: stats, isLoading: isLoadingStats } = useStats(Range.Week);
	const { t } = useTranslation();
	const activeMeso = useUserStore(
		useShallow((state) => state.user?.activeMesocycle),
	);

	if (isLoadingStats) {
		return <Spinner />;
	}

	if (!activeMeso?.mesocycle) {
		return null;
	}

	if (!stats) {
		return <div>No data...</div>;
	}
	return (
		<div className={cn(["@container", className])}>
			<h2 className="text-xl font-bold mb-3">{t("DASHBOARD.meso.title")}</h2>
			<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-3">
				<WidgetWrapper title={t("DASHBOARD.meso.progress")}>
					<span className="text-3xl font-bold">
						{stats.workouts.mesoProgress}%
					</span>
				</WidgetWrapper>
				<WidgetWrapper
					title={t("DASHBOARD.meso.completed")}
					className="@md:row-2"
				>
					<span className="text-3xl font-bold">
						{stats.workouts.completed}/{stats.workouts.total}
					</span>
				</WidgetWrapper>
				<WidgetWrapper
					title={t("DASHBOARD.meso.statuses.title")}
					className="@sm:col-span-2 overflow-x-auto @md:col-2 @md:row-span-2 @lg:col-span-2"
				>
					{stats && <Heatmap statuses={stats.workouts.statuses} />}
				</WidgetWrapper>
			</div>
		</div>
	);
}
