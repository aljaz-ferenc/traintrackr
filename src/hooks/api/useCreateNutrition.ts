import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Endpoints} from "@/core/endpoints.ts";
import type {Nutrition} from "@/core/types.ts";

async function fetchCreateNutrition(nutrition: Omit<Nutrition, '_id'>) {
    await fetch(Endpoints.nutritions, {
        body: JSON.stringify(nutrition),
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default function useCreateNutrition() {
    // const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["nutrition-create"],
        mutationFn: (nutrition: Omit<Nutrition, '_id'>) =>
            fetchCreateNutrition(nutrition),
        // onSuccess: async () => {
            // await queryClient.invalidateQueries({queryKey: ["foodItems-get"]});
        // },
    });
}
