import {Copy, X} from "lucide-react";

type WorkoutActionsProps = {
    onClone: () => void
    onDelete: () => void
}

export default function WorkoutActions({onClone, onDelete}: WorkoutActionsProps) {
    return (
        <div className='absolute self-end flex gap-2 opacity-0 group-hover:opacity-100 top-0 -translate-y-7 right-0 transition-all'>
            <button onClick={onClone}>
                <Copy size={20} className='text-gray-300 hover:text-gray-500 cursor-pointer'/>
            </button>
            <button onClick={onDelete} className='ml-full'>
                <X size={20} className='text-gray-300 hover:text-red-500 cursor-pointer'/>
            </button>
        </div>
    )
}