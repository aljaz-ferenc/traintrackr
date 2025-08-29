import { Endpoints } from "@/core/endpoints.ts";
import type { ActivityLevels } from "@/core/enums/ActivityLevel.enum.ts";
import type { Gender, Measurement } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

type UpdateUserPayload = {
	gender: Gender;
	dob: Date;
	height: number;
	weight: Measurement;
	tdee: number;
	activityLevel: ActivityLevels;
};

export default function useUpdateUserStats() {
	const userId = useUserStore(useShallow((state) => state.user?._id));
	const queryClient = useQueryClient();
	const { userId: clerkId } = useAuth();

	return useMutation({
		mutationKey: ["userStats-update", { userId }],
		mutationFn: (payload: Partial<UpdateUserPayload>) =>
			createRequest({
				url: `${Endpoints.user(userId as string)}/stats`,
				method: "PATCH",
				payload,
			}),
		onSuccess: async () =>
			queryClient.invalidateQueries({
				queryKey: [
					"user",
					{
						clerkId,
					},
				],
			}),
	});
}
