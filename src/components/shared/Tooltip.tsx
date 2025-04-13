import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { CircleHelp } from "lucide-react";
import type React from "react";

type AppTooltipProps = {
	content: string | React.ReactNode;
};

export default function AppTooltip({ content }: AppTooltipProps) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger>
					<CircleHelp color="gray" size={15} />
				</TooltipTrigger>
				<TooltipContent className='max-w-sm text-sm'>{content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
