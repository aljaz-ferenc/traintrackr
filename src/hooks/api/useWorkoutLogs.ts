import { Endpoints } from "@/core/endpoints.ts";
import type { WorkoutLog } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

export default function useWorkoutLogs() {
	const [userId] = useUserStore(useShallow((state) => [state.user?._id]));

	return useQuery<WorkoutLog[]>({
		queryKey: ["logs", { userId }],
		queryFn: () => createRequest({ url: Endpoints.myLogs(userId as string) }),
		enabled: !!userId,
	});
}
