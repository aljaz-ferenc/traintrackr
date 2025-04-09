import { Mesocycle } from "@/state/NewMesoStore.ts";
import { useQuery } from "@tanstack/react-query";

async function fetchAllMesocycles() {
	try {
		const data = await fetch("http://localhost:4000/api/v1/mesocycles");
		return await data.json();
	} catch {
		throw new Error("Error fetching mesocycles");
	}
}

export default function useGetAllMesocycles() {
	return useQuery<{ mesocycles: Mesocycle[] }>({
		queryKey: ["mesocycles"],
		queryFn: fetchAllMesocycles,
	});
}
