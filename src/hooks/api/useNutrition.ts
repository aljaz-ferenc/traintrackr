import { Endpoints } from "@/core/endpoints.ts";
import type { Macros, Nutrition, User } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

async function fetchNutrition(userId: User["_id"]) {
	const res = await fetch(`${Endpoints.user(userId)}/nutritions`);
	return await res.json();
}

export default function useNutrition() {
	const userId = useUserStore(useShallow((state) => state.user?._id));

	return useQuery<{ nutritionsToday: Nutrition[]; totalMacros: Macros, nutritionsThisWeek: Nutrition[] }>({
		queryKey: ["nutrition-get"],
		queryFn: () => fetchNutrition(userId as string),
		enabled: !!userId,
	});
}
