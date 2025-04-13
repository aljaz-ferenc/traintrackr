import RouteTitle from "@/components/shared/RouteTitle.tsx";
import {Button} from '@/components/ui/button'
import {useState} from 'react'
import CreateItemModal from '@/components/nutrition/CreateItemModal'
import useFoodItems from '@/hooks/api/useFoodItems'

export default function Nutrition() {
    const [createItemIsOpen, setCreateItemIsOpen] = useState(false)
    const {data: foodItems, isLoading} = useFoodItems()
console.log(foodItems)
    if(isLoading){
        return <div>Loading...</div>
    }

    return <section className='w-[1200px]'>
        <RouteTitle title='Nutrition'/>
        <div className='flex justify-evenly'>
            <p>TDEE: 2342 kcal</p>
            <p>Total calories: 0kcal</p>
            <p>Total protein: 0g</p>
            <p>Total fat: 0g</p>
            <p>Total carbs: 0g</p>
        </div>
        <Button>Add item</Button>
        <CreateItemModal
            isOpen={createItemIsOpen}
            setIsOpen={setCreateItemIsOpen}
        />
        {foodItems?.map(item => (
            <div>{item.name}</div>
        ))}
    </section>
}