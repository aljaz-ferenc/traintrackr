import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./scss/index.css";
import App from "./App.tsx";
import "./core/i18n.ts";
import "wicg-inert";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
