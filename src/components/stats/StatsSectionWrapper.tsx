import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils.ts";

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
		<section className={cn(["bg-secondary p-3 rounded-md", className])}>
			<h2 className="text-2xl font-bold mb-5">{title}</h2>
			{children}
		</section>
	);
}
