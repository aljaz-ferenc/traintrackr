import { Endpoints } from "@/core/endpoints.ts";
import type { Nutrition } from "@/core/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchUpdateNutrition(
	nutritionId: Nutrition["_id"],
	amount: Nutrition["amount"],
) {
	const res = await fetch(Endpoints.nutrition(nutritionId), {
		method: "PATCH",
		body: JSON.stringify(amount),
	});
	return await res.json();
}

export default function useUpdateNutrition() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["nutrition-update"],
		mutationFn: ({
			nutritionId,
			amount,
		}: { nutritionId: Nutrition["_id"]; amount: Nutrition["amount"] }) =>
			fetchUpdateNutrition(nutritionId, amount),
		onSuccess: async () =>
			queryClient.invalidateQueries({ queryKey: ["nutrition-get"] }),
	});
}
