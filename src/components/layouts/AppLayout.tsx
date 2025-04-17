import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import ModeToggle from "@/components/shared/ModeToggle";

export default function AppLayout() {

	return (
		<div className="flex min-h-screen relative">
			<div className="absolute top-2 right-2">
				<ModeToggle />
			</div>
			<Sidebar />
			<main className="min-h-screen mx-auto w-full p-10 max-w-[1440px]">
				<Outlet />
			</main>
		</div>
	);
}
