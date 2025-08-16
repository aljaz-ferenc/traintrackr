import Spinner from "@/components/Spinner/Spinner.tsx";
import { cn } from "@/lib/utils.ts";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps, PropsWithChildren } from "react";
import { Link } from "react-router";

const buttonStyles = cva(
	[
		"w-max relative flex items-center justify-center transition-all p-2 px-4 cursor-pointer rounded-lg font-semibold cursor-pointer",
	],
	{
		variants: {
			variant: {
				primary: ["bg-foreground text-secondary hover:bg-foreground/85"],
				secondary: ["bg-secondary text-primary hover:bg-secondary/85"],
				destructive: ["bg-destructive text-white hover:brightness-105"],
				ghost: ["bg-none"],
				link: ["text-blue-500 underline inline p-0"],
			},
		},
	},
);

type ButtonProps = {
	className?: string;
	type?: "button" | "submit";
	variant?: VariantProps<typeof buttonStyles>["variant"];
	onClick?: () => void;
	isLoading?: boolean;
	to?: string;
} & PropsWithChildren &
	ComponentProps<"button">;

export default function Button({
	children,
	type = "button",
	variant = "primary",
	className = "",
	onClick,
	isLoading,
	to,
	...props
}: ButtonProps) {
	if (variant === "link") {
		if (!to) {
			console.error('A button of type "link" needs a "to" prop.');
			return null;
		}

		return (
			<Link
				className={cn([
					buttonStyles({
						variant,
					}),
				])}
				to={to}
			>
				{children}
			</Link>
		);
	}

	return (
		<button
			type={type}
			{...props}
			className={cn([
				buttonStyles({
					variant,
				}),
				props.disabled && "cursor-not-allowed text-muted-foreground",
				className,
			])}
			onClick={onClick}
			disabled={isLoading || props.disabled}
		>
			<span className={cn([isLoading && "opacity-0"])}>{children}</span>
			<Spinner
				variant={
					variant === "primary" || variant === "destructive"
						? "secondary"
						: "primary"
				}
				className={cn([
					!isLoading && "invisible",
					"absolute top-1/2 left-1/2 -translate-1/2 border-black/40 border-t-black h-full p-2",
				])}
			/>
		</button>
	);
}
