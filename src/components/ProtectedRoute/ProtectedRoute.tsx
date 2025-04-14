import {Navigate} from "react-router-dom";
import Spinner from "../Spinner/Spinner.tsx";
import {useAuth} from "@clerk/clerk-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isSignedIn, isLoaded} = useAuth()

    if (!isLoaded) {
        return <Spinner />;
    }

    if (!isSignedIn) { // check if user.user exists
        return <Navigate to="/sign-in" replace />;
    }

    return <>{children}</>;
}
