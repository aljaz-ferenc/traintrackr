import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute.tsx";
import { Route } from "@/core/enums/Routes.enum.ts";
import CompletedWorkouts from "@/routes/CompletedWorkouts.tsx";
import Stats from "@/routes/Stats.tsx";
import { RouterProvider, createBrowserRouter } from "react-router";
import AppLayout from "./components/layouts/AppLayout.tsx";
import Provider from "./provider";
import SignIn from "./routes/SignIn.tsx";
import SignUp from "./routes/SignUp.tsx";
import TodaysWorkout from "@/routes/TodaysWorkout.tsx";
import NewMesocycle from "@/routes/NewMesocycle.tsx";
import MyMesocycles from "@/routes/MyMesocycles.tsx";
import Nutrition from "@/routes/Nutrition.tsx";
import Settings from "@/routes/Settings.tsx";
import Dashboard from "@/routes/Dashboard.tsx";

const router = createBrowserRouter([
	{
		path: "/sign-in/*",
		Component: SignIn,
	},
	{
		path: "/sign-up/*",
		Component: SignUp,
	},
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<AppLayout />
			</ProtectedRoute>
		),
		children: [
			{
				path: Route.Dashboard,
				element: <Dashboard />,
			},
			{
				path: Route.TodaysWorkout,
				element: <TodaysWorkout />,
			},
			{
				path: Route.NewMesocycle,
				element: <NewMesocycle />,
			},
			{
				path: Route.MyMesocycles,
				element: <MyMesocycles />,
			},
			{
				path: "my-mesocycles/:mesoId/edit",
				element: <NewMesocycle />,
			},
			{
				path: Route.CompletedWorkouts,
				element: <CompletedWorkouts />,
			},
			{
				path: Route.Nutrition,
				element: <Nutrition />,
			},
			{
				path: Route.Stats,
				element: <Stats />,
			},
			{
				path: Route.Settings,
				element: <Settings />,
			},
		],
	},
]);

function App() {
	return (
		<Provider>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
