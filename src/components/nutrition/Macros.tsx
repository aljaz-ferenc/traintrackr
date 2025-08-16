import CreateItemModal from "@/components/nutrition/CreateItemModal.tsx";
import type { FoodItem, Macros as TMacros } from "@/core/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type MacrosProps = {
	macros: TMacros;
	className?: string;
	editButton?: boolean;
	item?: FoodItem;
};

function Macros({
	macros,
	className = "",
	editButton = false,
	item,
}: MacrosProps) {
	const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
	const { t } = useTranslation();

	return (
		<div
			className={cn(["flex justify-evenly items-baseline relative", className])}
		>
			<div className="flex flex-col items-center font-bold">
				<span className="text-muted-foreground text-sm capitalize">
					{t("GENERAL.calories")}
				</span>{" "}
				<span>{macros.calories} kcal</span>
			</div>
			<div className="flex flex-col items-center font-bold">
				<span className="text-muted-foreground text-sm capitalize">
					{t("GENERAL.protein")}
				</span>{" "}
				<span>{macros.protein} g</span>
			</div>
			<div className="flex flex-col items-center font-bold">
				<span className="text-muted-foreground text-sm capitalize">
					{t("GENERAL.fat")}
				</span>{" "}
				<span>{macros.fat} g</span>
			</div>
			<div className="flex flex-col items-center font-bold">
				<span className="text-muted-foreground text-sm capitalize">
					{t("GENERAL.carbs")}
				</span>{" "}
				<span>{macros.carbs} g</span>
			</div>
			{editButton && (
				<CreateItemModal
					isOpen={updateModalIsOpen}
					defaultItem={item}
					setIsOpen={setUpdateModalIsOpen}
					editMode
				/>
			)}
		</div>
	);
}

export default Macros;
