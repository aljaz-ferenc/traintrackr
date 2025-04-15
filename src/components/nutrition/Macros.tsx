import type {Macros} from '@/components/core/types'
import { cn } from "@/lib/utils";

type MacrosProps = {
    macros: Macros
    className: string
}

function Macros({macros, className}: MacrosProps){
    return (
        <div className={cn(["flex justify-evenly mb-5", className])}>
            <div className="flex flex-col items-center">
                <span className="text-muted-foreground text-sm">Calories</span>{" "}
                <span className="font-bold">{macros.calories} kcal</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-muted-foreground text-sm">Protein</span>{" "}
                <span className="font-bold">{macros.protein} g</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-muted-foreground text-sm">Fat</span>{" "}
                <span className="font-bold">{macros.fat} g</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-muted-foreground text-sm">Carbs</span>{" "}
                <span className="font-bold">{macros.carbs} g</span>
            </div>
        </div>
    )
}

export default Macros
