import { Endpoints } from "@/core/endpoints.ts";
import type { Workout } from "@/core/types.ts";
import { createRequest } from "@/utils/createRequest.ts";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function useGenerateMesocycle() {
	const { t } = useTranslation();

	return useMutation({
		mutationKey: ["generateMesocycle"],
		mutationFn: (payload: { daysPerWeek: number; userPrompt: string }) =>
			toast.promise(
				createRequest<Workout[]>({
					url: Endpoints.generateMesocycle,
					method: "POST",
					payload,
				}),
				{
					error: t("TOASTS.generateMeso.error"),
				},
			),
	});
}
