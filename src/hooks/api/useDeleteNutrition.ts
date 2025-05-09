import { Endpoints } from "@/core/endpoints.ts";
import type { Nutrition } from "@/core/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

async function fetchDeleteNutrition(nutritionId: Nutrition["_id"]) {
	const res = await fetch(`${Endpoints.nutritions}/${nutritionId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

export default function useDeleteNutrition() {
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["nutrition-delete"],
		mutationFn: (nutritionId: Nutrition["_id"]) =>
			toast.promise(fetchDeleteNutrition(nutritionId), {
				error: t("TOASTS.deleteNutrition.error"),
			}),
		onSuccess: async () =>
			await queryClient.invalidateQueries({
				queryKey: ["nutrition-get"],
			}),
	});
}
