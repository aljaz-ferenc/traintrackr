import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute.tsx";
import RouteFallback from "@/components/RouteFallback/RouteFallback.tsx";
import CompletedWorkouts from "@/routes/CompletedWorkouts.tsx";
import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import AppLayout from "./components/layouts/AppLayout.tsx";
import Provider from "./provider";
import SignIn from "./routes/SignIn.tsx";
import SignUp from "./routes/SignUp.tsx";

const Dashboard = lazy(() => import("@/routes/Dashboard.tsx"));
const TodaysWorkout = lazy(() => import("@/routes/TodaysWorkout.tsx"));
const NewMesocycle = lazy(() => import("@/routes/NewMesocycle.tsx"));
const MyMesocycles = lazy(() => import("@/routes/MyMesocycles.tsx"));
const Nutrition = lazy(() => import("@/routes/Nutrition.tsx"));
const Settings = lazy(() => import("@/routes/Settings.tsx"));

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
				<Suspense fallback={<RouteFallback />}>
					<AppLayout />
				</Suspense>
			</ProtectedRoute>
		),
		children: [
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
			{
				path: "/todays-workout",
				element: <TodaysWorkout />,
			},
			{
				path: "/new-mesocycle",
				element: <NewMesocycle />,
			},
			{
				path: "/my-mesocycles",
				element: <MyMesocycles />,
			},
			{
				path: "/completed-workouts",
				element: <CompletedWorkouts />,
			},
			{
				path: "/nutrition",
				element: <Nutrition />,
			},
			{
				path: "settings",
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
