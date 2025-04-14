import { Endpoints } from "@/core/endpoints.ts";
import type { Nutrition, User } from "@/core/types.ts";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

async function fetchNutrition(userId: User["_id"]) {
	const res = await fetch(`${Endpoints.user(userId)}/nutritions`);
	return await res.json();
}

export default function useNutrition() {
	const { userId } = useAuth();
	return useQuery<Nutrition[]>({
		queryKey: ["nutrition-get"],
		queryFn: () => fetchNutrition(userId as string),
		enabled: !!userId,
	});
}
