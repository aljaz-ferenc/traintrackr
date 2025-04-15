import AddItemModal from "@/components/nutrition/AddItemModal";
import CreateItemModal from "@/components/nutrition/CreateItemModal";
import NutritionItem from "@/components/nutrition/NutritionItem.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import useNutrition from "@/hooks/api/useNutrition.ts";
import { useState } from "react";

export default function Nutrition() {
	const [createItemIsOpen, setCreateItemIsOpen] = useState(false);
	const [addItemIsOpen, setAddItemIsOpen] = useState(false);
	const { data } = useNutrition();

	return (
		<section className="w-[1200px]">
			<RouteTitle title="Nutrition" />
			<div className="flex justify-evenly">
				<p>TDEE: 2342 kcal</p>
				<p>Total calories: {data?.totalMacros.calories}kcal</p>
				<p>Total protein: {data?.totalMacros.protein}g</p>
				<p>Total fat: {data?.totalMacros.fat}g</p>
				<p>Total carbs: {data?.totalMacros.carbs}g</p>
			</div>
			<CreateItemModal
				isOpen={createItemIsOpen}
				setIsOpen={setCreateItemIsOpen}
			/>
			<AddItemModal isOpen={addItemIsOpen} setIsOpen={setAddItemIsOpen} />
			<div className="mt-5 flex flex-col gap-2">
				{data?.nutritions?.map((nutrition) => (
					<NutritionItem key={nutrition._id} nutrition={nutrition} />
				))}
			</div>
		</section>
	);
}
