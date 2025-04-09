import { useMutation } from "@tanstack/react-query";

export type User = {
	clerkId: string;
	email: string;
	username?: string;
	firstName?: string;
	lastName?: string;
	image?: string;
	activeMesocycle: string;
};

async function fetchCreateUser(user: User) {
	const res = await fetch("http://localhost:4000/api/v1/users", {
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
		mutationFn: (user: User) => fetchCreateUser(user),
	});
}
