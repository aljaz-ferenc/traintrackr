import WidgetWrapper from "@/components/dashboard/WidgetWrapper.tsx";
import WeightChart from "@/components/stats/WeightChart.tsx";
import useStats from "@/hooks/api/useStats.ts";
import { Range } from "@/core/enums/Range.enum.ts";
import Spinner from "@/components/Spinner/Spinner.tsx";
import { cn } from "@/lib/utils.ts";

type WeightCardsProps = {
	className?: string;
};

export default function WeightCards({ className = "" }: WeightCardsProps) {
	const { data: stats, isLoading: isLoadingStats } = useStats(Range.Week);

	if (isLoadingStats) {
		return <Spinner />;
	}

	if (!stats) {
		return <div>No data...</div>;
	}

	return (
		<div className={cn("@container", className)}>
			<h2 className="text-xl font-bold mb-3">Weight</h2>
			<div className="grid gap-3 @sm:grid-cols-2 @md:grid-cols-3 @lg:grid-cols-3">
				<WidgetWrapper
					title="Current"
					description="Last entry"
					className="@lg:row-1"
				>
					<div>
						<span className="text-3xl font-bold">
							{stats.weight.current.value.toFixed(1)}
						</span>
						<span className="text-xl"> kg</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper
					title="Starting"
					description="This week"
					className="@lg:row-2"
				>
					<div>
						<span className="text-3xl font-bold">
							{stats.weight.starting.value.toFixed(1)}
						</span>
						<span className="text-xl"> kg</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper
					title="Change"
					description="This week"
					className="@lg:row-3"
				>
					<div>
						<span className="text-3xl font-bold">
							{(
								stats.weight.current.value - stats.weight.starting.value
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
					title="Weight"
					className="@md:col-span-3 @lg:col-2 @lg:col-span-2 @lg:row-span-3"
				>
					<WeightChart weightData={stats.weight.weightsInRange} />
				</WidgetWrapper>
			</div>
		</div>
	);
}
