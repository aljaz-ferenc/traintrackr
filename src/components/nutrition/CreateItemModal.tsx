import AppTooltip from "@/components/shared/Tooltip.tsx";
import { Input } from "@/components/ui/Input";
import Button from "@/components/shared/Button.tsx";
import { Card, CardContent, CardTitle } from "@/components/ui/card.tsx";
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
} from "@/components/ui/form";
import useCreateFoodItem from "@/hooks/api/useCreateFoodItem";
import useUserStore from "@/state/UserStore.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type React from "react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";
import { FilePen } from "lucide-react";
import type { FoodItem } from "@/core/types.ts";
import useUpdateFoodItem from "@/hooks/api/useUpdateFoodItem.ts";

const formSchema = z.object({
	name: z.string(),
	calories: z.coerce.number().nonnegative({
		message: "Calories must be a valid positive number",
	}),
	protein: z.coerce.number().nonnegative({
		message: "Protein must be a valid positive number",
	}),
	carbs: z.coerce.number().nonnegative({
		message: "Carbs must be a valid positive number",
	}),
	fat: z.coerce.number().nonnegative({
		message: "Fat must be a valid positive number",
	}),
	portions: z
		.array(
			z.object({
				name: z.string(),
				grams: z.coerce.number().nonnegative(),
			}),
		)
		.optional(),
});

type CreateItemModalProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	editMode?: boolean;
	defaultItem?: FoodItem;
};

export default function CreateItemModal({
	isOpen,
	setIsOpen,
	editMode,
	defaultItem,
}: CreateItemModalProps) {
	const { mutateAsync: createFoodItem, isPending: isCreating } =
		useCreateFoodItem();
	const { mutateAsync: updateFoodItem, isPending: isUpdating } =
		useUpdateFoodItem();
	const [userId] = useUserStore(useShallow((state) => [state.user?._id]));

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { fields, append, remove } = useFieldArray({
		name: "portions",
		control: form.control,
	});

	useEffect(() => {
		if (defaultItem && isOpen) {
			form.setValue("name", defaultItem.name);
			form.setValue("calories", defaultItem.calories);
			form.setValue("protein", defaultItem.protein);
			form.setValue("fat", defaultItem.fat);
			form.setValue("carbs", defaultItem.carbs);

			if (defaultItem.portions?.length) {
				console.log(defaultItem.portions);
				for (const portion of defaultItem.portions) {
					append({ name: portion.name, grams: portion.grams });
				}
			}
		}
	}, [append, defaultItem?.portions, defaultItem, form, isOpen]);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			if (editMode && !!defaultItem) {
				await updateFoodItem({
					...values,
					createdBy: userId as string,
					_id: defaultItem?._id,
				});
			} else {
				await createFoodItem({ ...values, createdBy: userId as string });
			}
			setIsOpen(false);
			form.reset();
		} catch (err) {
			console.log("Error creating item: ", err);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<VisuallyHidden>
				<DialogTitle>
					{editMode ? "Update item" : "Create New Item"}
				</DialogTitle>
				<DialogDescription>
					{editMode ? "Update item" : "Create New Item"}
				</DialogDescription>
			</VisuallyHidden>
			<DialogTrigger asChild>
				{editMode ? (
					<FilePen
						size={20}
						className="cursor-pointer text-muted-foreground hover-text-primary transition"
					/>
				) : (
					<Button variant="ghost" className="underline underline-offset-2">
						Create new item
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="overflow-y-auto max-h-[80vh]">
				<DialogHeader className="font-bold text-lg">
					{editMode ? "Update item" : "Create New Item"}
				</DialogHeader>
				<DialogDescription>
					Add nutrition values per 100 grams
				</DialogDescription>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="calories"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Calories</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="protein"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Protein</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="fat"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Fat</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="carbs"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Carbs</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<hr />
						<CardTitle className="flex gap-2 items-center">
							Portions
							<AppTooltip content="Add different portion sizes to make tracking easier. For example, you can add a 'slice' or 'tablespoon' portion for your food item and specify how many grams the portion weighs!" />
						</CardTitle>
						{fields.map((field, index) => (
							<Card key={field.id}>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name={`portions.${index}.name`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input {...field} placeholder="e.g. 1 slice" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`portions.${index}.grams`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Grams</FormLabel>
												<FormControl>
													<Input {...field} placeholder="100" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button
										type="button"
										className="cursor-pointer"
										onClick={() => remove(index)}
									>
										Remove
									</Button>
								</CardContent>
							</Card>
						))}
						<Button
							type="button"
							className="cursor-pointer"
							onClick={() => append({ name: "", grams: 0 })}
						>
							Add portion
						</Button>
						<hr />
						<Button
							isLoading={isCreating || isUpdating}
							className="cursor-pointer"
							type="submit"
						>
							{editMode ? "Update item" : "Submit"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
