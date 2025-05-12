export interface ApiResponse<T> {
	success: boolean;
	data: T;
	message?: string;
	error?: any;
}

export async function get<T>(url: string): Promise<ApiResponse<T>> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`);
		const json: ApiResponse<T> = await res.json();
		return json;
	} catch (error) {
		return { success: false, data: null as any, error };
	}
}

export async function post<T>(url: string, data: any): Promise<ApiResponse<T>> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
		const json: ApiResponse<T> = await res.json();
		return json;
	} catch (error) {
		return { success: false, data: null as any, error };
	}
}

