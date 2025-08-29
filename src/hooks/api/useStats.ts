import { Endpoints } from "@/core/endpoints.ts";
import type { Range } from "@/core/enums/Range.enum.ts";
import type {
	BodyParts,
	Macros,
	Measurement,
	Nutrition,
} from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

export type StatsResponse = {
	nutrition: {
		caloriesToday: number;
		caloriesGoal: number;
		caloriesLeftToday: number;
		averageDailyCaloriesThisWeek: number;
		tdee: number;
		macrosToday: Macros;
		nutritionsThisWeek: Nutrition[];
	};
	weight: {
		current: Measurement;
		starting: Measurement;
		changeInRange: number;
		averageWeeklyChangeInRange: 1;
		startingThisMeso: number;
		changeThisMeso: number;
		averageWeeklyChangeThisMeso: number;
		weightsInRange: Measurement[];
	};
	workouts: {
		completed: number;
		total: number;
		mesoProgress: number;
		statuses: {
			date: Date;
			status: "completed" | "upcoming" | "rest" | "missed";
		}[];
	};
	bodyParts: BodyParts;
};

export default function useStats(range?: Range) {
	const userId = useUserStore(useShallow((state) => state.user?._id));

	return useQuery<StatsResponse>({
		queryKey: ["stats", { range }],
		queryFn: () =>
			createRequest({ url: Endpoints.stats(userId as string, range) }),
		enabled: !!userId,
		gcTime: 60 * 1000 * 10,
		placeholderData: (prev) => prev,
	});
}
