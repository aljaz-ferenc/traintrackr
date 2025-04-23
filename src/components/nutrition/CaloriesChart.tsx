import type { Nutrition } from "@/core/types.ts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart.tsx";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useMemo } from "react";
import { getDay } from "date-fns";
import { weekDays } from "@/components/workout/Workout.tsx";
import { useTranslation } from "react-i18next";

type CaloriesChart = {
	nutritions: Nutrition[];
};

const chartConfig = {};

export default function CaloriesChart({ nutritions }: CaloriesChart) {
	const { t } = useTranslation();
	const chartData = useMemo(() => {
		const grouped: Record<string, number> = weekDays.reduce(
			(acc, { day }) => {
				acc[day] = 0;
				return acc;
			},
			{} as Record<string, number>,
		);

		for (const nutrition of nutritions) {
			const dayValue = getDay(nutrition.createdAt);
			const weekday = weekDays.find((d) => d.value === dayValue);
			if (!weekday) continue;

			const calories = (nutrition.amount * nutrition.item.calories) / 100;
			grouped[weekday.day] += calories;
		}

		return weekDays.map(({ day }) => ({
			day: t(`GENERAL.days.${day.toLowerCase()}.short`),
			calories: grouped[day],
		}));
	}, [nutritions, t]);

	console.log(chartData);

	return (
		<ChartContainer config={chartConfig}>
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="day"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					className="uppercase"
					tickFormatter={(day) => day.slice(0, 3)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Bar dataKey="calories" fill="var(--color-primary)" radius={8} />
			</BarChart>
		</ChartContainer>
	);
}
