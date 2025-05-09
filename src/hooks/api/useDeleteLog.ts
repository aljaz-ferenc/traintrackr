import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { WorkoutLog } from "@/core/types.ts";
import { Endpoints } from "@/core/endpoints.ts";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";

async function fetchDeleteLog(logId: WorkoutLog["_id"]) {
	const res = await fetch(Endpoints.log(logId), {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

export default function useDeleteLog() {
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const userId = useUserStore(useShallow((state) => state.user?._id));

	return useMutation({
		mutationKey: ["log-delete"],
		mutationFn: (logId: WorkoutLog["_id"]) =>
			toast.promise(fetchDeleteLog(logId), {
				error: t("TOASTS.deleteLog.error"),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [
					"logs",
					{
						userId,
					},
				],
			});
		},
	});
}
