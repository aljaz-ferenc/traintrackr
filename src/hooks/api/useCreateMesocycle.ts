import { Endpoints } from "@/core/endpoints.ts";
import { Route } from "@/core/enums/Routes.enum.ts";
import type { Mesocycle } from "@/core/types.ts";
import useUserStore from "@/state/UserStore.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

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
