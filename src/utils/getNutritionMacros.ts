import type {Macros, Nutrition} from "@/core/types.ts";

export function getNutritionMacros(nutrition: Pick<Nutrition, 'amount' | 'item'>): Macros{
    const {calories, protein, fat, carbs} = nutrition.item

    return {
        calories: Math.round(nutrition.amount * calories / 100),
        protein: Math.round(nutrition.amount * protein / 100),
        fat: Math.round(nutrition.amount * fat / 100),
        carbs: Math.round(nutrition.amount * carbs / 100)
    }
}