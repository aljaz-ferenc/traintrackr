import RouteTitle from "@/components/shared/RouteTitle.tsx";
import useStats from "@/hooks/api/useStats.ts";
import { Range } from "@/routes/Stats.tsx";
import WeightChart from "@/components/stats/WeightChart.tsx";
import WidgetWrapper from "@/components/dashboard/WidgetWrapper.tsx";

export default function Home() {
	const { data: stats } = useStats(Range.Week);

	return (
		<section className="w-[1200px]">
			<RouteTitle title="Dashboard" />
			<div className="grid gap-3 grid-rows-6 grid-cols-[1fr_1fr_1fr_1fr]">
				<WidgetWrapper title="Calories" className="" description="Today">
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
					<WeightChart weightData={stats?.weight} />
				</WidgetWrapper>
			</div>
		</section>
	);
}
