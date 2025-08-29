import { Endpoints } from "@/core/endpoints.ts";
import type { User } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation } from "@tanstack/react-query";

export default function useCreateUser() {
	return useMutation({
		mutationKey: ["user-create"],
		mutationFn: (user: Partial<User>) =>
			createRequest({
				url: Endpoints.createUser,
				method: "POST",
				payload: user,
			}),
	});
}
