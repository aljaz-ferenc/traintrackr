import type { Mesocycle, User } from "@/core/types.ts";
import { Range } from "@/routes/Stats.tsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class Endpoints {
	static mesocycles = `${BASE_URL}/mesocycles`;
	static mesocycle = (mesoId: Mesocycle["_id"]) =>
		`${BASE_URL}/mesocycles/${mesoId}`;
	static activateMeso = `${BASE_URL}/mesocycles/activate`;
	static user = (clerkId: string) => `${BASE_URL}/users/${clerkId}`;
	static createUser = `${BASE_URL}/users`;
	static logs = `${BASE_URL}/logs`;
	static getLogs = (userId: User["_id"]) => `${BASE_URL}/logs/${userId}`;
	static stats = (userId: User["_id"], range?: Range) =>
		`${BASE_URL}/users/${userId}/stats?range=${range}`;
	static nutrition = `${BASE_URL}/nutrition`
	static foodItems = `${BASE_URL}/foodItems`
}
