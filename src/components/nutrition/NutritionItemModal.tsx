import AddItemForm from "@/components/nutrition/AddItemForm.tsx";
import MacroCard from "@/components/nutrition/MacroCard.tsx";
import type { Nutrition } from "@/core/types.ts";
import { calcMacros } from "@/utils/utils.ts";
import { FilePen } from "lucide-react";
import { useState } from "react";

type NutritionItemModalProps = {
	nutrition: Nutrition;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NutritionItemModal({
	nutrition,
	setIsOpen,
}: NutritionItemModalProps) {
	const { amount, item, _id } = nutrition;
	const macros = calcMacros(item, amount);
	const [isEditable, setIsEditable] = useState(false);

	if (isEditable) {
		return (
			<AddItemForm
				edit
				selectedItemId={item._id}
				nutritionId={_id}
				onMutate={() => setIsOpen(false)}
			/>
		);
	}

	return (
		<div>
			<div className="flex items-center gap-3">
				{item.name}
				<button type="button" onClick={() => setIsEditable(true)}>
					<FilePen size={20} />
				</button>
			</div>
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
