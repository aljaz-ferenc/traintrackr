import type React from "react"
import {Dumbbell, FilePlus, Files, LayoutDashboard, Utensils, Settings} from "lucide-react";
import SidebarItem from "./SidebarItem.tsx";

export type TSidebarItem = { path: string, title: string, icon: React.ReactNode }

const iconSize = 20

const menuItems: TSidebarItem[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        icon: <LayoutDashboard size={iconSize}/>
    },
    {
        path: 'todays-workout',
        title: "Today's workout",
        icon: <Dumbbell  size={iconSize}/>
    },
    {
        path: 'new-mesocycle',
        title: 'New Mesocycle',
        icon: <FilePlus  size={iconSize}/>
    },
    {
        path: 'my-mesocycles',
        title: 'My Mesocycles',
        icon: <Files  size={iconSize}/>
    },
    {
        path: 'nutrition',
        title: 'Nutrition',
        icon: <Utensils  size={iconSize}/>
    },
    {
        path: 'settings',
        title: 'Settings',
        icon: <Settings  size={iconSize}/>
    },
]

export default function AppSidebar() {
    return (
        <aside className='flex flex-col border-r min-h-screen'>
            {menuItems.map(item => <SidebarItem key={item.path} item={item}/>)}
        </aside>
    )
}
