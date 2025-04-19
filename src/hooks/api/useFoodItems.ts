import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "@/core/endpoints.ts";
import type { FoodItem, User } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";

async function fetchFoodItems(userId: User["_id"]) {
	try {
		const data = await fetch(Endpoints.foodItems(userId));
		return await data.json();
	} catch {
		throw new Error("Error fetching foodItems");
	}
}

export default function useFoodItems() {
	const userId = useUserStore(useShallow((state) => state.user?._id));
	return useQuery<FoodItem[]>({
		queryKey: ["foodItems-get"],
		queryFn: () => fetchFoodItems(userId as string),
		enabled: !!userId,
	});
}
