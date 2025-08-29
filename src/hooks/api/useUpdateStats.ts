import { Endpoints } from "@/core/endpoints.ts";
import useUserStore from "@/state/UserStore.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

export default function useUpdateStats() {
	const userId = useUserStore(useShallow((state) => state.user?._id));
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["stats-update", { userId }],
		mutationFn: (stats: {
			weight: number;
		}) =>
			createRequest({
				url: Endpoints.stats(userId as string),
				method: "POST",
				payload: stats,
			}),
		onSuccess: async () =>
			queryClient.invalidateQueries({
				queryKey: ["stats"],
			}),
	});
}
