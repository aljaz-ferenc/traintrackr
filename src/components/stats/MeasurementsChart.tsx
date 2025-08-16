import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart.tsx";
import type { Measurement } from "@/core/types.ts";
import { formatDate } from "date-fns";
import { useTranslation } from "react-i18next";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type WeightChartProps = {
	measurements: Measurement[];
	label: string;
};

export default function MeasurementsChart({
	measurements,
	label,
}: WeightChartProps) {
	const chartConfig = {
		value: {
			label,
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;
	const { t } = useTranslation();

	if (!measurements || !measurements.length) {
		return (
			<div className="flex justify-center items-center h-full">
				<p className="text-muted-foreground font-bold text-4xl">
					{t("GENERAL.noData")}
				</p>
			</div>
		);
	}

	return (
		<div>
			<ChartContainer className="min-h-[50px]" config={chartConfig}>
				<LineChart accessibilityLayer data={measurements}>
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
					<YAxis
						domain={["dataMin - 1", "dataMax + 1"]}
						tickLine={false}
						axisLine={false}
					/>
				</LineChart>
			</ChartContainer>
		</div>
	);
}
