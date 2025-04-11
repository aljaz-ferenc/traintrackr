import { Endpoints } from "@/core/endpoints.ts";
import type { User } from "@/core/types.ts";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";

async function fetchUpdateStats(userId: User["_id"], stats: any) {
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

	return useMutation({
		mutationKey: ["stats-update", { clerkId: userId }],
		mutationFn: (stats: any) => fetchUpdateStats(userId as string, stats),
	});
}
