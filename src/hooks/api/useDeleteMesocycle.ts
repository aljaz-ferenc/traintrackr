import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Endpoints} from "@/core/endpoints.ts";
import type {Mesocycle} from "@/core/types.ts";

async function fetchDeleteMeso(mesoId: Mesocycle['_id']){
    const res = await fetch(Endpoints.mesocycle(mesoId), {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    })
    return await res.json()
}

export default function useDeleteMesocycle(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['meso-delete'],
        mutationFn: (mesoId: Mesocycle['_id']) => fetchDeleteMeso(mesoId),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['mesocycles']})
    })
}