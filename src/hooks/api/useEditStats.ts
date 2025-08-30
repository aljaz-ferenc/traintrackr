import { Endpoints } from "@/core/endpoints.ts";
import useUserStore from "@/state/UserStore.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

export default function useEditStats() {
	const userId = useUserStore(useShallow((state) => state.user?._id));
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["stats-edit"],
		mutationFn: (stats: object) =>
			toast.promise(
				createRequest({
					url: Endpoints.editStats(userId as string),
					method: "PATCH",
					payload: stats,
				}),
				{
					error: "Could not edit stats",
				},
			),
		onSuccess: async () => {
			await queryClient.refetchQueries({
				queryKey: ["stats"],
			});
		},
	});
}
