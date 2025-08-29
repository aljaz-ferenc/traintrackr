export async function createRequest<T, P = unknown>({
	method = "GET",
	payload,
	url,
	headers = {},
}: {
	method?: string;
	payload?: P;
	url: string | URL;
	headers?: HeadersInit;
}): Promise<T> {
	const res = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
		body: payload ? JSON.stringify(payload) : undefined,
	});

	if (!res.ok) {
		let errorMessage = `Error ${res.status}`;
		try {
			const errorData = await res.json();
			errorMessage = errorData.message || errorMessage;
		} catch {
			// response body isn't JSON or is empty
		}
		throw new Error(errorMessage);
	}

	if (res.status === 204) {
		return null as T;
	}

	return res.json();
}
