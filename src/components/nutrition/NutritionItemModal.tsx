import type { Nutrition } from "@/core/types.ts";
import { calcMacros } from "@/utils/utils.ts";

type NutritionItemModalProps = {
	nutrition: Nutrition;
};

export default function NutritionItemModal({
	nutrition,
}: NutritionItemModalProps) {
	const { amount, item } = nutrition;
	const macros = calcMacros(item, amount);

	return (
		<div>
			<div>{item.name}</div>
			<div className="flex flex-col gap-3">
				<span>{amount}g</span>
				<span>Calories: {macros.calories}kcal</span>
				<span>Protein: {macros.protein}g</span>
				<span>Fat: {macros.fat}g</span>
				<span>Carbs: {macros.carbs}g</span>
			</div>
		</div>
	);
}
