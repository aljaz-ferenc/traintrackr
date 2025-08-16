import { Endpoints } from "@/core/endpoints.ts";
import type { Mesocycle } from "@/core/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

async function fetchUpdateMesocycle(mesocycle: Mesocycle) {
	await fetch(Endpoints.mesocycle(mesocycle._id), {
		body: JSON.stringify(mesocycle),
		mode: "cors",
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export default function useUpdateMesocycle() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["meso-update"],
		mutationFn: (mesocycle: Mesocycle) =>
			toast.promise(fetchUpdateMesocycle(mesocycle), {
				pending: t("TOASTS.editMeso.pending"),
				success: t("TOASTS.editMeso.success"),
				error: t("TOASTS.editMeso.error"),
			}),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["mesocycles"],
			});
			navigate("/my-mesocycles");
		},
	});
}
