import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import ModeToggle from "@/components/shared/ModeToggle";
import { useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import SelectLanguage from "@/components/shared/SelectLanguage.tsx";
import MobileSidebar from "@/components/Sidebar/MobileSidebar.tsx";

export default function AppLayout() {
	const [_, setSidebarIsOpen] = useState(false);

	return (
		<div className="flex min-h-screen relative">
			<Sidebar
				onLinkClick={() => setSidebarIsOpen(false)}
				className="hidden lg:block"
			/>
			<main className="min-h-screen mx-auto w-full p-3 sm:p-5  lg:p-10 max-w-[1440px]">
				<div className="flex items-center gap-3">
					<MobileSidebar onOpenChange={setSidebarIsOpen} />
					<div className="flex gap-3 items-center ml-auto">
						<UserButton />
						<ModeToggle />
						<SelectLanguage />
					</div>
				</div>
				<Outlet />
			</main>
		</div>
	);
}
