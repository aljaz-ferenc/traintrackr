import { Endpoints } from "@/core/endpoints.ts";
import type { Mesocycle } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useQuery } from "@tanstack/react-query";

export default function useGetMesocycleById(mesoId: Mesocycle["_id"]) {
	return useQuery<Mesocycle>({
		queryKey: ["mesocycle", { mesoId }],
		queryFn: () =>
			createRequest<Mesocycle>({ url: Endpoints.mesocycle(mesoId) }),
		enabled: !!mesoId,
        staleTime: 60 * 1000 * 5,
        gcTime: 60 * 1000 * 5,
        placeholderData: (prev) => prev,
	});
}
