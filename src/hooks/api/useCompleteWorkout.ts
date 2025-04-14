import { Endpoints } from "@/core/endpoints.ts";
import type {
	ExerciseWithSets,
	Mesocycle,
	User,
	Workout,
} from "@/core/types.ts";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CompleteWorkoutPayload = {
	weekNumber: number;
	workout: Workout<ExerciseWithSets>;
	mesoId: Mesocycle["_id"];
	userId: User["_id"];
};

async function fetchCompleteWorkout(payload: CompleteWorkoutPayload) {
	const res = await fetch(Endpoints.logs, {
		body: JSON.stringify(payload),
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

export default function useCompleteWorkout() {
	const queryClient = useQueryClient();
	const { userId } = useAuth();
	//TODO: use mongo id, invalidate my-mesocycles
	return useMutation({
		mutationKey: ["workout-complete"],
		mutationFn: (payload: CompleteWorkoutPayload) =>
			fetchCompleteWorkout(payload),
		onSuccess: async () =>
			await queryClient.invalidateQueries({
				queryKey: ["user", { clerkId: userId }],
			}),

	});
}
