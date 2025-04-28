import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";
import { Endpoints } from "@/core/endpoints.ts";
import { useAuth } from "@clerk/clerk-react";
import type { Gender, Measurement } from "@/core/types.ts";
import type { ActivityLevels } from "@/core/enums/ActivityLevel.enum.ts";

type UpdateUserPayload = {
	gender: Gender;
	dob: Date;
	height: number;
	weight: Measurement;
	tdee: number;
	activityLevel: ActivityLevels;
};

async function fetchUpdateUserStats(
	userId: string,
	payload: Partial<UpdateUserPayload>,
) {
	const res = await fetch(`${Endpoints.user(userId)}/stats`, {
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
		},
		method: "PATCH",
	});
	return await res.json();
}

export default function useUpdateUserStats() {
	const userId = useUserStore(useShallow((state) => state.user?._id));
	const queryClient = useQueryClient();
	const { userId: clerkId } = useAuth();

	return useMutation({
		mutationKey: ["userStats-update", { userId }],
		mutationFn: (payload: Partial<UpdateUserPayload>) =>
			fetchUpdateUserStats(userId as string, payload),
		onSuccess: async () =>
			queryClient.invalidateQueries({ queryKey: ["user", { clerkId }] }),
	});
}
