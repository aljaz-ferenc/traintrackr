import { Route } from "@/core/enums/Routes.enum.ts";
import { Link } from "react-router";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-3">
			<h1 className="text-8xl">404</h1>
			<p className="text-3xl">This page doesn't exist</p>
			<Link className="underline text-muted-foreground" to={Route.Home}>
				Back
			</Link>
		</div>
	);
}
