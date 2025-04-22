import WidgetWrapper from "@/components/dashboard/WidgetWrapper.tsx";
import { cn } from "@/lib/utils.ts";
import CaloriesChart from "@/components/nutrition/CaloriesChart.tsx";
import useStats from "@/hooks/api/useStats.ts";
import { Range } from "@/core/enums/Range.enum.ts";
import useNutrition from "@/hooks/api/useNutrition.ts";
import Spinner from "@/components/Spinner/Spinner.tsx";

type NutritionCardsProps = {
	className?: string;
};

export default function NutritionCards({
	className = "",
}: NutritionCardsProps) {
	const { data: stats, isLoading: isLoadingStats } = useStats(Range.Week);
	const { data: nutrition, isLoading: isLoadingNutrition } = useNutrition();

	if (isLoadingStats || isLoadingNutrition) {
		return <Spinner />;
	}

	if (!stats || !nutrition) {
		return <div>No data...</div>;
	}

	return (
		<div className={cn(["@container", className])}>
			<h2 className="text-xl font-bold  mb-3">Nutrition</h2>
			<div className="grid gap-3 grid-cols-[1fr] @sm:grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4">
				<WidgetWrapper
					title="Calories consumed"
					className=""
					description="Today"
				>
					<div>
						<span className="text-3xl font-bold">
							{stats.nutrition.caloriesToday}
						</span>
						<span className="text-xl"> kcal</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper title="Calories left" description="Today">
					<div
						className={cn(
							stats.nutrition.caloriesLeftToday < 0 && "text-red-500",
						)}
					>
						<span className="text-3xl font-bold">
							{stats.nutrition.caloriesLeftToday}
						</span>
						<span className="text-xl"> kcal</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper
					title="Calorie goal"
					description="Today"
					className="@lg:row-2"
				>
					<div>
						<span className="text-3xl font-bold">{stats.nutrition.tdee}</span>
						<span className="text-xl"> kcal</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper
					title="Average calories"
					description="This week"
					className="@lg:row-2"
				>
					<div>
						<span className="text-3xl font-bold">
							{stats.nutrition.averageDailyCaloriesThisWeek}
						</span>
						<span className="text-xl"> kcal/day</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper
					title="Calorie consumption"
					description="This week"
					className="@sm:col-span-2 @lg:row-span-2"
				>
					<CaloriesChart nutritions={nutrition.nutritionsThisWeek} />
				</WidgetWrapper>
			</div>
		</div>
	);
}
