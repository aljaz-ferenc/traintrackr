import Spinner from "@/components/Spinner/Spinner.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { Button } from "@/components/ui/button.tsx";
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
import type { FoodItem, Nutrition } from "@/core/types.ts";
import useCreateNutrition from "@/hooks/api/useCreateNutrition.ts";
import useFoodItems from "@/hooks/api/useFoodItems.ts";
import useUpdateNutrition from "@/hooks/api/useUpdateNutrition.tsx";
import useUserStore from "@/state/UserStore.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

type AddItemFormProps = {
	selectedItemId: string;
	edit?: boolean;
	nutritionId?: Nutrition["_id"];
	onMutate?: () => void;
};

const formSchema = z.object({
	amount: z.coerce.number().nonnegative(),
	portion: z.string(),
});

export default function AddItemForm({
	selectedItemId,
	edit = false,
	nutritionId,
	onMutate,
}: AddItemFormProps) {
	const [userId] = useUserStore(useShallow((state) => [state.user?._id]));
	const { mutateAsync: createNutrition } = useCreateNutrition();
	const { data: foodItems, isLoading } = useFoodItems();
	const { mutateAsync: updateNutrition } = useUpdateNutrition();

	if (isLoading) {
		return <Spinner />;
	}

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			portion: "1",
		},
	});

	const getSelectedFoodItem = useCallback(() => {
		if (!foodItems) return undefined;

		return foodItems.find((item) => item._id === selectedItemId);
	}, [foodItems, selectedItemId]);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (!userId) {
			console.log("userId not found");
			return;
		}

		if (edit && nutritionId) {
			await updateNutrition({
				nutritionId,
				amount: values.amount * Number(values.portion.split("/")[0]),
			});
		} else {
			await createNutrition({
				amount: values.amount * Number(values.portion.split("/")[0]),
				createdBy: userId,
				date: new Date(),
				item: getSelectedFoodItem() as FoodItem,
			});
		}
		form.reset();
		if (onMutate) {
			onMutate();
		}
	};

	return (
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
											getSelectedFoodItem()?.portions?.map((portion) => (
												<SelectItem
													key={portion._id}
													value={`${portion.grams}/${portion._id}`}
												>
													{portion.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">{edit ? "Update" : "Submit"}</Button>
			</form>
		</Form>
	);
}
