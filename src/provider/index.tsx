import type { PropsWithChildren, ReactNode } from "react";
import ClerkProviderComponent from "./ClerkProvider.tsx";
import ReactQueryProvider from "./ReactQueryProvider.tsx";
import ThemeProvider from "./ThemeProvider.tsx";
import { ToastContainer } from "react-toastify";

type ProviderProps = {} & PropsWithChildren;

const composeProviders = (
	providers: React.FC<{
		children: ReactNode;
	}>[],
) => {
	if (!providers?.length) {
		return ({
			children,
		}: {
			children?: ReactNode;
		}) => children;
	}

	return providers.reduce((Prev, Curr) => ({ children }) => {
		if (Prev) {
			return (
				<Prev>
					<Curr>{children}</Curr>
				</Prev>
			);
		}

		return <Curr>{children}</Curr>;
	});
};

const Providers = composeProviders([
	ReactQueryProvider,
	ClerkProviderComponent,
	ThemeProvider,
]);

export default function Provider({ children }: ProviderProps) {
	return (
		<Providers>
			<ToastContainer />
			{children}
		</Providers>
	);
}
