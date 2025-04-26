import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Endpoints } from "@/core/endpoints.ts";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";
import type { User } from "@/core/types.ts";

async function fetchEditStats(userId: User["_id"], stats: object) {
	const res = await fetch(Endpoints.editStats(userId), {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(stats),
	});
	return await res.json();
}

export default function useEditStats() {
	const userId = useUserStore(useShallow((state) => state.user?._id));
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["stats-edit"],
		mutationFn: (stats: object) => fetchEditStats(userId as string, stats),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["stats", { range: "week" }],
			});
		},
	});
}
