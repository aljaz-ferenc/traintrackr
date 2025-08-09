import type { PropsWithChildren } from "react";

type OnboardingScreenWrapperProps = {
	isHidden: boolean;
};

export default function OnboardingScreenWrapper({
	children,
	isHidden,
}: PropsWithChildren<OnboardingScreenWrapperProps>) {
	return (
		<div
			aria-hidden={isHidden}
			inert={isHidden}
			className="h-full w-screen flex flex-col items-center justify-between relative"
		>
			{children}
		</div>
	);
}
