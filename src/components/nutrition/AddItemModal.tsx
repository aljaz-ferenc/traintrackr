import { Input } from "@/components/ui/Input.tsx";
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
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select.tsx";
import type { FoodItem } from "@/core/types.ts";
import useCreateNutrition from "@/hooks/api/useCreateNutrition.ts";
import useFoodItems from "@/hooks/api/useFoodItems";
import useUserStore from "@/state/UserStore.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type React from "react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

type AddItemModalProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
	amount: z.coerce.number().nonnegative(),
	portion: z.string(),
});

export default function CreateItemModal({
	isOpen,
	setIsOpen,
}: AddItemModalProps) {
	const [userId] = useUserStore(useShallow((state) => [state.user?._id]));
	const { data: foodItems, isLoading } = useFoodItems();
	const [selectedItemId, setSelectedItemId] = useState("");
	const { mutateAsync: createNutrition } = useCreateNutrition();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			portion: "1",
		},
	});
	console.log(userId);
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (!userId) {
			console.log("userId not found");
			return;
		}
		await createNutrition({
			amount: values.amount * Number(values.portion.split("/")[0]),
			createdBy: userId,
			date: new Date(),
			item: getSelectedFoodItem() as FoodItem,
		});
		setIsOpen(false);
		form.reset();
	};

	const getSelectedFoodItem = useCallback(() => {
		if (!foodItems) return undefined;

		return foodItems.find((item) => item._id === selectedItemId);
	}, [foodItems, selectedItemId]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<VisuallyHidden>
				<DialogTitle>Add Item</DialogTitle>
				<DialogDescription>Add nutrition item</DialogDescription>
			</VisuallyHidden>
			<DialogTrigger asChild>
				<Button>Add item</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>Add item</DialogHeader>
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
				{selectedItemId && (
					<Card>
						<CardContent>
							<Form {...form} control={form.control}>
								<form onSubmit={form.handleSubmit(onSubmit)}>
									<div className="flex gap-2 mb-4">
										<FormField
											control={form.control}
											name="amount"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Amount</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="portion"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Portion</FormLabel>
													<Select
														onValueChange={field.onChange}
														value={field.value.toString()}
														defaultValue={field.value.toString()}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select a portion" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value={"1"}>grams</SelectItem>
															{foodItems &&
																getSelectedFoodItem()?.portions?.map(
																	(portion) => (
																		<SelectItem
																			key={portion._id}
																			value={`${portion.grams}/${portion._id}`}
																		>
																			{portion.name}
																		</SelectItem>
																	),
																)}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<Button type="submit">Submit</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				)}
			</DialogContent>
		</Dialog>
	);
}
