import {Outlet} from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import useGetUser from "@/hooks/api/useGetUser.ts";
import {useEffect} from "react";
import useUserStore from "@/state/UserStore.ts";
import {useShallow} from "zustand/react/shallow";

export default function AppLayout() {
    const {data, isLoading} = useGetUser()
    const [setUser] = useUserStore(useShallow(state => [state.setUser]))

    useEffect(() => {
        if (!data || isLoading) return
        setUser(data.user)
    }, [data, isLoading, setUser])

    if (isLoading) {
        return <>Loading app...</>
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar/>
            <main className='mx-auto py-10'>
                <Outlet/>
            </main>
        </div>
    );
}
