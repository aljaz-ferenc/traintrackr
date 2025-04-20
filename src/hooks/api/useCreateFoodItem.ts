import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Endpoints } from "@/core/endpoints.ts";
import type { FoodItem } from "@/core/types.ts";
import { toast } from "react-toastify";

async function fetchCreateFoodItem(foodItem: Omit<FoodItem, "_id">) {
	await fetch(Endpoints.allFoodItems, {
		body: JSON.stringify(foodItem),
		mode: "cors",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export default function useCreateFoodItem() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["foodItem-create"],
		mutationFn: (foodItem: Omit<FoodItem, "_id">) =>
			toast.promise(fetchCreateFoodItem(foodItem), {
				pending: "Creating item...",
				success: "Item created",
				error: "Could not create item",
			}),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["foodItems-get"] });
		},
	});
}
