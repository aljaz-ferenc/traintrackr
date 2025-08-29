import { Endpoints } from "@/core/endpoints.ts";
import type { Nutrition } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function useUpdateNutrition() {
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["nutrition-update"],
		mutationFn: ({
			nutritionId,
			amount,
		}: {
			nutritionId: Nutrition["_id"];
			amount: Nutrition["amount"];
		}) =>
			toast.promise(
				createRequest({
					url: Endpoints.nutrition(nutritionId),
					method: "PATCH",
					payload: amount,
				}),
				{
					pending: t("TOASTS.updateNutrition.pending"),
					success: t("TOASTS.updateNutrition.success"),
					error: t("TOASTS.updateNutrition.error"),
				},
			),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["foodItems-get"],
			});
			await queryClient.invalidateQueries({
				queryKey: ["nutrition-get"],
			});
		},
	});
}
