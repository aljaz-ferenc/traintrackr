import type { PropsWithChildren } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";

type WidgetWrapperProps = {
	title: string;
	className?: string;
	description?: string;
};

export default function WidgetWrapper({
	children,
	title,
	className = "",
	description = "",
}: PropsWithChildren<WidgetWrapperProps>) {
	return (
		<Card className={cn(["max-h-min", className])}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="h-full">{children}</CardContent>
		</Card>
	);
}
