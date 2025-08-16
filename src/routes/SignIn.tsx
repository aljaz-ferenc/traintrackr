import DemoUserCredentials from "@/components/SignIn/DemoUserCredentials.tsx";
import { SignIn } from "@clerk/clerk-react";

const showDemoUserCredentials = import.meta.env.VITE_SHOW_DEMO_USER_CREDENTIALS;

export default function Auth() {
	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center gap-10">
			<SignIn signUpUrl="/sign-up" />
			{showDemoUserCredentials && <DemoUserCredentials />}
		</div>
	);
}
