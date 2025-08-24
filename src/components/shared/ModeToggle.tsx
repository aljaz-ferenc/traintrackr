import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { useModeAnimation } from "react-theme-switch-animation";

export default function ModeToggle() {
	const { ref, toggleSwitchTheme } = useModeAnimation();

	return (
		<Button ref={ref} onClick={toggleSwitchTheme} variant="outline" size="icon">
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
