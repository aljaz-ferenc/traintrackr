import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils.ts";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";

type StatsSectionWrapper = {
	title: string;
	className?: string;
};

export default function StatsSectionWrapper({
	children,
	title,
	className = "",
}: PropsWithChildren<StatsSectionWrapper>) {
	return (
		<Card className={cn(["py-10 px-5 rounded-md", className])}>
			<CardContent>
				<CardHeader>
					<CardTitle className="text-2xl font-bold mb-5">{title}</CardTitle>
				</CardHeader>
				{children}
			</CardContent>
		</Card>
	);
}
