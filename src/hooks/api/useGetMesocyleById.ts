import {useQuery} from "@tanstack/react-query";
import {Endpoints} from "@/core/endpoints.ts";
import type {Mesocycle} from "@/core/types.ts";

async function fetchMesocycleById(mesoId: Mesocycle['_id']) {
    const res = await fetch(Endpoints.mesocycle(mesoId))
    return await res.json()
}

export default function useGetMesocycleById(mesoId: Mesocycle['_id']) {
    return useQuery<{ mesocycle: Mesocycle }>({
        queryKey: ['mesocycle', {mesoId}],
        queryFn: () => fetchMesocycleById(mesoId),
        enabled: !!mesoId
    })
}