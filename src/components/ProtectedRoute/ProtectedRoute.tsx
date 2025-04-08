import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner.tsx";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isSignedIn, isLoaded } = useAuth();

	if (!isLoaded) {
		return <Spinner />;
	}

	if (!isSignedIn) {
		return <Navigate to="/auth" replace />;
	}

	return <>{children}</>;
}
