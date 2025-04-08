import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.tsx";
import RouteFallback from "./components/RouteFallback/RouteFallback.tsx";
import Provider from "./provider";
import Auth from "./routes/Auth.tsx";
const About = lazy(() => import("./routes/About"));
const Home = lazy(() => import("./routes/Home"));

const router = createBrowserRouter([
	{
		path: "/auth",
		Component: Auth,
	},
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<Suspense fallback={<RouteFallback />}>
					<Home />
				</Suspense>
			</ProtectedRoute>
		),
	},
	{
		path: "/about",
		element: (
			<ProtectedRoute>
				<Suspense fallback={<RouteFallback />}>
					<About />
				</Suspense>
			</ProtectedRoute>
		),
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
