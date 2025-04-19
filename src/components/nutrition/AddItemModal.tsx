import AddItemForm from "@/components/nutrition/AddItemForm.tsx";
import { Button } from "@/components/ui/button.tsx";
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
import Macros from "@/components/nutrition/Macros.tsx";

type AddItemModalProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateItemModal({
	isOpen,
	setIsOpen,
}: AddItemModalProps) {
	const [selectedItemId, setSelectedItemId] = useState("");
	const { data: foodItems, isLoading } = useFoodItems();

	const selectedItem = useMemo(() => {
		return foodItems?.find((item) => item._id === selectedItemId);
	}, [foodItems, selectedItemId]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const onOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			setSelectedItemId("");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<VisuallyHidden>
				<DialogTitle>Add Item</DialogTitle>
				<DialogDescription>Add nutrition item</DialogDescription>
			</VisuallyHidden>
			<DialogTrigger asChild>
				<Button>Add item</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<span>Add item</span>
				</DialogHeader>
				<Select onValueChange={(val) => setSelectedItemId(val)}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select item..." />
					</SelectTrigger>
					<SelectContent>
						{foodItems?.map((item) => (
							<SelectItem key={item._id} value={item._id}>
								{item.name}
							</SelectItem>
						))}
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
