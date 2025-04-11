import useGetUser from "@/hooks/api/useGetUser.ts";
import useUserStore from "@/state/UserStore.ts";
import {useEffect} from "react";
import {Outlet} from "react-router";
import {useShallow} from "zustand/react/shallow";
import Sidebar from "../Sidebar/Sidebar";

export default function AppLayout() {
    const {data, isLoading} = useGetUser();
    const [setUser] = useUserStore(useShallow((state) => [state.setUser]));

    useEffect(() => {
        if (!data || isLoading) return
        console.log('data: ', data)
        setUser(data.user)
    }, [data, isLoading, setUser])

    if (isLoading) {
        return <>Loading app...</>
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar/>
            <main className="mx-auto py-10 min-h-screen">
                <Outlet/>
            </main>
        </div>
    );
}
