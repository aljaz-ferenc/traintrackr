import type { Range } from "@/core/enums/Range.enum.ts";
import type {
	FoodItem,
	Mesocycle,
	Nutrition,
	User,
	WorkoutLog,
} from "@/core/types.ts";

const BASE_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000/api/v1"
		: import.meta.env.VITE_API_BASE_URL;

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class Endpoints {
	//MESOCYCLES
	static myMesocycles = (userId: User["_id"]) =>
		`${BASE_URL}/users/${userId}/mesocycles`;
	static mesocycles = `${BASE_URL}/mesocycles`;
	static mesocycle = (mesoId: Mesocycle["_id"]) =>
		`${BASE_URL}/mesocycles/${mesoId}`;
	static activateMeso = `${BASE_URL}/mesocycles/activate`;
	//USERS
	static user = (userId: string) => `${BASE_URL}/users/${userId}`;
	static createUser = `${BASE_URL}/users`;
	//LOGS
	static logs = `${BASE_URL}/logs`;
	static log = (logId: WorkoutLog["_id"]) => `${BASE_URL}/logs/${logId}`;
	static myLogs = (userId: User["_id"]) => `${BASE_URL}/users/${userId}/logs`;
	//STATS
	static stats = (userId: User["_id"], range?: Range) =>
		`${BASE_URL}/users/${userId}/stats?range=${range}`;
	static editStats = (userId: User["_id"]) =>
		`${BASE_URL}/users/${userId}/stats/edit`;
	//FOOD ITEMS
	static foodItems = (userId: User["_id"]) =>
		`${BASE_URL}/users/${userId}/foodItems`;
	static allFoodItems = `${BASE_URL}/foodItems`;
	static foodItem = (itemId: FoodItem["_id"]) =>
		`${BASE_URL}/foodItems/${itemId}`;
	//NUTRITIONS
	static nutritions = `${BASE_URL}/nutritions`;
	static nutritionsByDate = (userId: string, date?: string) =>
		`${BASE_URL}/users/${userId}/nutritions${date ? `?date=${date}` : ""}`;
	static nutrition = (nutritionId: Nutrition["_id"]) =>
		`${BASE_URL}/nutritions/${nutritionId}`;
}
