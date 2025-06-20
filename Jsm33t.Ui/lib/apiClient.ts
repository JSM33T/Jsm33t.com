import { modalRef } from '@/components/ui/ModalBox';

export interface ApiResponse<T> {
	status: number;
	message: string;
	data: T;
	hints?: any[];
	responseTimeMs?: number;
}

let authToken: string | null = null;

/**
 * Set the default client-side JWT token for API calls.
 */
export function setAuthToken(token: string) {
	authToken = token;
}

/**
 * Universal request function for API calls.
 * - Uses client token (from setAuthToken) if `token` param is not provided.
 * - Uses provided token param (e.g. from server cookies) if present.
 */
async function request<T>(
	method: "GET" | "POST" | "PUT" | "DELETE",
	url: string,
	body?: any,
	retry = true,
	token?: string
): Promise<ApiResponse<T>> {
	try {
		const headers: Record<string, string> = {
			...(token
				? { Authorization: `Bearer ${token}` }
				: authToken
					? { Authorization: `Bearer ${authToken}` }
					: {}),
		};
		let requestBody: BodyInit | undefined;

		if (body instanceof FormData) {
			// Let browser set correct headers for multipart/form-data
			requestBody = body;
		} else if (body !== undefined) {
			headers["Content-Type"] = "application/json";
			requestBody = JSON.stringify(body);
		}

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
			{
				method,
				headers,
				body: requestBody,
				credentials: "include",
			}
		);

		if (res.status === 401 && retry && typeof window !== "undefined") {
			const newToken = await refreshToken();
			if (newToken) {
				return await request<T>(method, url, body, false, newToken);
			}
		}

		const json: ApiResponse<T> = await res.json();
		return json;
	} catch (error) {
		return {
			status: 500,
			data: null as any,
			message: `Something went wrong : ${error}`,
		};
	}
}

/**
 * Check if user is logged in (client-side only).
 */
export function isLoggedIn(): boolean {
	if (typeof window === 'undefined') return false;
	return !!localStorage.getItem('authToken');
}

/**
 * API client for GET, POST, PUT, DELETE with optional token parameter.
 * - Pass `token` param for server-side requests (SSR/ISR).
 * - Omit for client-side (SPA) usage.
 */
export const apiClient = {
	get: <T>(url: string, token?: string) => request<T>("GET", url, undefined, true, token),
	post: <T>(url: string, data: any, token?: string) => request<T>("POST", url, data, true, token),
	put: <T>(url: string, data: any, token?: string) => request<T>("PUT", url, data, true, token),
	delete: <T>(url: string, token?: string) => request<T>("DELETE", url, undefined, true, token),
};

/**
 * Tries to refresh the JWT token using the backend /auth/refresh endpoint.
 * Only works client-side (browser).
 */
async function refreshToken(): Promise<string | null> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
			{
				method: 'POST',
				credentials: 'include',
			}
		);
		if (!res.ok) {
			if (typeof window !== 'undefined') {
				modalRef?.current?.open({
					title: 'Session Expired',
					description: 'Your session has expired. Please log in again.',
					bodyList: ['You will be redirected shortly.'],
				});
				setTimeout(() => {
					localStorage.removeItem('authToken');
					window.location.href = '/';
				}, 3000);
			}
			return null;
		}

		const json = await res.json();
		const newToken = json.data?.accessToken;
		if (newToken) {
			localStorage.setItem('authToken', newToken);
			setAuthToken(newToken);
			return newToken;
		}
		return null;
	} catch {
		if (typeof window !== 'undefined') {
			modalRef?.current?.open({
				title: 'Session Expired',
				description: 'Could not refresh session. Please log in again.',
				bodyList: [],
			});
		}
		return null;
	}
}
