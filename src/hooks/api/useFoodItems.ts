import { Endpoints } from "@/core/endpoints.ts";
import type { FoodItem } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

export default function useFoodItems() {
	const userId = useUserStore(useShallow((state) => state.user?._id));
	return useQuery<FoodItem[]>({
		queryKey: ["foodItems-get"],
		queryFn: () =>
			createRequest({ url: Endpoints.foodItems(userId as string) }),
		enabled: !!userId,
	});
}
