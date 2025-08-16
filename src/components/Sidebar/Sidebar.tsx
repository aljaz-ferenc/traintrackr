import { Route } from "@/core/enums/Routes.enum.ts";
import { cn } from "@/lib/utils.ts";
import {
	ChartNoAxesCombined,
	Dumbbell,
	FilePlus,
	Files,
	LayoutDashboard,
	SquareCheckBig,
	Utensils,
} from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import SidebarItem from "./SidebarItem.tsx";

export type TSidebarItem = {
	path: string;
	title: string;
	icon: React.ReactNode;
};

const iconSize = 20;

type AppSidebarProps = {
	className?: string;
	onLinkClick: () => void;
};

export default function AppSidebar({
	className = "",
	onLinkClick,
}: AppSidebarProps) {
	const { t } = useTranslation();

	const menuItems: TSidebarItem[] = [
		{
			path: Route.Dashboard,
			title: t("ROUTES.dashboard"),
			icon: <LayoutDashboard size={iconSize} />,
		},
		{
			path: Route.TodaysWorkout,
			title: t("ROUTES.todaysWorkout"),
			icon: <Dumbbell size={iconSize} />,
		},
		{
			path: Route.NewMesocycle,
			title: t("ROUTES.newMesocycle"),
			icon: <FilePlus size={iconSize} />,
		},
		{
			path: Route.MyMesocycles,
			title: t("ROUTES.myMesocycles"),
			icon: <Files size={iconSize} />,
		},
		{
			path: Route.CompletedWorkouts,
			title: t("ROUTES.completedWorkouts"),
			icon: <SquareCheckBig size={iconSize} />,
		},
		{
			path: Route.Nutrition,
			title: t("ROUTES.nutrition"),
			icon: <Utensils size={iconSize} />,
		},
		{
			path: Route.Stats,
			title: t("ROUTES.stats"),
			icon: <ChartNoAxesCombined size={iconSize} />,
		},
	];

	return (
		<aside
			className={cn(["flex flex-col border-r min-h-[100vh] w-70 ", className])}
		>
			{menuItems.map((item) => (
				<SidebarItem key={item.path} item={item} onClick={onLinkClick} />
			))}
		</aside>
	);
}
