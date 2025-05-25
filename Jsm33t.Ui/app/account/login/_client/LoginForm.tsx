'use client';

import { useUser } from '@/context/UserContext';
import { apiClient, setAuthToken } from '@/lib/apiClient';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { modalRef } from '@/components/sections/ModalBox';
import { useState } from 'react';

interface LoginResponse {
	accessToken: string;
}

interface JwtPayload {
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	avatar: string;
}

interface FormData {
	email: string;
	password: string;
}

export default function LoginForm() {
	const { setUser } = useUser();
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: FormData) => {
		setIsLoading(true);
		try {
			const response = await apiClient.post<LoginResponse>('/auth/login', data);

			if (response.status === 200 && response.data?.accessToken) {
				const token = response.data.accessToken;
				localStorage.setItem('authToken', token);
				setAuthToken(token);

				const decoded = jwtDecode<JwtPayload>(token);
				setUser({
					firstName: decoded.firstName,
					lastName: decoded.lastName,
					email: decoded.email,
					username: decoded.username,
					avatar: decoded.avatar || '/assets/images/default_user.jpg',
				});

				modalRef?.current?.open({
					title: 'Login Successful',
					description: 'Redirecting...',
				});

				setTimeout(() => window.location.replace('/'), 100);
			} else {
				modalRef?.current?.open({
					title: 'Login Failed',
					description: response?.message || 'Something went wrong. Please try again.',
				});
			}
		} catch {
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
								/>
								{errors.email && (
									<small className="text-danger">{errors.email.message}</small>
								)}
							</div>

							<div className="mb-4 position-relative">
								<i className="ai-lock-closed fs-lg position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
								<input
									className="form-control form-control-lg ps-5"
									type="password"
									placeholder="Enter your password"
									{...register('password', { required: 'Password is required' })}
								/>
								{errors.password && (
									<small className="text-danger">{errors.password.message}</small>
								)}
							</div>

							<button className="btn btn-lg btn-primary w-100 mb-4" type="submit" disabled={isLoading}>
								{isLoading ? 'Loading...' : 'Sign in'}
							</button>
						</form>
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
