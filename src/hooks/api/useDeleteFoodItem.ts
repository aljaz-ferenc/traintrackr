import { Endpoints } from "@/core/endpoints.ts";
import type { FoodItem } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteFoodItem() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["foodItem-delete"],
		mutationFn: (itemId: FoodItem["_id"]) =>
			createRequest({ url: Endpoints.foodItem(itemId), method: "DELETE" }),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["foodItems-get"],
			});
		},
	});
}
