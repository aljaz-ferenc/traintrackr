import { Endpoints } from "@/core/endpoints.ts";
import type { Nutrition } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { NutritionResponse } from "@/hooks/api/useNutrition.ts";
import { startOfDay } from "date-fns";
import { getNutritionMacros } from "@/utils/getNutritionMacros.ts";

export default function useCreateNutrition(date: Date) {
	const queryClient = useQueryClient();
	const { t } = useTranslation();
	console.log(
		queryClient
			.getQueryCache()
			.getAll()
			.map((q) => q.queryKey),
	);

	return useMutation({
		mutationKey: ["nutrition-create"],
		mutationFn: (
			nutrition: Omit<Nutrition, "_id" | "createdAt" | "updatedAt">,
		) =>
			toast.promise(
				createRequest({
					url: Endpoints.nutritions,
					method: "POST",
					payload: { nutrition, date },
				}),
				{
					error: t("TOASTS.createNutrition.error"),
				},
			),
		onMutate: async (newNutrition) => {
			await queryClient.cancelQueries({
				queryKey: ["nutrition-get", { date }],
				exact: false,
			});
			const previousNutrition = queryClient.getQueryData([
				"nutrition-get",
				{ date },
			]);

			const newNutritionMacros = getNutritionMacros(newNutrition);

			queryClient.setQueryData(
				["nutrition-get", { date }],
				(old: NutritionResponse) => {
					return {
						totalMacros: {
							...old.totalMacros,
							calories: Math.round(
								old.totalMacros.calories + newNutritionMacros.calories,
							),
							protein: Math.round(
								old.totalMacros.protein + newNutritionMacros.protein,
							),
							fat: Math.round(old.totalMacros.fat + newNutritionMacros.fat),
							carbs: Math.round(
								old.totalMacros.carbs + newNutritionMacros.carbs,
							),
						},
						nutritions: [
							...old.nutritions,
							{ ...newNutrition, _id: crypto.randomUUID() },
						],
					};
				},
			);
			return previousNutrition;
		},
		onSettled: () => {
			queryClient.refetchQueries({
				queryKey: ["nutrition-get", { date }],
				exact: false,
			});
		},
		onSuccess: async () => {
			queryClient.refetchQueries({
				queryKey: ["stats", { range: "week" }],
				exact: false,
			});
		},
		onError: (err, _newNutrition, context) => {
			queryClient.setQueryData(
				["nutrition-get", { date: startOfDay(date) }],
				context,
			);
			console.error(err);
		},
	});
}
