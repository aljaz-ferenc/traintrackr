import type { Macros } from "@/core/types.ts";
import { useMemo } from "react";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart.tsx";
import { Pie, PieChart } from "recharts";

type MacrosPieChartProps = {
	macros: Macros;
};

const chartConfig = {
	protein: {
		label: "Protein",
		color: "hsl(var(--chart-1))",
	},
	fat: {
		label: "Fat",
		color: "hsl(var(--chart-2))",
	},
	carbs: {
		label: "Carbs",
		color: "hsl(var(--chart-3))",
	},
} satisfies ChartConfig;

export default function MacrosPieChart({ macros }: MacrosPieChartProps) {
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
				fill: "rgb(190, 220, 254)",
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
			className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground [&_.recharts-pie-label-text]:text-lg"
		>
			<PieChart>
				<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				<Pie data={chartData} dataKey="percentage" label nameKey="macro" />
				<ChartLegend
					content={<ChartLegendContent nameKey="macro" />}
					className="text-lg -translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
				/>
			</PieChart>
		</ChartContainer>
	);
}
