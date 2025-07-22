import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import useGetUser from "@/hooks/api/useGetUser.ts";
import { isUserOnboarded } from "@/utils/utils.ts";
import Onboarding from "@/routes/Onboarding.tsx";

export function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isSignedIn, isLoaded } = useAuth();
	const { data, isLoading: isLoadingUser } = useGetUser();

	if (!isLoaded || isLoadingUser) {
		return (
			<div className="h-screen absolute inset-0 grid place-items-center text-muted-foreground italic">
				Authenticating...
			</div>
		);
	}

	if (!isSignedIn || !data) {
		return <Navigate to="/sign-in" replace />;
	}

	const isOnboarded = isUserOnboarded(data);

	if (isSignedIn && !isOnboarded) {
		return <Onboarding />;
	}

	return <>{children}</>;
}
