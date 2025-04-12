import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {Endpoints} from "@/core/endpoints.ts";
import type {Mesocycle} from "@/core/types.ts";

async function fetchUpdateMesocycle(mesocycle: Mesocycle) {
    await fetch(Endpoints.mesocycle(mesocycle._id), {
        body: JSON.stringify(mesocycle),
        mode: "cors",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export default function useUpdateMesocycle() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["meso-update"],
        mutationFn: (mesocycle: Mesocycle) =>
            fetchUpdateMesocycle(mesocycle),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["mesocycles"] });
            navigate("/my-mesocycles");
        },
    });
}
