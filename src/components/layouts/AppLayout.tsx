import MobileSidebar from "@/components/sidebar/MobileSidebar.tsx";
import ModeToggle from "@/components/shared/ModeToggle";
import SelectLanguage from "@/components/shared/SelectLanguage.tsx";
import { UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "@/components/sidebar/Sidebar";

export default function AppLayout() {
	const [_, setSidebarIsOpen] = useState(false);

	return (
		<div className="flex min-h-screen relative">
			<Sidebar
				onLinkClick={() => setSidebarIsOpen(false)}
				className="hidden lg:block"
			/>
			<main className="min-h-screen mx-auto w-full p-3 sm:p-5 relative lg:p-10 max-w-screen overflow-y-hidden">
				<div className="flex items-center gap-3">
					<div className="flex gap-3 w-full items-center ml-auto mb-5">
						<MobileSidebar onOpenChange={setSidebarIsOpen} />
						<div className="ml-auto grid place-items-center">
							<UserButton />
						</div>
						<ModeToggle />
						<SelectLanguage />
					</div>
				</div>
				<Outlet />
			</main>
		</div>
	);
}
