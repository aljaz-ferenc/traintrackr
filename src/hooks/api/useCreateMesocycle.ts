import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Endpoints } from "@/core/endpoints.ts";
import type { Mesocycle } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

async function fetchCreateMesocycle(mesocycle: Omit<Mesocycle, "_id">) {
	await fetch(Endpoints.mesocycles, {
		body: JSON.stringify(mesocycle),
		mode: "cors",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export default function useCreateMesocycle() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const userId = useUserStore(useShallow((state) => state.user?._id));
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["meso-create"],
		mutationFn: (mesocycle: Omit<Mesocycle, "_id">) =>
			toast.promise(fetchCreateMesocycle(mesocycle), {
				pending: t("TOASTS.createMeso.pending"),
				success: t("TOASTS.createMeso.success"),
				error: t("TOASTS.createMeso.error"),
			}),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["my-mesocycles", { userId }],
			});
			navigate("/my-mesocycles");
		},
	});
}
