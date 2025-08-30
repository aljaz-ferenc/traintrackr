import { Endpoints } from "@/core/endpoints.ts";
import type { Nutrition } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { NutritionResponse } from "@/hooks/api/useNutrition.ts";
import { getNutritionMacros } from "@/utils/getNutritionMacros.ts";

export default function useDeleteNutrition() {
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["nutrition-delete"],
		mutationFn: ({
			nutritionId,
		}: { nutritionId: Nutrition["_id"]; date: Date }) =>
			toast.promise(
				createRequest({
					url: `${Endpoints.nutritions}/${nutritionId}`,
					method: "DELETE",
				}),
				{
					error: t("TOASTS.deleteNutrition.error"),
				},
			),
		onMutate: async ({ nutritionId, date }) => {
			await queryClient.cancelQueries({
				queryKey: ["nutrition-get", { date }],
			});
			const previousNutritions = queryClient.getQueryData([
				"nutrition-get",
				{ date },
			]);
			queryClient.setQueryData(
				["nutrition-get", { date }],
				(old: NutritionResponse) => {
					const deletedNutrition = old.nutritions.find(
						(n) => n._id === nutritionId,
					);

					if (!deletedNutrition) throw new Error("Nutrition not found.");

					const deletedMacros = getNutritionMacros(deletedNutrition);

					return {
						...old,
						nutritions: old.nutritions.filter((n) => n._id !== nutritionId),
						totalMacros: {
							calories: old.totalMacros.calories - deletedMacros.calories,
							protein: old.totalMacros.protein - deletedMacros.protein,
							fat: old.totalMacros.fat - deletedMacros.fat,
							carbs: old.totalMacros.carbs - deletedMacros.carbs,
						},
					};
				},
			);
			return previousNutritions;
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["nutrition-get"],
			});
			await queryClient.refetchQueries({
				queryKey: ["stats", { range: "week" }],
			});
		},
	});
}
