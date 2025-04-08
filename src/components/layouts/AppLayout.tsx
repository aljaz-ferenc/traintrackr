import {Outlet} from "react-router";
import Sidebar from "../Sidebar/Sidebar";

export default function AppLayout() {
    return (
        <div className="flex min-h-screen">
            <Sidebar/>
            <Outlet/>
        </div>
    );
}
