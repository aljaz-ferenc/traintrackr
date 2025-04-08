import { RouterProvider, createBrowserRouter } from "react-router";
import Provider from "./provider";
import About from "./routes/About.tsx";
import Home from "./routes/Home.tsx";

const router = createBrowserRouter([
	{ path: "/", Component: Home },
	{ path: "/about", Component: About },
]);

function App() {
	return (
		<Provider>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
