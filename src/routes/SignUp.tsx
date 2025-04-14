import { SignUp } from "@clerk/clerk-react";

export default function Auth() {
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<SignUp signInUrl="/sign-in" />
		</div>
	);
}
