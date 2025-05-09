import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "@/core/endpoints.ts";
import type { Mesocycle } from "@/core/types.ts";

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
		//TODO: invalidate query that fetches mesos by user
		queryKey: ["mesocycles"],
		queryFn: fetchAllMesocycles,
	});
}
