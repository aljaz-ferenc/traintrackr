import WidgetWrapper from "@/components/dashboard/WidgetWrapper.tsx";
import { cn } from "@/lib/utils.ts";
import CaloriesChart from "@/components/nutrition/CaloriesChart.tsx";
import MacrosPieChart from "@/components/nutrition/MacrosPieChart.tsx";
import { useTranslation } from "react-i18next";
import type { StatsResponse } from "@/hooks/api/useStats.ts";
import { Edit } from "lucide-react";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router";
import { Route } from "@/core/enums/Routes.enum.ts";

type NutritionCardsProps = {
	className?: string;
	nutrition: StatsResponse["nutrition"];
};

export default function NutritionCards({
	className = "",
	nutrition,
}: NutritionCardsProps) {
	const { t } = useTranslation();
	const [activeMeso] = useUserStore(
		useShallow((state) => [state.user?.activeMesocycle]),
	);
	const navigate = useNavigate();

	return (
		<div className={cn(["@container", className])}>
			<h2 className="text-xl font-bold mb-3">
				{t("DASHBOARD.nutrition.title")}
			</h2>
			<div className="grid gap-3 grid-cols-[1fr] @sm:grid-cols-2 @md:grid-cols-4">
				<WidgetWrapper
					title={t("DASHBOARD.nutrition.calsConsumed")}
					className="col-span-2 row-1 @sm:col-1 @md:row-1 @md:col-1"
					description={t("DASHBOARD.today")}
				>
					<div>
						<span className="text-3xl font-bold">
							{nutrition.caloriesToday}
						</span>
						<span className="text-xl"> kcal</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper
					title={t("DASHBOARD.nutrition.calsLeft")}
					description={t("DASHBOARD.today")}
					className="row-2 col-span-2 @sm:col-2 @sm:row-1  @md:row-1 @md:col-2"
				>
					<div
						className={cn(nutrition.caloriesLeftToday < 0 && "text-red-500")}
					>
						<span className="text-3xl font-bold">
							{nutrition.caloriesLeftToday}
						</span>
						<span className="text-xl"> kcal</span>
					</div>
				</WidgetWrapper>
				<WidgetWrapper
					title={t("DASHBOARD.nutrition.calsGoal")}
					description={t("DASHBOARD.today")}
					className="row-3 col-span-2 @sm:row-2 @sm:col-1  @md:row-1 @md:col-3"
				>
					<div className="flex justify-between items-baseline">
						<div>
							<span className="text-3xl font-bold">
								{nutrition.caloriesGoal}
							</span>
							<span className="text-xl"> kcal</span>
						</div>
						{!!activeMeso?.mesocycle && (
							<button
								type="button"
								className="cursor-pointer text-muted hover:text-primary transition"
								onClick={() =>
									navigate(
										`/${Route.MyMesocycles}/${activeMeso?.mesocycle._id}/edit`,
									)
								}
							>
								<Edit size={20} />
							</button>
						)}
					</div>
				</WidgetWrapper>
				<WidgetWrapper
					title={t("DASHBOARD.nutrition.avgCals")}
					description={t("DASHBOARD.thisWeek")}
					className="row-4 col-span-2 @sm:row-2 @sm:col-2  @md:row-1 @md:col-4"
				>
					{nutrition.averageDailyCaloriesThisWeek ? (
						<div>
							<span className="text-3xl font-bold">
								{nutrition.averageDailyCaloriesThisWeek}
							</span>
							<span className="text-xl"> {`kcal / ${t("GENERAL.day")}`}</span>
						</div>
					) : (
						<div className="text-center font-bold text-muted-foreground text-xl">
							{t("GENERAL.noData")}
						</div>
					)}
				</WidgetWrapper>
				<WidgetWrapper
					title={t("DASHBOARD.nutrition.calsConsumption")}
					description={t("DASHBOARD.thisWeek")}
					className="row-5 col-span-2 @sm:row-3 @sm:col-1 @sm:col-span-2 @md:row-2 @md:col-1 @md:col-span-2"
				>
					{nutrition.nutritionsThisWeek && (
						<CaloriesChart nutritions={nutrition.nutritionsThisWeek} />
					)}
				</WidgetWrapper>
				<WidgetWrapper
					title={t("DASHBOARD.nutrition.macrosRatio")}
					description={t("DASHBOARD.today")}
					className="row-6 col-span-2 @sm:row-4 @sm:col-1 @sm:col-span-2 @md:row-2 @md:col-3 @md:col-span-2"
				>
					{nutrition.caloriesToday > 0 ? (
						<MacrosPieChart macros={nutrition.macrosToday} />
					) : (
						<div className=" text-2xl font-bold text-muted-foreground text-center h-full grid place-items-center pb-8">
							{t("GENERAL.noData")}
						</div>
					)}
				</WidgetWrapper>
			</div>
		</div>
	);
}
