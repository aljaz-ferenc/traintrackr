import {useMutation} from "@tanstack/react-query";
import {Endpoints} from "@/core/endpoints.ts";
import type {User} from "@/core/types.ts";

async function fetchActivateMeso({clerkId, activeMesocycle} : {clerkId: string, activeMesocycle: User['activeMesocycle']}){
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
    return useMutation({
        mutationKey: ['meso-activate'],
        mutationFn: ({clerkId, activeMesocycle}: {clerkId: string, activeMesocycle: User['activeMesocycle']}) => fetchActivateMeso({clerkId, activeMesocycle})
    })
}