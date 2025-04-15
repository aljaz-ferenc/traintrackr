import type { UserWeight } from "@/core/types.ts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart.tsx";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { formatDate } from "date-fns";

type WeightChartProps = {
	weightData: UserWeight[];
};

export default function WeightChart({ weightData }: WeightChartProps) {
	const chartConfig = {
		value: {
			label: "Weight",
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;

	return (
		<div>
			<ChartContainer className="min-h-[100px]" config={chartConfig}>
				<LineChart accessibilityLayer data={weightData}>
					<CartesianGrid vertical={false} />
					<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
					<Line dataKey="value" type="linear" stroke="blue" strokeWidth={2} />
					<XAxis
						dataKey="date"
						tickLine={false}
						axisLine={false}
						tickMargin={20}
						tickFormatter={(date: Date) => formatDate(date, "dd.MM.yyyy")}
					/>
				</LineChart>
			</ChartContainer>
		</div>
	);
}
