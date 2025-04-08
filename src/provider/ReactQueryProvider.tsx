import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			refetchOnMount: true,
			refetchOnWindowFocus: true,
			gcTime: 1000 * 60 * 60 * 24 * 24, //14 days
			staleTime: 1000 * 60 * 5, // 5 minutes
		},
	},
});

type ReactQueryProviderProps = {} & PropsWithChildren;

export default function ReactQueryProvider({
	children,
}: ReactQueryProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
