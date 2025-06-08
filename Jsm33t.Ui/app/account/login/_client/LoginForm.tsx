'use client';

import { useUser } from '@/context/UserContext';
import { apiClient, setAuthToken } from '@/lib/apiClient';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { modalRef } from '@/components/ui/ModalBox';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginComponent from '@/components/ui/GoogleLoginComponent';
import { jwtDecode, JwtPayload } from 'jwt-decode';

// --- Types ---

interface LoginResponse {
	accessToken: string;
}
interface GoogleProfile {
	email: string;
	name: string;
	sub: string; // Google user id
	picture: string;
	[key: string]: unknown;
}
interface AppJwtPayload extends JwtPayload {
	firstName?: string;
	lastName?: string;
	email?: string;
	username?: string;
	avatar?: string;
	[claim: string]: unknown;
}
interface FormData {
	email: string;
	password: string;
}
interface UserType {
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	avatar: string;
}

// --- Main Component ---

export default function LoginForm() {
	const { setUser } = useUser();
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
	const [isLoading, setIsLoading] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			try {
				const parsed: UserType = JSON.parse(storedUser);
				setUser(parsed);
			} catch {
				// Invalid user in storage, ignore
			}
		}
	}, [setUser]);

	// --- Google login handler ---
	const handleGoogleLogin = async (profile: GoogleProfile): Promise<void> => {
		setIsLoading(true);
		try {
			const response = await apiClient.post<LoginResponse>('/auth/google', {
				email: profile.email,
				name: profile.name,
				googleId: profile.sub,
				avatar: profile.picture,
			});
			if (response.status === 200 && response.data?.accessToken) {
				const token = response.data.accessToken;
				localStorage.setItem('authToken', token);
				setAuthToken(token);

				const decoded = jwtDecode<AppJwtPayload>(token);

				const user: UserType = {
					firstName: (decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"] as string)
						|| decoded.firstName
						|| "",
					lastName: (decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"] as string)
						|| decoded.lastName
						|| "",
					email: (decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] as string)
						|| decoded.email
						|| "",
					username: (decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] as string)
						|| decoded.username
						|| "",
					avatar: (typeof decoded.avatar === "string" && decoded.avatar.trim())
						? decoded.avatar
						: '/assets/images/default_user.jpg',
				};
				setUser(user);
				localStorage.setItem("user", JSON.stringify(user));
				modalRef?.current?.open({ title: 'Login Successful', description: 'Redirecting...' });
				setTimeout(() => window.location.replace('/'), 100);
			} else {
				modalRef?.current?.open({
					title: 'Login Failed',
					description: (response as any)?.message || 'Something went wrong. Please try again.',
				});
			}
		} catch (err: unknown) {
			modalRef?.current?.open({
				title: 'Network Error',
				description: 'Check your internet connection and try again.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	// --- Email/password handler ---
	const onSubmit = async (data: FormData): Promise<void> => {
		setIsLoading(true);
		try {
			const response = await apiClient.post<LoginResponse>('/auth/login', data);

			if (response.status === 200 && response.data?.accessToken) {
				const token = response.data.accessToken;
				localStorage.setItem('authToken', token);
				setAuthToken(token);

				const decoded = jwtDecode<AppJwtPayload>(token);

				const user: UserType = {
					firstName: (decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"] as string)
						|| decoded.firstName
						|| "",
					lastName: (decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"] as string)
						|| decoded.lastName
						|| "",
					email: (decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] as string)
						|| decoded.email
						|| "",
					username: (decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] as string)
						|| decoded.username
						|| "",
					avatar: (typeof decoded.avatar === "string" && decoded.avatar.trim())
						? decoded.avatar
						: '/assets/images/default_user.jpg',
				};

				setUser(user);
				localStorage.setItem("user", JSON.stringify(user));

				modalRef?.current?.open({
					title: 'Login Successful',
					description: 'Redirecting...',
				});
				setTimeout(() => window.location.replace('/'), 100);
			} else {
				modalRef?.current?.open({
					title: 'Login Failed',
					description: (response as any)?.message || 'Something went wrong. Please try again.',
				});
			}
		} catch (err: unknown) {
			modalRef?.current?.open({
				title: 'Network Error',
				description: 'Check your internet connection and try again.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="container-fluid min-vh-100 d-flex p-0">
			<div className="row flex-grow-1 w-100 g-0">
				<div className="col-lg-6 d-flex align-items-center justify-content-center bg-light p-4 p-lg-5">
					<div className="w-100" style={{ maxWidth: '526px' }}>
						<Link
							className="btn btn-icon bg-light border rounded-circle position-absolute top-0 end-0 mt-3 me-3"
							href="/"
							aria-label="Back to home"
						>
							<i className="ai-home"></i>
						</Link>

						<h1 className="mb-3">Sign in to Around</h1>
						<p className="mb-4">
							Don&apos;t have an account yet? <Link href="/account/signup">Signup!</Link>
						</p>

						<form onSubmit={handleSubmit(onSubmit)} noValidate>
							<div className="mb-4 position-relative">
								<i className="ai-mail fs-lg position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
								<input
									className="form-control form-control-lg ps-5"
									type="email"
									placeholder="Email address"
									{...register('email', { required: 'Email is required' })}
									autoComplete="email"
								/>
								{errors.email && (
									<small className="text-danger">{errors.email.message}</small>
								)}
							</div>

							<div className="mb-4 position-relative">
								<i className="ai-lock-closed fs-lg position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
								<input
									className="form-control form-control-lg ps-5 pe-5"
									type={isPasswordVisible ? 'text' : 'password'}
									placeholder="Enter your password"
									{...register('password', { required: 'Password is required' })}
									autoComplete="current-password"
								/>
								<button
									type="button"
									className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y me-3"
									tabIndex={-1}
									style={{ textDecoration: 'none' }}
									onClick={() => setIsPasswordVisible((v) => !v)}
								>
									{isPasswordVisible ? (
										<i className="ai-eye-off"></i>
									) : (
										<i className="ai-eye"></i>
									)}
								</button>
								{errors.password && (
									<small className="text-danger">{errors.password.message}</small>
								)}
							</div>

							<button className="btn btn-lg btn-primary w-100 mb-4" type="submit" disabled={isLoading}>
								{isLoading ? 'Loading...' : 'Sign in'}
							</button>
						</form>
						{/* Google login section */}
						<div className="text-center mt-3">
							<span className="text-muted">or</span>
							<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
								<div className="mt-3 d-flex justify-content-center">
									<GoogleLoginComponent onLogin={handleGoogleLogin} />
								</div>
							</GoogleOAuthProvider>
						</div>
					</div>
				</div>
				<div
					className="col-lg-6 d-none d-lg-block bg-size-cover bg-position-center"
					style={{ backgroundImage: 'url(/assets/images/accountcover.jpg)' }}
				></div>
			</div>
		</section>
	);
}
