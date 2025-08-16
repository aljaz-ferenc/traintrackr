import { Endpoints } from "@/core/endpoints.ts";
import type { User } from "@/core/types.ts";
import { useMutation } from "@tanstack/react-query";

async function fetchCreateUser(user: Partial<User>) {
	const res = await fetch(Endpoints.createUser, {
		method: "POST",
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

export default function useCreateUser() {
	return useMutation({
		mutationKey: ["user-create"],
		mutationFn: (user: Partial<User>) => fetchCreateUser(user),
	});
}
