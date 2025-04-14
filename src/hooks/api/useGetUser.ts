import { Endpoints } from "@/core/endpoints.ts";
import type { User } from "@/core/types.ts";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

async function fetchUser(clerkId: string) {
	const res = await fetch(Endpoints.user(clerkId));
	return await res.json();
}

export default function useGetUser() {
	const { userId } = useAuth();

	return useQuery<{ user: User }>({
		queryKey: ["user", { clerkId: userId }],
		queryFn: () => fetchUser(userId as string),
		enabled: !!userId,
	});
}
