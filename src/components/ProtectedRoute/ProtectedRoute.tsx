import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import useGetUser from "@/hooks/api/useGetUser.ts";
import { isUserOnboarded } from "@/utils/utils.ts";
import PageLoading from "@/components/shared/PageLoading.tsx";
import Onboarding from "@/routes/Onboarding.tsx";

export function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isSignedIn, isLoaded } = useAuth();
	const { data, isLoading: isLoadingUser } = useGetUser();

	if (!isLoaded || isLoadingUser) {
		return <PageLoading />;
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
