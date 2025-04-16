import WidgetWrapper from "@/components/dashboard/WidgetWrapper.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import WeightChart from "@/components/stats/WeightChart.tsx";
import { Range } from "@/core/enums/Range.enum.ts";
import useStats from "@/hooks/api/useStats.ts";
import Heatmap from "@/components/stats/Heatmap.tsx";

export default function Home() {
	const { data: stats, isLoading } = useStats(Range.Week);

	if(isLoading || !stats){
		return <div>Loading...</div>
	}

	return (
		<section>
			<RouteTitle title="Dashboard" />
			<div className="grid gap-3">
				<WidgetWrapper title="Calories consumed" className="" description="Today">
					<div>
						<span className="text-3xl font-bold">2000</span>
						<span className="text-xl">kcal</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper title="Calories left" description="Today">
					<div>
						<span className="text-3xl font-bold">344</span>
						<span className="text-xl">kcal</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper title="Calorie goal" description="Today">
					<div>
						<span className="text-3xl font-bold">2500</span>
						<span className="text-xl">kcal</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper
					title="Weight change"
					description="Since start of mesocycle"
				>
					<div>
						<span className="text-3xl font-bold">-2</span>
						<span className="text-xl">kg</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper title="Weight change" description="Average per week">
					<div>
						<span className="text-3xl font-bold">-0.3</span>
						<span className="text-xl">kg</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper title="Average calories" description="Average per week">
					<div>
						<span className="text-3xl font-bold">2350</span>
						<span className="text-xl">kcal</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper title="Weight" className="col-span-3  row-span-4">
					<WeightChart weightData={stats.weight} />
				</WidgetWrapper>
				<WidgetWrapper title='Workout statuses'>
					{stats && <Heatmap statuses={stats.workoutStatuses}/>}
				</WidgetWrapper>
			</div>
		</section>
	);
}
