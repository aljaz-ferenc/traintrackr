import AddItemModal from "@/components/nutrition/AddItemModal";
import CreateItemModal from "@/components/nutrition/CreateItemModal";
import NutritionItem from "@/components/nutrition/NutritionItem.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import useNutrition from "@/hooks/api/useNutrition.ts";
import { useState } from "react";

export default function Nutrition() {
	const [createItemIsOpen, setCreateItemIsOpen] = useState(false);
	const [addItemIsOpen, setAddItemIsOpen] = useState(false);
	const { data: nutritions } = useNutrition();

	console.log(nutritions);

	return (
		<section className="w-[1200px]">
			<RouteTitle title="Nutrition" />
			<div className="flex justify-evenly">
				<p>TDEE: 2342 kcal</p>
				<p>Total calories: 0kcal</p>
				<p>Total protein: 0g</p>
				<p>Total fat: 0g</p>
				<p>Total carbs: 0g</p>
			</div>
			<CreateItemModal
				isOpen={createItemIsOpen}
				setIsOpen={setCreateItemIsOpen}
			/>
			<AddItemModal isOpen={addItemIsOpen} setIsOpen={setAddItemIsOpen} />
			<div className="mt-5 flex flex-col gap-2">
				{nutritions?.map((nutrition) => (
					<NutritionItem key={nutrition._id} nutrition={nutrition} />
				))}
			</div>
		</section>
	);
}
