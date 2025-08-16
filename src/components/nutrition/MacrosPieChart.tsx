import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart.tsx";
import type { Macros } from "@/core/types.ts";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LabelList, Pie, PieChart } from "recharts";

type MacrosPieChartProps = {
	macros: Macros;
};

export default function MacrosPieChart({ macros }: MacrosPieChartProps) {
	const { t } = useTranslation();

	const chartConfig = {
		protein: {
			label: t("DASHBOARD.nutrition.protein"),
			color: "hsl(var(--chart-1))",
		},
		fat: {
			label: t("DASHBOARD.nutrition.fat"),
			color: "hsl(var(--chart-2))",
		},
		carbs: {
			label: t("DASHBOARD.nutrition.carbs"),
			color: "hsl(var(--chart-3))",
		},
	} satisfies ChartConfig;

	const chartData = useMemo(() => {
		const proteinCalories = macros.protein * 4;
		const fatCalories = macros.fat * 9;
		const carbsCalories = macros.carbs * 4;

		const total = proteinCalories + fatCalories + carbsCalories;

		return [
			{
				macro: "protein",
				percentage: Math.round((proteinCalories / total) * 100),
				fill: "rgb(37, 99, 235)",
			},
			{
				macro: "fat",
				percentage: Math.round((fatCalories / total) * 100),
				fill: "rgb(96, 168, 251)",
			},
			{
				macro: "carbs",
				percentage: Math.round((carbsCalories / total) * 100),
				fill: "rgb(59, 134, 247)",
			},
		];
	}, [macros]);

	return (
		<ChartContainer
			config={chartConfig}
			className="w-full mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground [&_.recharts-pie-label-text]:text-lg"
		>
			<PieChart>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Pie
					data={chartData}
					dataKey="percentage"
					nameKey="macro"
					label={({ percentage }) => `${percentage}%`}
				>
					<LabelList
						dataKey="macro"
						className="fill-primary capitalize"
						stroke="none"
						fontSize={12}
						formatter={(value: keyof typeof chartConfig) =>
							chartConfig[value]?.label
						}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
}
