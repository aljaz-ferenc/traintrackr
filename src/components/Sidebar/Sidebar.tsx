import { Button } from "@/components/ui/button.tsx";
import { Route } from "@/core/enums/Routes.enum.ts";
import type { User } from "@/core/types.ts";
import useCreateUser from "@/hooks/api/useCreateUser.ts";
// import { Button } from "@/components/ui/button.tsx";
// import useCreateUser from "@/hooks/api/useCreateUser.ts";
import { UserButton } from "@clerk/clerk-react";
import {
	ChartNoAxesCombined,
	Dumbbell,
	FilePlus,
	Files,
	LayoutDashboard,
	Settings,
	SquareCheckBig,
	Utensils,
} from "lucide-react";
import type React from "react";
import SidebarItem from "./SidebarItem.tsx";
// import type {User} from "@/core/types.ts";

export type TSidebarItem = {
	path: string;
	title: string;
	icon: React.ReactNode;
};

const iconSize = 20;

const menuItems: TSidebarItem[] = [
	{
		path: Route.Dashboard,
		title: "Dashboard",
		icon: <LayoutDashboard size={iconSize} />,
	},
	{
		path: Route.TodaysWorkout,
		title: "Today's workout",
		icon: <Dumbbell size={iconSize} />,
	},
	{
		path: Route.NewMesocycle,
		title: "New Mesocycle",
		icon: <FilePlus size={iconSize} />,
	},
	{
		path: Route.MyMesocycles,
		title: "My Mesocycles",
		icon: <Files size={iconSize} />,
	},
	{
		path: Route.CompletedWorkouts,
		title: "Completed Workouts",
		icon: <SquareCheckBig size={iconSize} />,
	},
	{
		path: Route.Nutrition,
		title: "Nutrition",
		icon: <Utensils size={iconSize} />,
	},
	{
		path: Route.Stats,
		title: "Stats",
		icon: <ChartNoAxesCombined size={iconSize} />,
	},
	{
		path: Route.Settings,
		title: "Settings",
		icon: <Settings size={iconSize} />,
	},
];

//TODO: delete
const fakeUser: Partial<User> = {
	clerkId: "user_2vS8GiBuO6Gm4HxMkw76MA58SS7",
	email: "test@test.com",
	username: "username",
	firstName: "firstName",
	lastName: "lastName",
	image: "image",
	stats: {
		weight: []
	}
};

export default function AppSidebar() {
	const { mutateAsync } = useCreateUser();

	return (
		<aside className="flex flex-col border-r min-h-screen p-2 gap-2">
			{menuItems.map((item) => (
				<SidebarItem key={item.path} item={item} />
			))}

			{/*//TODO: remove*/}
			<Button onClick={() => mutateAsync(fakeUser)} type="button">
				Create Fake User
			</Button>

			<div className="mt-auto m-2">
				<UserButton showName />
			</div>
		</aside>
	);
}
