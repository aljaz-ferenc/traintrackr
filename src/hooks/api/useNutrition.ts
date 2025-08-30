import { Endpoints } from "@/core/endpoints.ts";
import type { Macros, Nutrition } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

export type NutritionResponse = {
    nutritions: Nutrition[];
    totalMacros: Macros;
}

export default function useNutrition(date?: Date){
	const userId = useUserStore(useShallow((state) => state.user?._id));

	return useQuery<NutritionResponse>({
		queryKey: ["nutrition-get", { date }],
		queryFn: () =>
			createRequest({
				url: `${Endpoints.nutritionsByDate(userId as string, date || undefined)}`,
			}),
		enabled: !!userId,
        staleTime: 60 * 1000 * 5,
        gcTime: 60 * 1000 * 5,
        placeholderData: (prev) => prev,
	});
}
