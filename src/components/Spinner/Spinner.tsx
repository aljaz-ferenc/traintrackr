import React from "react";
import { cn } from "../../utils/utils.ts";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	center?: boolean;
	fullscreenCenter?: boolean;
}

function Spinner({
	center = false,
	fullscreenCenter = false,
	className,
	...props
}: Props) {
	return (
		<div
			className={cn([
				"flex items-center justify-center",
				(center || fullscreenCenter) &&
					"-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-50 transform",
				fullscreenCenter && "fixed",
				className,
			])}
			{...props}
		>
			<div className="m-1 h-8 w-8 animate-spin rounded-full border-4 border-primary/40 border-t-primary duration-1000" />
		</div>
	);
}
export default React.memo(Spinner);
