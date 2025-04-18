import { Endpoints } from "@/core/endpoints.ts";
import type { User, UserWeight } from "@/core/types.ts";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";
import type { Range } from "@/core/enums/Range.enum.ts";

async function fetchStats(userId: User["_id"], range?: Range) {
	const res = await fetch(Endpoints.stats(userId, range));
	return await res.json();
}

export type StatsPayload = {
	nutrition: {
		caloriesToday: number;
		macrosToday: number;
		caloriesGoal: number;
		caloriesLeftToday: number;
		averageDailyCalories: number;
		tdee: number;
	};
	weight: {
		current: number;
		starting: number;
		changeInRange: number;
		averageWeeklyChangeInRange: 1;
		startingThisMeso: number;
		changeThisMeso: number;
		averageWeeklyChangeThisMeso: number;
		weightsInRange: UserWeight[]
	};
	workouts: {
		completed: number;
		total: number;
		mesoProgress: number;
		statuses: {date: Date, status: 'completed' | 'upcoming' | 'rest' | 'missed' }[]
	};
};

export default function useStats(range?: Range) {
	const userId = useUserStore(useShallow((state) => state.user?._id));

	return useQuery<StatsPayload>({
		queryKey: ["stats", { range }],
		queryFn: () => fetchStats(userId as string, range),
		enabled: !!userId,
	});
}
