import MacroCard from "@/components/nutrition/MacroCard.tsx";
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
				<div className="grid grid-cols-1 md:grid md:grid-cols-[1fr_1fr] md:grid-rows-[1fr_1fr] gap-3">
					{Object.entries(macros).map((macro) => (
						<MacroCard
							key={macro[0]}
							macro={
								macro as [
									string: "calories" | "protein" | "fat" | "carbs",
									number,
								]
							}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
