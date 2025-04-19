import { Endpoints } from "@/core/endpoints.ts";
import type { User } from "@/core/types.ts";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

//find user in DB with clerkId
async function fetchUser(clerkId: string) {
	const res = await fetch(Endpoints.user(clerkId));
	if (!res.ok) throw new Error("Failed to fetch user");
	return await res.json();
}

export default function useGetUser() {
	const { userId: clerkId } = useAuth();
	console.log(clerkId);

	return useQuery<User>({
		queryKey: ["user", { clerkId }],
		queryFn: () => fetchUser(clerkId as string),
		enabled: !!clerkId,
	});
}
