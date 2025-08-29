import { Endpoints } from "@/core/endpoints.ts";
import type { Mesocycle } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function useDeleteMesocycle() {
	const queryClient = useQueryClient();
	const { t } = useTranslation();
	const { userId } = useAuth();

	return useMutation({
		mutationKey: ["meso-delete"],
		mutationFn: (mesoId: Mesocycle["_id"]) =>
			toast.promise(
				createRequest({ url: Endpoints.mesocycle(mesoId), method: "DELETE" }),
				{
					pending: t("TOASTS.deleteMeso.pending"),
					success: t("TOASTS.deleteMeso.success"),
					error: t("TOASTS.deleteMeso.error"),
				},
			),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["my-mesocycles"],
			});
			queryClient.invalidateQueries({
				queryKey: [
					"user",
					{
						clerkId: userId,
					},
				],
			});
		},
	});
}
