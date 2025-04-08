import { useAuth } from "@clerk/clerk-react";

export default function Auth() {
	const { isSignedIn } = useAuth();
	console.log(isSignedIn);
	return <>Auth</>;
}
