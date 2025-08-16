import { Endpoints } from "@/core/endpoints.ts";
import type { Mesocycle, User } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

export type ActivateMesoPayload = {
	mesocycle: Mesocycle["_id"];
	startDate: Date;
	endDate: Date;
};

async function fetchActivateMeso({
	userId,
	activeMesocycle,
}: {
	userId: User["_id"];
	activeMesocycle: ActivateMesoPayload;
}) {
	const res = await fetch(Endpoints.activateMeso, {
		body: JSON.stringify({
			userId,
			activeMesocycle,
		}),
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

export default function useActivateMesocycle() {
	const queryClient = useQueryClient();
	const [user] = useUserStore(useShallow((state) => [state.user]));
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["meso-activate"],
		mutationFn: ({
			userId,
			activeMesocycle,
		}: {
			userId: User["_id"];
			activeMesocycle: ActivateMesoPayload;
		}) =>
			toast.promise(
				fetchActivateMeso({
					userId,
					activeMesocycle,
				}),
				{
					error: t("TOASTS.activateMeso.error"),
				},
			),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [
					"user",
					{
						clerkId: user?.clerkId,
					},
				],
			});
			await queryClient.invalidateQueries({
				queryKey: [
					"stats",
					{
						range: "week",
					},
				],
			});
			await queryClient.invalidateQueries({
				queryKey: [
					"mesocycle",
					{
						mesoId: user?.activeMesocycle?.mesocycle._id,
					},
				],
			});
			await queryClient.invalidateQueries({
				queryKey: ["mesocycles"],
			});
		},
	});
}
