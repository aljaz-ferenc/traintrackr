import RouteTitle from "@/components/shared/RouteTitle.tsx";
import {useState} from 'react'
import CreateItemModal from '@/components/nutrition/CreateItemModal'
import AddItemModal from '@/components/nutrition/AddItemModal'

export default function Nutrition() {
    const [createItemIsOpen, setCreateItemIsOpen] = useState(false)
    const [addItemIsOpen, setAddItemIsOpen] = useState(false)

    return <section className='w-[1200px]'>
        <RouteTitle title='Nutrition'/>
        <div className='flex justify-evenly'>
            <p>TDEE: 2342 kcal</p>
            <p>Total calories: 0kcal</p>
            <p>Total protein: 0g</p>
            <p>Total fat: 0g</p>
            <p>Total carbs: 0g</p>
        </div>
        <CreateItemModal
            isOpen={createItemIsOpen}
            setIsOpen={setCreateItemIsOpen}
        />
        <AddItemModal isOpen={addItemIsOpen} setIsOpen={setAddItemIsOpen}/>
    </section>
}