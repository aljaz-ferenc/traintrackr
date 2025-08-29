import { Endpoints } from "@/core/endpoints.ts";
import { Route } from "@/core/enums/Routes.enum.ts";
import type { Mesocycle } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function useUpdateMesocycle() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["meso-update"],
		mutationFn: (mesocycle: Mesocycle) =>
			toast.promise(
				createRequest({
					payload: mesocycle,
					url: Endpoints.mesocycle(mesocycle._id),
					method: "PUT",
				}),
				{
					pending: t("TOASTS.editMeso.pending"),
					success: t("TOASTS.editMeso.success"),
					error: t("TOASTS.editMeso.error"),
				},
			),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["mesocycles"],
			});
			navigate(`/app/${Route.MyMesocycles}`);
		},
	});
}
