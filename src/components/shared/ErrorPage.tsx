import type { PropsWithChildren } from "react";

type ErrorPageProps = {} & PropsWithChildren;

export default function ErrorPage({ children }: ErrorPageProps) {
	return <div className="text-center mt-5 max-w-2xl mx-auto">{children}</div>;
}

export function ErrorTitle({ children }: PropsWithChildren) {
	return (
		<h3 className="text-4xl font-bold text-muted-foreground mb-5">
			{children}
		</h3>
	);
}

export function ErrorDescription({ children }: PropsWithChildren) {
	return <p className="leading-8">{children}</p>;
}
