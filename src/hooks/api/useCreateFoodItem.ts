import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Endpoints} from "@/core/endpoints.ts";
import type {FoodItem} from "@/core/types.ts";

async function fetchCreateFoodItem(foodItem: Omit<FoodItem, '_id'>) {
    await fetch(Endpoints.foodItems, {
        body: JSON.stringify(foodItem),
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default function useCreateFoodItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["foodItem-create"],
        mutationFn: (foodItem: Omit<FoodItem, '_id'>) =>
            fetchCreateFoodItem(foodItem),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["foodItems-get"]});
        },
    });
}
