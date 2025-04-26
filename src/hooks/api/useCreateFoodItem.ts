import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Endpoints } from "@/core/endpoints.ts";
import type { FoodItem } from "@/core/types.ts";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["foodItem-create"],
		mutationFn: (foodItem: Omit<FoodItem, "_id">) =>
			toast.promise(fetchCreateFoodItem(foodItem), {
				pending: t("TOASTS.createFoodItem.pending"),
				success: t("TOASTS.createFoodItem.success"),
				error: t("TOASTS.createFoodItem.error"),
			}),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["foodItems-get"] });
		},
	});
}
