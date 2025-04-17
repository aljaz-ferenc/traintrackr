import {Nutrition} from "@/core/types.ts";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";
import {useMemo} from "react";
import {getDay} from "date-fns";
import {weekDays} from "@/components/workout/Workout.tsx";

type CaloriesChart = {
    nutritions: Nutrition[]
}

const chartConfig = {}

export default function CaloriesChart({nutritions}: CaloriesChart) {

    const chartData = useMemo(() => {
        const grouped: Record<string, number> = weekDays.reduce((acc, day) => {
            acc[day] = 0;
            return acc;
        }, {} as Record<string, number>);

        nutritions.forEach(nutrition => {
            const day = weekDays[getDay(nutrition.date)];
            const calories = (nutrition.amount * nutrition.item.calories) / 100;
            grouped[day] += calories;
        });

        return weekDays.map(day => ({
            day,
            calories: grouped[day],
        }));
    }, [nutritions]);

    return (
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false}/>
                <XAxis
                    dataKey='day'
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    className='uppercase'
                    tickFormatter={(day) => day.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel/>}
                />
                <Bar dataKey='calories' fill="var(--color-primary)" radius={8}/>
            </BarChart>
        </ChartContainer>
    )
}