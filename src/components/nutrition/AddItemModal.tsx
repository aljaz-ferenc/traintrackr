import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Button} from "@/components/ui/button.tsx";
import React from 'react'
// import useUserStore from "@/state/UserStore.ts";
// import {useShallow} from "zustand/react/shallow";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import useFoodItems from '@/hooks/api/useFoodItems'


type AddItemModalProps = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateItemModal({isOpen, setIsOpen}: AddItemModalProps) {
    // const [userId] = useUserStore(useShallow((state) => [state.user?._id]));
    const {data: foodItems, isLoading} = useFoodItems()

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <VisuallyHidden>
                <DialogTitle>Add Item</DialogTitle>
                <DialogDescription>Add nutrition item
                </DialogDescription>
            </VisuallyHidden>
            <DialogTrigger asChild>
                <Button>Add item</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Add item</DialogHeader>
                <Select>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select item...'/>
                    </SelectTrigger>
                    <SelectContent>
                        {foodItems?.map(item => <SelectItem value={item._id}>{item.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </DialogContent>
        </Dialog>
    )
}