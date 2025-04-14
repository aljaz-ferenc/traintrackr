import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Endpoints } from "@/core/endpoints.ts";
import type { Mesocycle } from "@/core/types.ts";

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

	return useMutation({
		mutationKey: ["meso-create"],
		mutationFn: (mesocycle: Omit<Mesocycle, "_id">) =>
			fetchCreateMesocycle(mesocycle),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["mesocycles"] });
			navigate("/my-mesocycles");
		},
	});
}
