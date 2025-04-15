import type {TSidebarItem} from "./Sidebar.tsx";
import {NavLink, useLocation} from "react-router";
import {cn} from "@/utils/utils.ts";
import {useMemo} from "react";
import {motion} from 'motion/react'

type MenuItemProps = {
    item: TSidebarItem;
};

export default function SidebarItem({item}: MenuItemProps) {
    const {pathname} = useLocation()
    const isActive = useMemo(() => pathname === `/${item.path}`, [pathname, item])

    return (
        <NavLink
            to={item.path}
            className={
                cn([
                    "relative flex gap-2 items-center py-3 px-4 hover:text-primary text-muted-foreground/70 cursor-pointer transition-all",
                    isActive ? "text-primary" : "",
                ])
            }
        >
           <span>{item.icon}</span>
           <span className="text-sm w-max">{item.title}</span>
            {isActive && <motion.div layoutId='sidebarItem' layout className='h-[80%] -translate-y-1/2 w-0.5 bg-primary absolute left-0 top-1/2' />}
        </NavLink>
    );
}
