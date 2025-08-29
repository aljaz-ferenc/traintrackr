import { Endpoints } from "@/core/endpoints.ts";
import type { User } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

export default function useUpdateUser() {
	const userId = useUserStore(useShallow((state) => state.user?._id));

	return useMutation({
		mutationKey: ["user-update"],
		mutationFn: (payload: Partial<User>) =>
			createRequest({
				url: Endpoints.user(userId as string),
				method: "PATCH",
				payload: payload,
			}),
	});
}
