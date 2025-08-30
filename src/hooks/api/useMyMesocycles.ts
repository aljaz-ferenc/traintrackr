import { Endpoints } from "@/core/endpoints.ts";
import type { Mesocycle } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

export default function useMyMesocycles() {
	const userId = useUserStore(useShallow((state) => state.user?._id));

	return useQuery<Mesocycle[]>({
		queryKey: ["my-mesocycles", { userId }],
		queryFn: () =>
			createRequest({ url: Endpoints.myMesocycles(userId as string) }),
		enabled: !!userId,
		staleTime: 60 * 1000 * 5,
		gcTime: 60 * 1000 * 5,
		placeholderData: (prev) => prev,
	});
}
