import { cn } from "@/utils/utils.ts";
import { motion } from "motion/react";
import { useMemo } from "react";
import { NavLink, useLocation } from "react-router";
import type { TSidebarItem } from "./Sidebar.tsx";

type MenuItemProps = {
	item: TSidebarItem;
	onClick: () => void;
};

export default function SidebarItem({ item, onClick }: MenuItemProps) {
	const { pathname } = useLocation();
	const isActive = useMemo(
		() => pathname === `/${item.path}`,
		[pathname, item],
	);

	return (
		<NavLink
			to={item.path}
			onClick={onClick}
			className={cn([
				"relative flex gap-2 items-center py-3 px-4 hover:text-primary text-muted-foreground/70 cursor-pointer transition-all",
				isActive ? "text-primary" : "",
			])}
		>
			<span>{item.icon}</span>
			<span className="text-sm w-max">{item.title}</span>
			{isActive && (
				<motion.div
					layoutId="sidebarItem"
					layout
					className="h-[80%] rounded-r-2xl -translate-y-1/2 w-1 bg-primary absolute left-0 top-1/2"
				/>
			)}
		</NavLink>
	);
}
