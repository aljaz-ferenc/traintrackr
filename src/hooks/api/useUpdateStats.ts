import { Endpoints } from "@/core/endpoints.ts";
import type { User, UserWeight } from "@/core/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/state/UserStore.ts";
import {useShallow} from "zustand/react/shallow";

async function fetchUpdateStats(
	userId: User["_id"],
	stats: { weight: UserWeight[] },
) {
	const res = await fetch(Endpoints.stats(userId), {
		method: "POST",
		body: JSON.stringify(stats),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

export default function useUpdateStats() {
	const userId = useUserStore(useShallow(state => state.user?._id))
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["stats-update", { userId }],
		mutationFn: (stats: { weight: UserWeight[] }) =>
			fetchUpdateStats(userId as string, stats),
		onSuccess: async () =>
			queryClient.invalidateQueries({ queryKey: ["stats"] }),
	});
}
