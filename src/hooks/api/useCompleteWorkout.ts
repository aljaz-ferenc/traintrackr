import { Endpoints } from "@/core/endpoints.ts";
import type {
	ExerciseWithSets,
	Mesocycle,
	User,
	Workout,
} from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

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
	const user = useUserStore(useShallow((state) => state.user));
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["workout-complete"],
		mutationFn: (payload: CompleteWorkoutPayload) =>
			toast.promise(fetchCompleteWorkout(payload), {
				pending: t("TOASTS.completeWorkout.pending"),
				success: t("TOASTS.completeWorkout.success"),
				error: t("TOASTS.completeWorkout.error"),
			}),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [
					"user",
					{
						clerkId: userId,
					},
				],
			});
			await queryClient.invalidateQueries({
				queryKey: [
					"logs",
					{
						userId: user?._id,
					},
				],
			});
			if (user?.activeMesocycle) {
				await queryClient.invalidateQueries({
					queryKey: [
						"mesocycle",
						{
							mesoId: user?.activeMesocycle.mesocycle._id,
						},
					],
				});
			}
		},
	});
}
