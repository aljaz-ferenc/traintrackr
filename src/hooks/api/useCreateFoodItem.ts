import { Endpoints } from "@/core/endpoints.ts";
import type { FoodItem } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function useCreateFoodItem() {
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["foodItem-create"],
		mutationFn: (foodItem: Omit<FoodItem, "_id">) =>
			toast.promise(
				createRequest({
					url: Endpoints.allFoodItems,
					method: "POST",
					payload: foodItem,
				}),
				{
					pending: t("TOASTS.createFoodItem.pending"),
					success: t("TOASTS.createFoodItem.success"),
					error: t("TOASTS.createFoodItem.error"),
				},
			),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["foodItems-get"],
			});
		},
	});
}
