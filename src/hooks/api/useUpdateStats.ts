import { Endpoints } from "@/core/endpoints.ts";
import type { User, UserWeight } from "@/core/types.ts";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
	const { userId } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["stats-update", { clerkId: userId }],
		mutationFn: (stats: { weight: UserWeight[] }) =>
			fetchUpdateStats(userId as string, stats),
		onSuccess: async () =>
			queryClient.invalidateQueries({ queryKey: ["stats"] }),
	});
}
