import { Endpoints } from "@/core/endpoints.ts";
import type { User, WorkoutLog } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

const fetchWorkoutLogs = async (userId: User["_id"]) => {
	const res = await fetch(Endpoints.getLogs(userId));
	return await res.json();
};

export default function useWorkoutLogs() {
	const [userId] = useUserStore(useShallow((state) => [state.user?._id]));

	return useQuery<{ data: WorkoutLog[] }, unknown, WorkoutLog[]>({
		queryKey: ["logs", { userId }],
		queryFn: () => fetchWorkoutLogs(userId as string),
		enabled: !!userId,
		select: (response) => response.data,
	});
}
