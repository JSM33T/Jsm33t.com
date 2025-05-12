// export interface ApiResponse<T> {
// 	success: boolean;
// 	data: T;
// 	message?: string;
// 	error?: any;
// }

// export async function get<T>(url: string): Promise<ApiResponse<T>> {
// 	try {
// 		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`);
// 		const json = await res.json();

// 		return {
// 			success: json.status === 200,
// 			data: json.data,
// 			message: json.message,
// 			error: json.status !== 200 ? json.message : undefined,
// 		};
// 	} catch (error) {
// 		return { success: false, data: null as any, error };
// 	}
// }

// export async function post<T>(url: string, data: any): Promise<ApiResponse<T>> {
// 	try {
// 		const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(data),
// 		});
// 		const json = await res.json();

// 		return {
// 			success: json.status === 200,
// 			data: json.data,
// 			message: json.message,
// 			error: json.status !== 200 ? json.message : undefined,
// 		};
// 	} catch (error) {
// 		return { success: false, data: null as any, error };
// 	}
// }
