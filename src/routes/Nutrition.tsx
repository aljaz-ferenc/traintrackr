import AddItemModal from "@/components/nutrition/AddItemModal";
import CreateItemModal from "@/components/nutrition/CreateItemModal";
import NutritionItem from "@/components/nutrition/NutritionItem.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import useNutrition from "@/hooks/api/useNutrition.ts";
import { useState } from "react";
import Macros from "@/components/nutrition/Macros.tsx";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/shared/Button.tsx";
import { addDays, intlFormat, isToday, startOfDay, subDays } from "date-fns";
import { cn } from "@/lib/utils.ts";
import PageLoading from "@/components/shared/PageLoading.tsx";

export default function Nutrition() {
	const [createItemIsOpen, setCreateItemIsOpen] = useState(false);
	const [addItemIsOpen, setAddItemIsOpen] = useState(false);
	const [date, setDate] = useState(new Date());
	const { data, isLoading } = useNutrition(startOfDay(date));
	const { t } = useTranslation();
	const { i18n } = useTranslation();

	if (isLoading) {
		return <PageLoading />;
	}

	return (
		<section>
			<div className="flex justify-between items-baseline relative">
				<RouteTitle title={t("ROUTES.nutrition")} />
				<div className="flex items-center gap-3 absolute top-1/2 left-1/2 -translate-1/2">
					<Button
						variant="ghost"
						onClick={() => setDate((prev) => subDays(prev, 1))}
					>
						<ChevronLeft />
					</Button>
					<span className="capitalize">
						{isToday(date)
							? t("GENERAL.today")
							: intlFormat(date, { locale: i18n.language })}
					</span>
					<Button
						variant="ghost"
						className={cn([isToday(date) && "invisible"])}
						onClick={() => setDate((prev) => addDays(prev, 1))}
					>
						<ChevronRight />
					</Button>
				</div>
			</div>
			{data && <Macros macros={data.totalMacros} className="my-10" />}
			{data && (
				<>
					<div className="flex gap-2">
						<AddItemModal isOpen={addItemIsOpen} setIsOpen={setAddItemIsOpen} />
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
