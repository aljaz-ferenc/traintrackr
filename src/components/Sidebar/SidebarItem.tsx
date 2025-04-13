import type {TSidebarItem} from "./Sidebar.tsx";
import {NavLink} from "react-router";
import {cn} from "../../utils/utils.ts";

type MenuItemProps = {
    item: TSidebarItem
}

export default function SidebarItem({item}: MenuItemProps) {
    return (
        <NavLink to={item.path}
                 className={({isActive}) => cn(['flex gap-2 items-center py-2 px-4 hover:bg-white hover:text-black cursor-pointer transition', isActive ? 'bg-primary text-primary-foreground' : ''])}>
            <span>{item.icon}</span>
            <span className='text-sm w-max'>{item.title}</span>
        </NavLink>
    )
}