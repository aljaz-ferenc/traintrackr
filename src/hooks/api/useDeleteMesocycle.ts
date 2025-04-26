import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Endpoints } from "@/core/endpoints.ts";
import type { Mesocycle } from "@/core/types.ts";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

async function fetchDeleteMeso(mesoId: Mesocycle["_id"]) {
	const res = await fetch(Endpoints.mesocycle(mesoId), {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

export default function useDeleteMesocycle() {
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["meso-delete"],
		mutationFn: (mesoId: Mesocycle["_id"]) =>
			toast.promise(fetchDeleteMeso(mesoId), {
				pending: t("TOASTS.deleteMeso.pending"),
				success: t("TOASTS.deleteMeso.success"),
				error: t("TOASTS.deleteMeso.error"),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["my-mesocycles"] }),
	});
}
