import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./scss/index.css";
import App from "./App.tsx";
import "./core/i18n.ts";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
