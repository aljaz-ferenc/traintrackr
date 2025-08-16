import { Endpoints } from "@/core/endpoints.ts";
import type { Mesocycle } from "@/core/types.ts";
import { useQuery } from "@tanstack/react-query";

async function fetchAllMesocycles() {
	try {
		const data = await fetch(Endpoints.mesocycles);
		return await data.json();
	} catch {
		throw new Error("Error fetching mesocycles");
	}
}

export default function useGetAllMesocycles() {
	return useQuery<{
		mesocycles: Mesocycle[];
	}>({
		queryKey: ["mesocycles"],
		queryFn: fetchAllMesocycles,
	});
}
