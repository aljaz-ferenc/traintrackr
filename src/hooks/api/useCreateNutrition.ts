import { Endpoints } from "@/core/endpoints.ts";
import type { Nutrition } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function useCreateNutrition(date?: Date) {
	const queryClient = useQueryClient();
	const { t } = useTranslation();

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
		onSuccess: async () =>
			await queryClient.invalidateQueries({
				queryKey: ["nutrition-get"],
			}),
	});
}
