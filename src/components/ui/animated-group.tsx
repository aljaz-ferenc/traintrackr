"use client";
import { type Variants, motion } from "motion/react";
import React, { type ElementType, type ReactNode } from "react";

export type PresetType =
	| "fade"
	| "slide"
	| "scale"
	| "blur"
	| "blur-slide"
	| "zoom"
	| "flip"
	| "bounce"
	| "rotate"
	| "swing";

type AnimatedGroupBaseProps = {
	children: ReactNode;
	className?: string;
	variants?: {
		container?: Variants;
		item?: Variants;
	};
	preset?: PresetType;
	as?: ElementType; // can be "div" | "section" | CustomComponent
	asChild?: ElementType; // same as above
};

const defaultContainerVariants: Variants = {
	visible: { transition: { staggerChildren: 0.1 } },
};

const defaultItemVariants: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const presetVariants: Record<PresetType, Variants> = {
	fade: {},
	slide: { hidden: { y: 20 }, visible: { y: 0 } },
	scale: { hidden: { scale: 0.8 }, visible: { scale: 1 } },
	blur: { hidden: { filter: "blur(4px)" }, visible: { filter: "blur(0px)" } },
	"blur-slide": {
		hidden: { filter: "blur(4px)", y: 20 },
		visible: { filter: "blur(0px)", y: 0 },
	},
	zoom: {
		hidden: { scale: 0.5 },
		visible: {
			scale: 1,
			transition: { type: "spring", stiffness: 300, damping: 20 },
		},
	},
	flip: {
		hidden: { rotateX: -90 },
		visible: {
			rotateX: 0,
			transition: { type: "spring", stiffness: 300, damping: 20 },
		},
	},
	bounce: {
		hidden: { y: -50 },
		visible: {
			y: 0,
			transition: { type: "spring", stiffness: 400, damping: 10 },
		},
	},
	rotate: {
		hidden: { rotate: -180 },
		visible: {
			rotate: 0,
			transition: { type: "spring", stiffness: 200, damping: 15 },
		},
	},
	swing: {
		hidden: { rotate: -10 },
		visible: {
			rotate: 0,
			transition: { type: "spring", stiffness: 300, damping: 8 },
		},
	},
};

const addDefaultVariants = (variants: Variants) => ({
	hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
	visible: { ...defaultItemVariants.visible, ...variants.visible },
});

export function AnimatedGroup({
	children,
	className,
	variants,
	preset,
	as = "div",
	asChild = "div",
	...rest // allow passing extra DOM props to the container
}: AnimatedGroupBaseProps & Record<string, unknown>) {
	const selectedVariants = {
		item: addDefaultVariants(preset ? presetVariants[preset] : {}),
		container: addDefaultVariants(defaultContainerVariants),
	};
	const containerVariants = variants?.container || selectedVariants.container;
	const itemVariants = variants?.item || selectedVariants.item;

	// IMPORTANT: branch by runtime type to keep types sane and avoid the keyof-widening pitfall.
	const MotionComponent =
		typeof as === "string"
			? // index into `motion` for intrinsic tags
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				((motion as unknown as Record<string, React.ComponentType<any>>)[as] ??
				motion.div)
			: // wrap custom components
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				motion.create(as as React.ComponentType<any>);

	const MotionChild =
		typeof asChild === "string"
			? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
				((motion as unknown as Record<string, React.ComponentType<any>>)[
					asChild
				] ?? motion.div)
			: // biome-ignore lint/suspicious/noExplicitAny: <explanation>
				motion.create(asChild as React.ComponentType<any>);

	return (
		<MotionComponent
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className={className}
			{...rest}
		>
			{React.Children.map(children, (child, index) => (
				<MotionChild key={`child-${index + 1}`} variants={itemVariants}>
					{child}
				</MotionChild>
			))}
		</MotionComponent>
	);
}
