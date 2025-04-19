import WidgetWrapper from "@/components/dashboard/WidgetWrapper.tsx";
import Heatmap from "@/components/stats/Heatmap.tsx";
import useStats from "@/hooks/api/useStats.ts";
import { Range } from "@/core/enums/Range.enum.ts";
import Spinner from "@/components/Spinner/Spinner.tsx";
import { cn } from "@/lib/utils.ts";

type MesocycleCardsProps = {
	className?: string;
};

export default function MesocycleCards({
	className = "",
}: MesocycleCardsProps) {
	const { data: stats, isLoading: isLoadingStats } = useStats(Range.Week);

	if (isLoadingStats) {
		return <Spinner />;
	}

	if (!stats) {
		return <div>No data...</div>;
	}
	return (
		<div className={cn(["@container", className])}>
			<h2 className="text-xl font-bold mb-3">Mesocycle</h2>
			<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-3">
				<WidgetWrapper title="Mesocycle progress">
					<span className="text-3xl font-bold">
						{stats.workouts.mesoProgress}%
					</span>
				</WidgetWrapper>
				<WidgetWrapper title="Workouts completed" className="@md:row-2">
					<span className="text-3xl font-bold">
						{stats.workouts.completed}/{stats.workouts.total}
					</span>
				</WidgetWrapper>
				<WidgetWrapper
					title="Workout statuses"
					className="@sm:col-span-2 @md:col-2 @md:row-span-2 @lg:col-span-2"
				>
					{stats && <Heatmap statuses={stats.workouts.statuses} />}
				</WidgetWrapper>
			</div>
		</div>
	);
}
