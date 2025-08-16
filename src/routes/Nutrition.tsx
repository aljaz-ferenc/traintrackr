import AddItemModal from "@/components/nutrition/AddItemModal";
import CreateItemModal from "@/components/nutrition/CreateItemModal";
import Macros from "@/components/nutrition/Macros.tsx";
import NutritionItem from "@/components/nutrition/NutritionItem.tsx";
import SelectDate from "@/components/nutrition/SelectDate.tsx";
import PageLoading from "@/components/shared/PageLoading.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import useNutrition from "@/hooks/api/useNutrition.ts";
import { startOfDay } from "date-fns";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Nutrition() {
	const [createItemIsOpen, setCreateItemIsOpen] = useState(false);
	const [addItemIsOpen, setAddItemIsOpen] = useState(false);
	const [date, setDate] = useState(new Date());
	const { data, isLoading } = useNutrition(startOfDay(date));
	const { t } = useTranslation();

	if (isLoading) {
		return <PageLoading />;
	}

	return (
		<section>
			<RouteTitle title={t("ROUTES.nutrition")} />
			<SelectDate onDateChange={(newDate) => setDate(newDate)} />
			{data && <Macros macros={data.totalMacros} className="my-10" />}
			{data && (
				<>
					<div className="flex gap-2">
						<AddItemModal
							date={date}
							isOpen={addItemIsOpen}
							setIsOpen={setAddItemIsOpen}
						/>
						<CreateItemModal
							isOpen={createItemIsOpen}
							setIsOpen={setCreateItemIsOpen}
						/>
					</div>
					<div className="mt-5 flex flex-col gap-2">
						{data?.nutritions?.map((nutrition) => (
							<NutritionItem key={nutrition._id} nutrition={nutrition} />
						))}
					</div>
				</>
			)}
		</section>
	);
}
