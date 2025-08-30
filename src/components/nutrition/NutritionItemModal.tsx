import AddItemForm from "@/components/nutrition/AddItemForm.tsx";
import MacroCard from "@/components/nutrition/MacroCard.tsx";
import Macros from "@/components/nutrition/Macros.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import type { Nutrition } from "@/core/types.ts";
import { calcMacros } from "@/utils/utils.ts";
import { FilePen } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type NutritionItemModalProps = {
	nutrition: Nutrition;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NutritionItemModal({
	nutrition,
	setIsOpen,
}: NutritionItemModalProps) {
	const { amount, item } = nutrition;
	const macros = calcMacros(item, amount);
	const [isEditable, setIsEditable] = useState(false);
	const { t } = useTranslation();

	if (isEditable) {
		return (
			<>
				<h3 className="font-bold">{t("NUTRITION.editItem")}</h3>
				<Card className="p-2 px-0 rounded-md">
					<CardContent>{item.name}</CardContent>
				</Card>
				<Macros macros={calcMacros(item, amount)} />
				<Card>
					<CardContent>
						<AddItemForm
							edit
							selectedItemId={item._id}
							nutrition={nutrition}
							onMutate={() => setIsOpen(false)}
						/>
					</CardContent>
				</Card>
			</>
		);
	}

	return (
		<div>
			<div className="flex items-center justify-between mr-4 mb-2">
				<h3 className="text-xl font-bold">
					{item.name} <span className="text-muted-foreground">{amount}g</span>
				</h3>
				<button
					type="button"
					className="text-muted-foreground hover:text-primary transition cursor-pointer"
					onClick={() => setIsEditable(true)}
				>
					<FilePen size={20} />
				</button>
			</div>
			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-1 sm:grid sm:grid-cols-[1fr_1fr] sm:grid-rows-[1fr_1fr] gap-3">
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
