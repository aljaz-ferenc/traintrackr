import WidgetWrapper from "@/components/dashboard/WidgetWrapper.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import WeightChart from "@/components/stats/WeightChart.tsx";
import {Range} from "@/core/enums/Range.enum.ts";
import useStats from "@/hooks/api/useStats.ts";
import Heatmap from "@/components/stats/Heatmap.tsx";
import useNutrition from "@/hooks/api/useNutrition.ts";
import {cn} from "@/lib/utils.ts";
import CaloriesChart from "@/components/nutrition/CaloriesChart.tsx";

export default function Home() {
    const {data: stats, isLoading: isLoadingStats} = useStats(Range.Week);
    const {data: nutrition, isLoading: isLoadingNutrition} = useNutrition()

    if (isLoadingStats || isLoadingNutrition || !nutrition || !stats) {
        return <div>Loading...</div>
    }

    return (
        <section>
            <RouteTitle title="Dashboard"/>
            {<div className="grid gap-3 grid-cols-4 grid-rows-[1fr_1fr1_fr]">
                <WidgetWrapper title="Calories consumed" className="" description="Today">
                    <div>
                        <span className="text-3xl font-bold">{stats.nutrition.caloriesToday}</span>
                        <span className="text-xl">kcal</span>
                    </div>
                </WidgetWrapper>
                <WidgetWrapper title="Calories left" description="Today">
                    <div className={cn(stats.nutrition.caloriesLeftToday < 0 && 'text-red-500')}>
                        <span className="text-3xl font-bold">{stats.nutrition.caloriesLeftToday}</span>
                        <span className="text-xl">kcal</span>
                    </div>
                </WidgetWrapper>
                <WidgetWrapper title="Calorie goal" description="Today">
                    <div>
                        <span className="text-3xl font-bold">{stats.nutrition.tdee}</span>
                        <span className="text-xl">kcal</span>
                    </div>
                </WidgetWrapper>
                <WidgetWrapper title="Average calories" description="This week">
                    <div>
                        <span className="text-3xl font-bold">{stats.nutrition.averageDailyCalories}</span>
                        <span className="text-xl">kcal/day</span>
                    </div>
                </WidgetWrapper>
                <WidgetWrapper title='Mesocycle progress'>
                    <span className='text-3xl font-bold'>{stats.workouts.mesoProgress}%</span>
                </WidgetWrapper>
                <WidgetWrapper title='Workouts completed'>
                    <span className='text-3xl font-bold'>
                    {stats.workouts.completed}/{stats.workouts.total}
                    </span>
                </WidgetWrapper>
                <WidgetWrapper title='Calorie consumption' description='This week' className='col-span-2 !row-3'>
                    <CaloriesChart nutritions={nutrition.nutritionsThisWeek}/>
                </WidgetWrapper>
                <WidgetWrapper
                    title="Weight change"
                    description="Since start of mesocycle"
                >
                    <div>
                        <span className="text-3xl font-bold">{stats.weight.changeThisMeso}</span>
                        <span className="text-xl">kg</span>
                    </div>
                </WidgetWrapper>
                <WidgetWrapper title="Weight change" description="Average per week">
                    <div>
                        <span className="text-3xl font-bold">{stats.weight.changeInRange}</span>
                        <span className="text-xl">kg</span>
                    </div>
                </WidgetWrapper>
                <WidgetWrapper title="Weight" className="col-span-2">
                    <WeightChart weightData={stats.weight.weightsInRange}/>
                </WidgetWrapper>
                <WidgetWrapper title='Workout statuses' className="row-span-2 col-span-2">
                    {stats && <Heatmap statuses={stats.workouts.statuses}/>}
                </WidgetWrapper>
            </div>}
        </section>
    );
}
