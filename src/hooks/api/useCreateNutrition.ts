import { Endpoints } from "@/core/endpoints.ts";
import type { Nutrition } from "@/core/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

async function fetchCreateNutrition(
	nutrition: Omit<Nutrition, "_id" | "createdAt" | "updatedAt">,
	date: Date,
) {
	await fetch(Endpoints.nutritions, {
		body: JSON.stringify({
			nutrition,
			date,
		}),
		mode: "cors",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export default function useCreateNutrition(date?: Date) {
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["nutrition-create"],
		mutationFn: (
			nutrition: Omit<Nutrition, "_id" | "createdAt" | "updatedAt">,
		) =>
			toast.promise(fetchCreateNutrition(nutrition, date || new Date()), {
				error: t("TOASTS.createNutrition.error"),
			}),
		onSuccess: async () =>
			await queryClient.invalidateQueries({
				queryKey: ["nutrition-get"],
			}),
	});
}
