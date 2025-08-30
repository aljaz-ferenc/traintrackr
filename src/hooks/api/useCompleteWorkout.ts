import { Endpoints } from "@/core/endpoints.ts";
import type {
	ExerciseWithSets,
	Mesocycle,
	User,
	Workout,
} from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";
import {Route} from "@/core/enums/Routes.enum.ts";
import {useNavigate} from "react-router";

export type CompleteWorkoutPayload = {
	weekNumber: number;
	workout: Workout<ExerciseWithSets>;
	mesoId: Mesocycle["_id"];
	userId: User["_id"];
};

export default function useCompleteWorkout() {
	const queryClient = useQueryClient();
	const { userId } = useAuth();
	const user = useUserStore(useShallow((state) => state.user));
	const { t } = useTranslation();
    const navigate = useNavigate()

	return useMutation({
		mutationKey: ["workout-complete"],

		mutationFn: (payload: CompleteWorkoutPayload) =>
			toast.promise(
				createRequest({ url: Endpoints.logs, method: "PUT", payload }),
				{
					pending: t("TOASTS.completeWorkout.pending"),
					success: t("TOASTS.completeWorkout.success"),
					error: t("TOASTS.completeWorkout.error"),
				},
			),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [
					"user",
					{
						clerkId: userId,
					},
				],
			});
			await queryClient.refetchQueries({
				queryKey: [
					"logs",
					{
						userId: user?._id,
					},
				],
			});
            navigate(`/app/${Route.CompletedWorkouts}`);

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
