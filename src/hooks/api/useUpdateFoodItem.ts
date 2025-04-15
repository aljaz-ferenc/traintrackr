import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {FoodItem} from "@/core/types.ts";
import {Endpoints} from "@/core/endpoints.ts";

async function fetchUpdateFoodItem(item: FoodItem){
    const res = await fetch(Endpoints.foodItem(item._id), {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(item)
    })
    return await res.json()
}

export default function useUpdateFoodItem(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['foodItem-update'],
        mutationFn: (updatedFoodItem: FoodItem) => fetchUpdateFoodItem(updatedFoodItem),
        onSuccess: async () => {
            queryClient.invalidateQueries({queryKey: ["foodItems-get"]})
            queryClient.invalidateQueries({queryKey: ["nutrition-get"]})
        }
    })
}