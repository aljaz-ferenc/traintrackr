import NutritionItemModal from "@/components/nutrition/NutritionItemModal.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import type { Nutrition } from "@/core/types.ts";
import useDeleteNutrition from "@/hooks/api/useDeleteNutrition.ts";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { useState } from "react";

type NutritionItemProps = {
	nutrition: Nutrition;
};

export default function NutritionItem({ nutrition }: NutritionItemProps) {
	const { mutateAsync: deleteNutrition } = useDeleteNutrition();
	const [isOpen, setIsOpen] = useState(false);
	const handleDeleteNutrition = async () => {
		await deleteNutrition(nutrition._id);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
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
			</DialogTrigger>
			<DialogContent>
				<VisuallyHidden>
					<DialogTitle>Nutrition item</DialogTitle>
					<DialogDescription>
						Macronutrients for selected food item
					</DialogDescription>
				</VisuallyHidden>
				<NutritionItemModal nutrition={nutrition} setIsOpen={setIsOpen} />
			</DialogContent>
		</Dialog>
	);
}
