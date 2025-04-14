import useGetUser from "@/hooks/api/useGetUser.ts";
import useUserStore from "@/state/UserStore.ts";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { useShallow } from "zustand/react/shallow";
import Sidebar from "../Sidebar/Sidebar";
import ModeToggle from "@/components/shared/ModeToggle";

export default function AppLayout() {
	const {data, isSuccess} = useGetUser()
	const [user, setUser] = useUserStore(useShallow(state => [state.user, state.setUser]))

	useEffect(() => {
		if(isSuccess && data && !user){
			setUser(data)
		}
	}, [isSuccess, data, user, setUser])

	return (
		<div className="flex min-h-screen relative">
			<div className="absolute top-2 right-2">
				<ModeToggle />
			</div>
			<Sidebar />
			<main className="mx-auto py-10 min-h-screen">
				<Outlet />
			</main>
		</div>
	);
}
