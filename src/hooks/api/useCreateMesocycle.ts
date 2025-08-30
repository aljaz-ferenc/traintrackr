import { Endpoints } from "@/core/endpoints.ts";
import { Route } from "@/core/enums/Routes.enum.ts";
import type { Mesocycle } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

export default function useCreateMesocycle() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const userId = useUserStore(useShallow((state) => state.user?._id));
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["meso-create"],
		mutationFn: (mesocycle: Omit<Mesocycle, "_id">) =>
			toast.promise(
				createRequest({
					url: Endpoints.mesocycles,
					method: "POST",
					payload: mesocycle,
				}),
				{
					pending: t("TOASTS.createMeso.pending"),
					success: t("TOASTS.createMeso.success"),
					error: t("TOASTS.createMeso.error"),
				},
			),
		onSuccess: async () => {
			await queryClient.refetchQueries({
				queryKey: [
					"my-mesocycles",
					{
						userId,
					},
				],
			});
			navigate(`/app/${Route.MyMesocycles}`);
		},
	});
}
