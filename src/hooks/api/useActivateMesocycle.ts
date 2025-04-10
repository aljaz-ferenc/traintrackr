import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Endpoints} from "@/core/endpoints.ts";
import type {Mesocycle} from "@/core/types.ts";
import {useAuth} from "@clerk/clerk-react";

export type ActivateMesoPayload = {
    mesocycle: Mesocycle['_id'],
    startDate: Date,
    endDate: Date
}

async function fetchActivateMeso({clerkId, activeMesocycle} : {clerkId: string, activeMesocycle: ActivateMesoPayload}){
    const res = await fetch(Endpoints.activateMeso, {
        body: JSON.stringify({clerkId, activeMesocycle}),
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        }
    })
    return await res.json()
}

export default function useActivateMesocycle(){
    const queryClient = useQueryClient()
    const { userId } = useAuth();

    return useMutation({
        mutationKey: ['meso-activate'],
        mutationFn: ({clerkId, activeMesocycle}: {clerkId: string, activeMesocycle: ActivateMesoPayload}) => fetchActivateMeso({clerkId, activeMesocycle}),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user", {clerkId: userId}]})
        },
    })
}