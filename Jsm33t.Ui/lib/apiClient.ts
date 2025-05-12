export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  hints?: any[];
  responseTimeMs?: number;
}

let authToken: string | null = null;

export function setAuthToken(token: string) {
	authToken = token;
}

async function request<T>(
	method: "GET" | "POST" | "PUT" | "DELETE",
	url: string,
	body?: any
): Promise<ApiResponse<T>> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
			method,
			headers: {
				"Content-Type": "application/json",
				...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
			},
			body: body ? JSON.stringify(body) : undefined,
			credentials: "include",
		});
		const json: ApiResponse<T> = await res.json();
		return json;
	} catch (error) {
		return { status: 500, data: null as any, message: "Something went wrong" };
	}
}

export const apiClient = {
	get: <T>(url: string) => request<T>("GET", url),
	post: <T>(url: string, data: any) => request<T>("POST", url, data),
	put: <T>(url: string, data: any) => request<T>("PUT", url, data),
	delete: <T>(url: string) => request<T>("DELETE", url),
};
