import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";
import { Endpoints } from "@/core/endpoints.ts";
import { useAuth } from "@clerk/clerk-react";
import type {Gender, Units, UserWeight} from "@/core/types.ts";

type UpdateUserPayload = {
	gender: Gender,
	dob: Date,
	units: Units,
	height: number,
	weight: UserWeight
}

async function fetchUpdateUser(userId: string, payload: Partial<UpdateUserPayload>) {
	const res = await fetch(`${Endpoints.user(userId)}/stats`, {
		body: JSON.stringify(payload),
		headers: {
			'Content-Type':'application/json'
		},
		method: 'PATCH'
	});
	return await res.json();
}

export default function () {
	const userId = useUserStore(useShallow((state) => state.user?._id));
	const queryClient = useQueryClient();
	const { userId: clerkId } = useAuth();

	return useMutation({
		mutationKey: ["user-update", { userId }],
		mutationFn: (payload: Partial<UpdateUserPayload>) => fetchUpdateUser(userId as string, payload),
		onSuccess: async () =>
			queryClient.invalidateQueries({ queryKey: ["user", { clerkId }] }),
	});
}
