import type {FoodItem, Macros as TMacros} from '@/core/types'
import { cn } from "@/lib/utils";
import {useState} from "react";
import CreateItemModal from "@/components/nutrition/CreateItemModal.tsx";

type MacrosProps = {
    macros: TMacros
    className?: string
    editButton?: boolean
    item?: FoodItem
}

function Macros({macros, className = '', editButton = false, item}: MacrosProps){
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false)

    return (
        <div className={cn(["flex justify-evenly items-baseline relative", className])}>
            <div className="flex flex-col items-center font-bold">
                <span className="text-muted-foreground text-sm">Calories</span>{" "}
                <span>{macros.calories} kcal</span>
            </div>
            <div className="flex flex-col items-center font-bold">
                <span className="text-muted-foreground text-sm">Protein</span>{" "}
                <span >{macros.protein} g</span>
            </div>
            <div className="flex flex-col items-center font-bold">
                <span className="text-muted-foreground text-sm">Fat</span>{" "}
                <span >{macros.fat} g</span>
            </div>
            <div className="flex flex-col items-center font-bold">
                <span className="text-muted-foreground text-sm">Carbs</span>{" "}
                <span >{macros.carbs} g</span>
            </div>
            {editButton && <CreateItemModal isOpen={updateModalIsOpen} defaultItem={item} setIsOpen={setUpdateModalIsOpen} editMode/>}
        </div>
    )
}

export default Macros
