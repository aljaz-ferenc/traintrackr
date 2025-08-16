import Spinner from "@/components/Spinner/Spinner.tsx";
import AddItemForm from "@/components/nutrition/AddItemForm.tsx";
import Macros from "@/components/nutrition/Macros.tsx";
import Button from "@/components/shared/Button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.tsx";
import useFoodItems from "@/hooks/api/useFoodItems";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type AddItemModalProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	date: Date;
};

export default function CreateItemModal({
	isOpen,
	setIsOpen,
	date,
}: AddItemModalProps) {
	const [selectedItemId, setSelectedItemId] = useState("");
	const { data: foodItems, isLoading } = useFoodItems();
	const { t } = useTranslation();

	const selectedItem = useMemo(() => {
		return foodItems?.find((item) => item._id === selectedItemId);
	}, [foodItems, selectedItemId]);

	const onOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			setSelectedItemId("");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<VisuallyHidden>
				<DialogTitle>{t("NUTRITION.addItem")}</DialogTitle>
				<DialogDescription>Add nutrition item</DialogDescription>
			</VisuallyHidden>
			<DialogTrigger asChild>
				<Button>{t("NUTRITION.addItem")}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<span>{t("NUTRITION.addItem")}</span>
				</DialogHeader>
				<Select onValueChange={(val) => setSelectedItemId(val)}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder={t("NUTRITION.selectItem")} />
					</SelectTrigger>
					<SelectContent>
						{isLoading ? (
							<Spinner />
						) : (
							foodItems?.map((item) => (
								<SelectItem key={item._id} value={item._id}>
									{item.name}
								</SelectItem>
							))
						)}
					</SelectContent>
				</Select>
				{selectedItem && (
					<Macros
						macros={selectedItem}
						className="flex"
						editButton
						item={selectedItem}
					/>
				)}
				{selectedItemId && foodItems && (
					<Card>
						<CardContent>
							<AddItemForm
								date={date}
								selectedItemId={selectedItemId}
								onMutate={() => {
									setIsOpen(false);
									setTimeout(() => {
										setSelectedItemId("");
									}, 500);
								}}
							/>
						</CardContent>
					</Card>
				)}
			</DialogContent>
		</Dialog>
	);
}
