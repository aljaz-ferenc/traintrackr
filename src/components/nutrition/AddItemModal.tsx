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
					<div className="flex justify-between">
						<div className="flex flex-col items-center">
							<span className="text-muted-foreground text-sm">Calories</span>{" "}
							<span className="font-bold">{selectedItem.calories} kcal</span>
						</div>
						<div className="flex flex-col items-center">
							<span className="text-muted-foreground text-sm">Protein</span>{" "}
							<span className="font-bold">{selectedItem.protein} g</span>
						</div>
						<div className="flex flex-col items-center">
							<span className="text-muted-foreground text-sm">Fat</span>{" "}
							<span className="font-bold">{selectedItem.fat} g</span>
						</div>
						<div className="flex flex-col items-center">
							<span className="text-muted-foreground text-sm">Carbs</span>{" "}
							<span className="font-bold">{selectedItem.carbs} g</span>
						</div>
					</div>
				)}
				{selectedItemId && foodItems && (
					<Card>
						<CardContent>
							<AddItemForm
								selectedItemId={selectedItemId}
								onMutate={() => setIsOpen(false)}
							/>
						</CardContent>
					</Card>
				)}
			</DialogContent>
		</Dialog>
	);
}
