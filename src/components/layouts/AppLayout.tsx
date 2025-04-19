import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import ModeToggle from "@/components/shared/ModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function AppLayout() {
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

	return (
		<div className="flex min-h-screen relative">
			<div className="absolute top-2 right-2">
				<ModeToggle />
			</div>
			<div className="block lg:hidden">
				<Sheet open={sidebarIsOpen} onOpenChange={setSidebarIsOpen}>
					<SheetTrigger className="absolute top-2 left-2">
						<button type="button">
							<Menu size={20} />
						</button>
					</SheetTrigger>
					<SheetContent side="left">
						<Sidebar onLinkClick={() => setSidebarIsOpen(false)} />
					</SheetContent>
				</Sheet>
			</div>
			<Sidebar
				onLinkClick={() => setSidebarIsOpen(false)}
				className="hidden lg:block"
			/>
			<main className="min-h-screen mx-auto w-full p-10 max-w-[1440px]">
				<Outlet />
			</main>
		</div>
	);
}
