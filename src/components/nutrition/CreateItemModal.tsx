import Button from "@/components/shared/Button.tsx";
import AppTooltip from "@/components/shared/Tooltip.tsx";
import { Input } from "@/components/ui/Input";
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
import type { FoodItem } from "@/core/types.ts";
import useCreateFoodItem from "@/hooks/api/useCreateFoodItem";
import useDeleteFoodItem from "@/hooks/api/useDeleteFoodItem.ts";
import useUpdateFoodItem from "@/hooks/api/useUpdateFoodItem.ts";
import useUserStore from "@/state/UserStore.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { FilePen } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

const formSchema = z.object({
	name: z.string().min(1),
	calories: z
		.string()
		.regex(/^\d*\.?\d?$/, {
			message: "number.valid",
		})
		.refine((val) => !!val.length, {
			message: "Required",
		}),
	protein: z
		.string()
		.regex(/^\d*\.?\d?$/, {
			message: "number.valid",
		})
		.refine((val) => !!val.length, {
			message: "Required",
		}),
	carbs: z
		.string()
		.regex(/^\d*\.?\d?$/, {
			message: "number.valid",
		})
		.refine((val) => !!val.length, {
			message: "Required",
		}),
	fat: z
		.string()
		.regex(/^\d*\.?\d?$/, {
			message: "number.valid",
		})
		.refine((val) => !!val.length, {
			message: "Required",
		}),
	portions: z
		.array(
			z.object({
				name: z.string().min(1),
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
	const { t } = useTranslation();
	const { mutateAsync: createFoodItem, isPending: isCreating } =
		useCreateFoodItem();
	const { mutateAsync: updateFoodItem, isPending: isUpdating } =
		useUpdateFoodItem();
	const [userId] = useUserStore(useShallow((state) => [state.user?._id]));
	const { mutateAsync: deleteItem, isPending: isDeleting } =
		useDeleteFoodItem();

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
			form.setValue("calories", String(defaultItem.calories));
			form.setValue("protein", String(defaultItem.protein));
			form.setValue("fat", String(defaultItem.fat));
			form.setValue("carbs", String(defaultItem.carbs));

			if (defaultItem.portions?.length) {
				for (const portion of defaultItem.portions) {
					append({
						name: portion.name,
						grams: portion.grams,
					});
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
					calories: +values.calories,
					protein: +values.protein,
					fat: +values.fat,
					carbs: +values.carbs,
				});
			} else {
				await createFoodItem({
					...values,
					calories: +values.calories,
					protein: +values.protein,
					fat: +values.fat,
					carbs: +values.carbs,
					createdBy: userId as string,
				});
			}
			setIsOpen(false);
			form.reset();
		} catch (err) {
			console.log("Error creating item: ", err);
		}
	};

	const handleDeleteItem = async (itemId: FoodItem["_id"]) => {
		await deleteItem(itemId);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<VisuallyHidden>
				<DialogTitle>
					{editMode ? t("NUTRITION.updateItem") : t("NUTRITION.createItem")}
				</DialogTitle>
				<DialogDescription>
					{editMode ? t("NUTRITION.updateItem") : t("NUTRITION.createItem")}
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
						{t("NUTRITION.createItem")}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="overflow-y-auto max-h-[80vh]">
				<DialogHeader className="font-bold text-lg">
					{editMode ? t("NUTRITION.updateItem") : t("NUTRITION.createItem")}
				</DialogHeader>
				<DialogDescription>{t("NUTRITION.createDesc")}</DialogDescription>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("NUTRITION.name")}</FormLabel>
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
									<FormLabel className="capitalize">
										{t("GENERAL.calories")}
									</FormLabel>
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
									<FormLabel className="capitalize">
										{t("GENERAL.protein")}
									</FormLabel>
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
									<FormLabel className="capitalize">
										{t("GENERAL.fat")}
									</FormLabel>
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
									<FormLabel className="capitalize">
										{t("GENERAL.carbs")}
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<hr />
						<CardTitle className="flex gap-2 items-center">
							{t("NUTRITION.portions")}
							<AppTooltip content={t("NUTRITION.portionsTooltip")} />
						</CardTitle>
						{fields.map((field, index) => (
							<Card key={field.id}>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name={`portions.${index}.name`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>{t("NUTRITION.name")}</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder={t("NUTRITION.example")}
													/>
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
												<FormLabel className="capitalize">
													{t("GENERAL.grams")}
												</FormLabel>
												<FormControl>
													<Input {...field} placeholder="100" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button
										variant="primary"
										type="button"
										className="cursor-pointer"
										onClick={() => remove(index)}
									>
										{t("NUTRITION.remove")}
									</Button>
								</CardContent>
							</Card>
						))}
						<Button
							type="button"
							variant="secondary"
							className="cursor-pointer"
							onClick={() =>
								append({
									name: "",
									grams: 0,
								})
							}
						>
							{t("NUTRITION.addPortion")}
						</Button>
						<hr />
						<div className="flex justify-between">
							<Button
								isLoading={isCreating || isUpdating}
								className="cursor-pointer"
								type="submit"
							>
								{editMode ? t("NUTRITION.updateItem") : t("NUTRITION.submit")}
							</Button>
							{editMode && defaultItem && (
								<Button
									isLoading={isDeleting}
									type="button"
									variant="destructive"
									onClick={() => handleDeleteItem(defaultItem?._id)}
								>
									{t("NUTRITION.deleteItem")}
								</Button>
							)}
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
