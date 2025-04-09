import type {Mesocycle} from "@/core/types.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export class Endpoints {
    static mesocycles = `${BASE_URL}/mesocycles`
    static mesocycle = (mesoId: Mesocycle['_id']) => `${BASE_URL}/mesocycles/${mesoId}`
    static activateMeso = `${BASE_URL}/mesocycles/activate`
}