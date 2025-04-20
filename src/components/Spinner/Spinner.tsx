import React from "react";
import { cn } from "../../utils/utils.ts";
import { cva, VariantProps } from "class-variance-authority";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	center?: boolean;
	fullscreenCenter?: boolean;
	variant?: VariantProps<typeof spinnerStyles>["variant"];
}

const spinnerStyles = cva([""], {
	variants: {
		variant: {
			secondary: ["border-secondary/40 border-t-secondary "],
			primary: ["border-primary/40 border-t-primary "],
		},
	},
});

function Spinner({
	center = false,
	fullscreenCenter = false,
	className,
	variant = "primary",
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
			<div
				className={cn([
					"m-1 h-8 w-8 animate-spin rounded-full border-4 duration-1000",
					spinnerStyles({ variant }),
				])}
			/>
		</div>
	);
}
export default React.memo(Spinner);
