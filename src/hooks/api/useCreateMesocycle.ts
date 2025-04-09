import type { Mesocycle } from "@/state/NewMesoStore.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

async function fetchCreateMesocycle(mesocycle: Omit<Mesocycle, "_id">) {
	await fetch("http://localhost:4000/api/v1/mesocycles", {
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
