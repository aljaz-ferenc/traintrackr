import Sidebar from "@/components/sidebar/Sidebar.tsx";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type MobileSidebarProps = {
	onOpenChange: (open: boolean) => void;
};

export default function MobileSidebar({ onOpenChange }: MobileSidebarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation();

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		onOpenChange(isOpen);
	};

	return (
		<div className="block lg:hidden">
			<Sheet open={isOpen} onOpenChange={(open) => handleOpenChange(open)}>
				<SheetTrigger asChild>
					<button type="button" className="cursor-pointer">
						<Menu size={20} />
					</button>
				</SheetTrigger>
				<SheetContent side="left" className="w-fit">
					<VisuallyHidden>
						<SheetTitle>{t("SIDEBAR.title")}</SheetTitle>
						<SheetDescription>{t("SIDEBAR.description")}</SheetDescription>
					</VisuallyHidden>
					<Sidebar onLinkClick={() => handleOpenChange(false)} />
				</SheetContent>
			</Sheet>
		</div>
	);
}
