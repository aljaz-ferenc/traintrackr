import { Endpoints } from "@/core/endpoints.ts";
import type { User } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { useMutation } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

async function fetchUpdateUser(userId: User["_id"], payload: Partial<User>) {
	const res = await fetch(Endpoints.user(userId), {
		method: "PATCH",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

export default function useUpdateUser() {
	const userId = useUserStore(useShallow((state) => state.user?._id));

	return useMutation({
		mutationKey: ["user-update"],
		mutationFn: (payload: Partial<User>) =>
			fetchUpdateUser(userId as string, payload),
	});
}
