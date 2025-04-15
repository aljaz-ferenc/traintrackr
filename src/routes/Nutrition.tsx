import AddItemModal from "@/components/nutrition/AddItemModal";
import CreateItemModal from "@/components/nutrition/CreateItemModal";
import NutritionItem from "@/components/nutrition/NutritionItem.tsx";
import RouteTitle from "@/components/shared/RouteTitle.tsx";
import useNutrition from "@/hooks/api/useNutrition.ts";
import {useState} from "react";
import Macros from '@/components/nutrition/Macros.tsx'
import Spinner from "@/components/Spinner/Spinner.tsx";

export default function Nutrition() {
    const [createItemIsOpen, setCreateItemIsOpen] = useState(false);
    const [addItemIsOpen, setAddItemIsOpen] = useState(false);
    const {data, isLoading} = useNutrition();

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <section className="w-[1200px]">
            <RouteTitle title="Nutrition"/>
            {data && <Macros macros={data.totalMacros}/>}
            <div className="flex gap-2">
                <CreateItemModal
                    isOpen={createItemIsOpen}
                    setIsOpen={setCreateItemIsOpen}
                />
                <AddItemModal isOpen={addItemIsOpen} setIsOpen={setAddItemIsOpen}/>
            </div>
            <div className="mt-5 flex flex-col gap-2">
                {data?.nutritions?.map((nutrition) => (
                    <NutritionItem key={nutrition._id} nutrition={nutrition}/>
                ))}
            </div>
        </section>
    );
}
