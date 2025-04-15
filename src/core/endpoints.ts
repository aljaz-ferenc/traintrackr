import type { Mesocycle, User } from "@/core/types.ts";
import type { Range } from "@/routes/Stats.tsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class Endpoints {
	static myMesocycles =(userId: User['_id']) => `${BASE_URL}/users/${userId}/mesocycles`;
	static mesocycles = `${BASE_URL}/mesocycles`;
	static mesocycle = (mesoId: Mesocycle["_id"]) =>
		`${BASE_URL}/mesocycles/${mesoId}`;
	static activateMeso = `${BASE_URL}/mesocycles/activate`;
	static user = (userId: string) => `${BASE_URL}/users/${userId}`;
	static createUser = `${BASE_URL}/users`;
	static logs = `${BASE_URL}/logs`;
	static myLogs = (userId: User["_id"]) => `${BASE_URL}/users/${userId}/logs`;
	static stats = (userId: User["_id"], range?: Range) =>
		`${BASE_URL}/users/${userId}/stats?range=${range}`;
	static foodItems = (userId: User['_id']) => `${BASE_URL}/users/${userId}/foodItems`;
	static nutritions = `${BASE_URL}/nutritions`;
}
