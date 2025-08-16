import { Endpoints } from "@/core/endpoints.ts";
import type { FoodItem } from "@/core/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

async function fetchUpdateFoodItem(item: FoodItem) {
	const res = await fetch(Endpoints.foodItem(item._id), {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(item),
	});
	return await res.json();
}

export default function useUpdateFoodItem() {
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["foodItem-update"],
		mutationFn: (updatedFoodItem: FoodItem) =>
			toast.promise(fetchUpdateFoodItem(updatedFoodItem), {
				pending: t("TOASTS.updateFoodItem.pending"),
				success: t("TOASTS.updateFoodItem.success"),
				error: t("TOASTS.updateFoodItem.error"),
			}),
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ["foodItems-get"],
			});
			queryClient.invalidateQueries({
				queryKey: ["nutrition-get"],
			});
		},
	});
}
