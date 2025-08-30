import { Endpoints } from "@/core/endpoints.ts";
import type { Nutrition } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { NutritionResponse } from "@/hooks/api/useNutrition.ts";
import { startOfDay } from "date-fns";

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
			queryClient.setQueryData(
				["nutrition-get", { date }],
				(old: NutritionResponse) => {
					return {
						totalMacros: {
							...old.totalMacros,
							calories: Math.round(
								old.totalMacros.calories +
									(newNutrition.amount * newNutrition.item.calories) / 100,
							),
							protein: Math.round(
								old.totalMacros.protein +
									(newNutrition.amount * newNutrition.item.protein) / 100,
							),
							fat: Math.round(
								old.totalMacros.fat +
									(newNutrition.amount * newNutrition.item.fat) / 100,
							),
							carbs: Math.round(
								old.totalMacros.carbs +
									(newNutrition.amount * newNutrition.item.carbs) / 100,
							),
						},
						nutritions: [...old.nutritions, newNutrition],
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
