import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FoodItem } from "@/core/types.ts";
import { Endpoints } from "@/core/endpoints.ts";

async function fetchDeleteItem(itemId: FoodItem["_id"]) {
	const res = await fetch(Endpoints.foodItem(itemId), {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

export default function useDeleteFoodItem() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["foodItem-delete"],
		mutationFn: (itemId: FoodItem["_id"]) => fetchDeleteItem(itemId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["foodItems-get"] });
		},
	});
}
