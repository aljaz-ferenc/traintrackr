import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Endpoints } from "@/core/endpoints.ts";
import type {Mesocycle, User} from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import {useShallow} from "zustand/react/shallow";

export type ActivateMesoPayload = {
	mesocycle: Mesocycle["_id"];
	startDate: Date;
	endDate: Date;
};

async function fetchActivateMeso({
	userId,
	activeMesocycle,
}: { userId: User['_id']; activeMesocycle: ActivateMesoPayload }) {
	const res = await fetch(Endpoints.activateMeso, {
		body: JSON.stringify({ userId, activeMesocycle }),
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

export default function useActivateMesocycle() {
	const queryClient = useQueryClient();
	const userId = useUserStore(useShallow(state => state.user?._id))

	return useMutation({
		mutationKey: ["meso-activate"],
		mutationFn: ({
			userId,
			activeMesocycle,
		}: { userId: User['_id']; activeMesocycle: ActivateMesoPayload }) =>
			fetchActivateMeso({ userId, activeMesocycle }),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["user", { userId }],
			});
			await queryClient.invalidateQueries({
				queryKey: ["my-mesocycles", {userId}]
			})
		},
	});
}
