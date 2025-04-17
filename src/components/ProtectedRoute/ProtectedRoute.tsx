import {Navigate} from "react-router-dom";
import Spinner from "../Spinner/Spinner.tsx";
import {useAuth} from "@clerk/clerk-react";
import useGetUser from "@/hooks/api/useGetUser.ts";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isSignedIn, isLoaded} = useAuth()
    const {data: user, isLoading: isLoadingUser} = useGetUser()

    if (!isLoaded || isLoadingUser) {
        return <Spinner />;
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    const stats = user?.stats
    const onboarded = stats?.weight && stats.height &&stats.dob && stats.gender

    if(isSignedIn && !onboarded){
        return <Navigate to='/onboarding'/>
    }

    return <>{children}</>;
}
