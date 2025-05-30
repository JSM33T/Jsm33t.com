
import { modalRef } from '@/components/sections/ModalBox';

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

// async function request<T>(
// 	method: "GET" | "POST" | "PUT" | "DELETE",
// 	url: string,
// 	body?: any,
// 	retry = true
// ): Promise<ApiResponse<T>> {
// 	try {
// 		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
// 			method,
// 			headers: {
// 				"Content-Type": "application/json",
// 				...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
// 			},
// 			body: body ? JSON.stringify(body) : undefined,
// 			credentials: "include",
// 		});

// 		if (res.status === 401 && retry) {
// 			const newToken = await refreshToken();
// 			if (newToken) {
// 				// Retry request with new token
// 				return await request<T>(method, url, body, false);
// 			}
// 		}

// 		const json: ApiResponse<T> = await res.json();
// 		return json;
// 	} catch (error) {
// 		return { status: 500, data: null as any, message: `Something went wrong : ${error}` };
// 	}
// }

async function request<T>(
	method: "GET" | "POST" | "PUT" | "DELETE",
	url: string,
	body?: any,
	retry = true
): Promise<ApiResponse<T>> {
	try {
		let headers: Record<string, string> = {
			...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
		};
		let requestBody: BodyInit | undefined;

		if (body instanceof FormData) {
			// Let browser set correct headers for multipart/form-data
			requestBody = body;
		} else if (body !== undefined) {
			headers["Content-Type"] = "application/json";
			requestBody = JSON.stringify(body);
		}

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
			method,
			headers,
			body: requestBody,
			credentials: "include",
		});

		if (res.status === 401 && retry) {
			const newToken = await refreshToken();
			if (newToken) {
				// Retry request with new token
				return await request<T>(method, url, body, false);
			}
		}

		const json: ApiResponse<T> = await res.json();
		return json;
	} catch (error) {
		return { status: 500, data: null as any, message: `Something went wrong : ${error}` };
	}
}


export function isLoggedIn(): boolean {
	if (typeof window === 'undefined') return false;
	return !!localStorage.getItem('authToken');
}

export const apiClient = {
	get: <T>(url: string) => request<T>("GET", url),
	post: <T>(url: string, data: any) => request<T>("POST", url, data),
	put: <T>(url: string, data: any) => request<T>("PUT", url, data),
	delete: <T>(url: string) => request<T>("DELETE", url),
};

async function refreshToken(): Promise<string | null> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
			method: 'POST',
			credentials: 'include',
		});
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
			// setTimeout(() => {
			// 	localStorage.removeItem('authToken');
			// 	window.location.href = '/';
			// }, 3000);
		}
		return null;
	}
}
