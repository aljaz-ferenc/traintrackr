import { SignIn } from "@clerk/clerk-react";

export default function Auth() {
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<SignIn signUpUrl="/sign-up" />
		</div>
	);
}
