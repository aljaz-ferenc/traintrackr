import { Endpoints } from "@/core/endpoints.ts";
import type { Macros, Nutrition, User } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

async function fetchNutrition(userId: User["_id"], date?: string) {
	const res = await fetch(`${Endpoints.nutritionsByDate(userId, date)}`);
	return await res.json();
}

export default function useNutrition(date?: Date) {
	const userId = useUserStore(useShallow((state) => state.user?._id));

	return useQuery<{
		nutritions: Nutrition[];
		totalMacros: Macros;
		nutritionsThisWeek: Nutrition[];
	}>({
		queryKey: ["nutrition-get", { date }],
		queryFn: () => fetchNutrition(userId as string, date?.toDateString()),
		enabled: !!userId,
		placeholderData: (previousData) => previousData,
	});
}
