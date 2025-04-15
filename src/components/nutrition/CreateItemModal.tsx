import AppTooltip from "@/components/shared/Tooltip.tsx";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button.tsx";
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
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

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
};

export default function CreateItemModal({
	isOpen,
	setIsOpen,
}: CreateItemModalProps) {
	const { mutateAsync: createFoodItem } = useCreateFoodItem();
	const [userId] = useUserStore(useShallow((state) => [state.user?._id]));

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { fields, append, remove } = useFieldArray({
		name: "portions",
		control: form.control,
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log({ ...values, createdBy: userId as string });
		await createFoodItem({ ...values, createdBy: userId as string });
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<VisuallyHidden>
				<DialogTitle>Create New Item</DialogTitle>
				<DialogDescription>Create new item</DialogDescription>
			</VisuallyHidden>
			<DialogTrigger asChild>
				<Button>Create new item</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>Create New Item</DialogHeader>
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
									<Button type="button" onClick={() => remove(index)}>
										Remove
									</Button>
								</CardContent>
							</Card>
						))}
						<Button
							type="button"
							onClick={() => append({ name: "", grams: 0 })}
						>
							Add portion
						</Button>
						<hr />
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
