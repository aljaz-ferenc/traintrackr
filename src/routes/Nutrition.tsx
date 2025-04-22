import AddItemModal from "@/components/nutrition/AddItemModal";
import CreateItemModal from "@/components/nutrition/CreateItemModal";
import NutritionItem from "@/components/nutrition/NutritionItem.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import useNutrition from "@/hooks/api/useNutrition.ts";
import { useState } from "react";
import Macros from "@/components/nutrition/Macros.tsx";
import PageLoading from "@/components/shared/PageLoading.tsx";

export default function Nutrition() {
	const [createItemIsOpen, setCreateItemIsOpen] = useState(false);
	const [addItemIsOpen, setAddItemIsOpen] = useState(false);
	const { data, isLoading } = useNutrition();

	if (isLoading) {
		return <PageLoading />;
	}

	return (
		<section>
			<RouteTitle title="Nutrition" />
			{data && <Macros macros={data.totalMacros} className="mb-5" />}
			<div className="flex gap-2">
				<AddItemModal isOpen={addItemIsOpen} setIsOpen={setAddItemIsOpen} />
				<CreateItemModal
					isOpen={createItemIsOpen}
					setIsOpen={setCreateItemIsOpen}
				/>
			</div>
			<div className="mt-5 flex flex-col gap-2">
				{data?.nutritionsToday?.map((nutrition) => (
					<NutritionItem key={nutrition._id} nutrition={nutrition} />
				))}
			</div>
		</section>
	);
}
