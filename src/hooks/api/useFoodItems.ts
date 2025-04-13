import {useQuery} from "@tanstack/react-query";
import {Endpoints} from "@/core/endpoints.ts";
import type {FoodItem} from "@/core/types.ts";

async function fetchFoodItems() {
    try {
        const data = await fetch(Endpoints.foodItems);
        return await data.json();
    } catch {
        throw new Error("Error fetching foodItems");
    }
}

export default function useFoodItems() {
    return useQuery<FoodItem[]>({
        queryKey: ["foodItems-get"],
        queryFn: fetchFoodItems,
        // select: (response) => response.foodItems
    });
}
