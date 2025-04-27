import type { PropsWithChildren } from "react";

type StatsSectionWrapper = {
	title: string;
};

export default function StatsSectionWrapper({
	children,
	title,
}: PropsWithChildren<StatsSectionWrapper>) {
	return (
		<section className=" bg-secondary p-3 rounded-md">
			<h2 className="text-2xl font-bold mb-5">{title}</h2>
			{children}
		</section>
	);
}
