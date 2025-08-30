import { Endpoints } from "@/core/endpoints.ts";
import type { Nutrition } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function useDeleteNutrition() {
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["nutrition-delete"],
		mutationFn: (nutritionId: Nutrition["_id"]) =>
			toast.promise(
				createRequest({
					url: `${Endpoints.nutritions}/${nutritionId}`,
					method: "DELETE",
				}),
				{
					error: t("TOASTS.deleteNutrition.error"),
				},
			),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["nutrition-get"],
			});
			await queryClient.refetchQueries({
				queryKey: ["stats", {range: 'week'}],
				// exact: false,
			});
            console.log('done deleting')
		},
	});
}
