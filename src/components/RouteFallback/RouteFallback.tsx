import Spinner from "../Spinner/Spinner.tsx";

export default function RouteFallback() {
	return (
		<div className="flex items-center justify-center h-screen w-screen">
			<Spinner />
		</div>
	);
}
