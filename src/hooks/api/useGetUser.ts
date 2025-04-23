import { Endpoints } from "@/core/endpoints.ts";
import type { User } from "@/core/types.ts";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@/state/UserStore.ts";

//find user in DB by clerkId
async function fetchUser(clerkId: string) {
	const res = await fetch(Endpoints.user(clerkId));
	if (!res.ok) throw new Error("Failed to fetch user");
	const user = await res.json();
	useUserStore.getState().setUser(user);
	return user;
}

export default function useGetUser() {
	const { userId: clerkId } = useAuth();

	return useQuery<User>({
		queryKey: ["user", { clerkId }],
		queryFn: () => fetchUser(clerkId as string),
		enabled: !!clerkId,
	});
}
