import { Endpoints } from "@/core/endpoints.ts";
import type { FoodItem } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function useUpdateFoodItem() {
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["foodItem-update"],
		mutationFn: (updatedFoodItem: FoodItem) =>
			toast.promise(
				createRequest({
					url: Endpoints.foodItem(updatedFoodItem._id),
					method: "PUT",
					payload: updatedFoodItem,
				}),
				{
					pending: t("TOASTS.updateFoodItem.pending"),
					success: t("TOASTS.updateFoodItem.success"),
					error: t("TOASTS.updateFoodItem.error"),
				},
			),
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
