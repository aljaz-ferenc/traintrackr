import { Navigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner.tsx";
import { useAuth } from "@clerk/clerk-react";
import useGetUser from "@/hooks/api/useGetUser.ts";
import { isUserOnboarded } from "@/utils/utils.ts";
import { useEffect } from "react";
import useUserStore from "@/state/UserStore.ts";
import { useShallow } from "zustand/react/shallow";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isSignedIn, isLoaded } = useAuth();
	const { data, isLoading: isLoadingUser } = useGetUser();
	const [user, setUser] = useUserStore(
		useShallow((state) => [state.user, state.setUser]),
	);

	useEffect(() => {
		if (!data || user) return;

		setUser(data);
	}, [data, setUser, user]);

	if (!isLoaded || isLoadingUser) {
		return <Spinner />;
	}

	if (!isSignedIn || !data) {
		return <Navigate to="/sign-in" replace />;
	}

	const isOnboarded = isUserOnboarded(data);

	if (isSignedIn && !isOnboarded) {
		return <Navigate to="/onboarding" />;
	}

	return <>{children}</>;
}
