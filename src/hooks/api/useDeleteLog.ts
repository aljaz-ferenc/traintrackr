import { Endpoints } from "@/core/endpoints.ts";
import type { WorkoutLog } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

export default function useDeleteLog() {
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const userId = useUserStore(useShallow((state) => state.user?._id));

	return useMutation({
		mutationKey: ["log-delete"],
		mutationFn: (logId: WorkoutLog["_id"]) =>
			toast.promise(
				createRequest({ url: Endpoints.log(logId), method: "DELETE" }),
				{
					error: t("TOASTS.deleteLog.error"),
				},
			),
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
