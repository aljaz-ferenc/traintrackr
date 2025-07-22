import Spinner from "@/components/Spinner/Spinner.tsx";

export default function PageLoading() {
	return (
		<div className="h-screen absolute inset-0 grid place-items-center">
			<Spinner className="h-10" />
		</div>
	);
}
