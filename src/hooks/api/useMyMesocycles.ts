import { Endpoints } from "@/core/endpoints.ts";
import type { Mesocycle, User } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

async function fetchMyMesocycles(userId: User["_id"]) {
	try {
		const data = await fetch(Endpoints.myMesocycles(userId));
		return await data.json();
	} catch {
		throw new Error("Error fetching mesocycles");
	}
}

export default function useMyMesocycles() {
	const userId = useUserStore(useShallow((state) => state.user?._id));

	return useQuery<Mesocycle[]>({
		queryKey: ["my-mesocycles", { userId }],
		queryFn: () => fetchMyMesocycles(userId as string),
		enabled: !!userId,
	});
}
