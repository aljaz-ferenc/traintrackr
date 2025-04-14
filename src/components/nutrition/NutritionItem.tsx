import { Card, CardContent } from "@/components/ui/card.tsx";
import type { Nutrition } from "@/core/types.ts";
import useDeleteNutrition from "@/hooks/api/useDeleteNutrition.ts";
import { X } from "lucide-react";

type NutritionItemProps = {
	nutrition: Nutrition;
};

export default function NutritionItem({ nutrition }: NutritionItemProps) {
	const { mutateAsync: deleteNutrition } = useDeleteNutrition();

	const handleDeleteNutrition = async () => {
		await deleteNutrition(nutrition._id);
	};

	return (
		<Card className="p-1">
			<CardContent className="p-1 flex justify-between">
				<p>{nutrition.item.name}</p>
				<p className="ml-auto mr-3">
					{(nutrition.amount * nutrition.item.calories) / 100} kcal
				</p>
				<button type="button" onClick={handleDeleteNutrition}>
					<X className="text-red-500" />
				</button>
			</CardContent>
		</Card>
	);
}
