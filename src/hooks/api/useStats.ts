import { Endpoints } from "@/core/endpoints.ts";
import type { User } from "@/core/types.ts";
import type { Range } from "@/routes/Stats.tsx";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

async function fetchStats(userId: User["_id"], range?: Range) {
	const res = await fetch(Endpoints.stats(userId, range));
	return await res.json();
}

export default function useStats(range?: Range) {
	const { userId } = useAuth();

	return useQuery({
		queryKey: ["stats", { range }],
		queryFn: () => fetchStats(userId as string, range),
	});
}
