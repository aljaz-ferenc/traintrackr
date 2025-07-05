import WidgetWrapper from "@/components/dashboard/WidgetWrapper.tsx";
import useStats from "@/hooks/api/useStats.ts";
import { Range } from "@/core/enums/Range.enum.ts";
import Spinner from "@/components/Spinner/Spinner.tsx";
import { cn } from "@/lib/utils.ts";
import { useTranslation } from "react-i18next";
import MeasurementsChart from "@/components/stats/MeasurementsChart.tsx";

type WeightCardsProps = {
	className?: string;
};

export default function WeightCards({ className = "" }: WeightCardsProps) {
	const { data: stats, isLoading: isLoadingStats } = useStats(Range.Week);
	const { t } = useTranslation();

	if (isLoadingStats) {
		return <Spinner />;
	}

	if (!stats) {
		return <div>No data...</div>;
	}

	return (
		<div className={cn("@container", className)}>
			<h2 className="text-xl font-bold mb-3">{t("DASHBOARD.weight.weight")}</h2>
			<div className="grid gap-3 @sm:grid-cols-2 @md:grid-cols-3 @lg:grid-cols-3">
				<WidgetWrapper
					title={t("DASHBOARD.weight.current")}
					description={t("DASHBOARD.lastEntry")}
					className="@lg:row-1"
				>
					<div>
						{stats.weight.current?.value ? (
							<span className="text-3xl font-bold">
								{stats.weight.current.value.toFixed(1)}
							</span>
						) : (
							<span className="text-2xl text-muted-foreground font-bold">
								{t("GENERAL.noData")}
							</span>
						)}
						{stats.weight.current?.value && (
							<span className="text-xl"> kg</span>
						)}
					</div>
				</WidgetWrapper>
				<WidgetWrapper
					title={t("DASHBOARD.weight.starting")}
					description={t("DASHBOARD.thisWeek")}
					className="@lg:row-2"
				>
					<div>
						{stats.weight.starting?.value ? (
							<span className="text-3xl font-bold">
								{stats.weight.starting.value.toFixed(1)}
							</span>
						) : (
							<span className="text-2xl text-muted-foreground font-bold">
								{t("GENERAL.noData")}
							</span>
						)}
						{stats.weight.starting?.value && (
							<span className="text-xl"> kg</span>
						)}
					</div>
				</WidgetWrapper>
				<WidgetWrapper
					title={t("DASHBOARD.weight.change")}
					description={t("DASHBOARD.thisWeek")}
					className="@lg:row-3"
				>
					<div>
						<span className="text-3xl font-bold">
							{(
								stats.weight.current?.value - stats.weight.starting?.value || 0
							).toFixed(1)}
						</span>
						<span className="text-xl"> kg</span>
					</div>
				</WidgetWrapper>
				{/*<WidgetWrapper*/}
				{/*	title="Weight"*/}
				{/*	description="At start of mesocycle"*/}
				{/*	className="@lg:row-3"*/}
				{/*>*/}
				{/*	<div>*/}
				{/*		<span className="text-3xl font-bold">*/}
				{/*			{stats.weight.startingThisMeso}*/}
				{/*		</span>*/}
				{/*		<span className="text-xl">kg</span>*/}
				{/*	</div>*/}
				{/*</WidgetWrapper>*/}
				{/*<WidgetWrapper*/}
				{/*	title="Weight change"*/}
				{/*	description="Since start of mesocycle"*/}
				{/*	className="@lg:row-2"*/}
				{/*>*/}
				{/*	<div>*/}
				{/*		<span className="text-3xl font-bold">*/}
				{/*			{stats.weight.changeThisMeso}*/}
				{/*		</span>*/}
				{/*		<span className="text-xl">kg</span>*/}
				{/*	</div>*/}
				{/*</WidgetWrapper>*/}
				<WidgetWrapper
					title={t("DASHBOARD.weight.title")}
					description={t("DASHBOARD.weight.thisWeek")}
					className="@md:col-span-3 @lg:col-2 @lg:col-span-2 @lg:row-span-3"
				>
					<MeasurementsChart
						measurements={stats.weight.weightsInRange}
						label={t("STATS.sections.weight")}
					/>
				</WidgetWrapper>
			</div>
		</div>
	);
}
