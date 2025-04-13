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
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/Input"
import useUserStore from "@/state/UserStore.ts";
import {useShallow} from "zustand/react/shallow";
import useCreateFoodItem from '@/hooks/api/useCreateFoodItem'


const formSchema = z.object({
    name: z.string(),
    calories: z.coerce.number().nonnegative({
        message: "Calories must be a valid positive number",
    }),
    protein: z.coerce.number().nonnegative({
        message: "Protein must be a valid positive number",
    }),
    carbs: z.coerce.number().nonnegative({
        message: "Carbs must be a valid positive number",
    }),
    fat: z.coerce.number().nonnegative({
        message: "Fat must be a valid positive number",
    }),
});

type CreateItemModalProps = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateItemModal({isOpen, setIsOpen}: CreateItemModalProps) {
    const {mutateAsync: createFoodItem} = useCreateFoodItem()
    const [userId] = useUserStore(useShallow((state) => [state.user?._id]));

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)

        await createFoodItem({...values, createdBy: userId as string})
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <VisuallyHidden>
                <DialogTitle>Create New Item</DialogTitle>
                <DialogDescription>Create new item
                </DialogDescription>
            </VisuallyHidden>
            <DialogTrigger asChild>
                <Button>Create new item</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Create New Item</DialogHeader>
                <DialogDescription>Add nutrition values per 100 grams</DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl><Input {...field}/></FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='calories'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Calories</FormLabel>
                                    <FormControl><Input {...field}/></FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='protein'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Protein</FormLabel>
                                    <FormControl><Input {...field}/></FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='fat'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Fat</FormLabel>
                                    <FormControl><Input {...field}/></FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='carbs'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Carbs</FormLabel>
                                    <FormControl><Input {...field}/></FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type='submit'>Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}