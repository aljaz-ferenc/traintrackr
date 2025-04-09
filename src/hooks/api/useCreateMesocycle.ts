import type { Mesocycle } from "@/state/NewMesoStore.ts";
import { useMutation } from "@tanstack/react-query";

async function fetchCreateMesocycle(mesocycle: Omit<Mesocycle, "id">) {
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
	return useMutation({
		mutationKey: ["meso-create"],
		mutationFn: (mesocycle: Omit<Mesocycle, "id">) =>
			fetchCreateMesocycle(mesocycle),
	});
}
