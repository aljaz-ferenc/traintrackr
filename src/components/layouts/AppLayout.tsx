import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import ModeToggle from "@/components/shared/ModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { Menu } from "lucide-react";
import { useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import SelectLanguage from "@/components/shared/SelectLanguage.tsx";

export default function AppLayout() {
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

	return (
		<div className="flex min-h-screen relative">
			<Sidebar
				onLinkClick={() => setSidebarIsOpen(false)}
				className="hidden lg:block"
			/>
			<main className="min-h-screen mx-auto w-full p-3 sm:p-5  lg:p-10 max-w-[1440px]">
				<div className="flex items-center gap-3">
					<div className="block lg:hidden">
						<Sheet open={sidebarIsOpen} onOpenChange={setSidebarIsOpen}>
							<SheetTrigger asChild>
								<button type="button" className="cursor-pointer">
									<Menu size={20} />
								</button>
							</SheetTrigger>
							<SheetContent side="left" className="w-fit">
								<Sidebar onLinkClick={() => setSidebarIsOpen(false)} />
							</SheetContent>
						</Sheet>
					</div>
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
