import { RouterProvider, createBrowserRouter } from "react-router";

const router = createBrowserRouter([
	{ path: "/", element: <div>Home Page</div> },
	{ path: "/test", element: <div>Test Page</div> },
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
