'use client';

import { useUser } from '@/context/UserContext';
import { apiClient, setAuthToken } from '@/lib/apiClient';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useState, ChangeEvent, FormEvent } from 'react';
import { modalRef } from '@/components/sections/ModalBox';

interface LoginResponse {
	accessToken: string;
}

interface JwtPayload {
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	avatar: string;
	// plus whatever else your token contains
}

export default function LoginForm() {

	const [formData, setFormData] = useState({ email: '', password: '' });
	const { setUser } = useUser();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const response = await apiClient.post<LoginResponse>('/auth/login', formData);

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
				title: 'Logged in successfully',
				description: 'Logged in redirecting.',
				bodyList: []
			});

			setTimeout(() => {
				window.location.replace('/');
			}, 100);
		} else {
			modalRef?.current?.open({
				title: "Error",
				description: response.message,
				bodyList: response.hints
			});
		}
	};

	return (
		<div className="d-lg-flex position-relative h-100">
			<Link
				className="text-nav btn btn-icon bg-light border rounded-circle position-absolute top-0 end-0 p-0 mt-3 me-3 mt-sm-4 me-sm-4"
				href="/"
				data-bs-toggle="tooltip"
				data-bs-placement="left"
				title="Back to home"
				aria-label="Back to home"
			>
				<i className="ai-home"></i>
			</Link>

			<div className="d-flex flex-column align-items-center w-lg-50 h-100 px-3 px-lg-5 pt-5">
				<div className="w-100 mt-auto" style={{ maxWidth: 526 }}>
					<h1>Sign in to Around</h1>
					<p className="pb-3 mb-3 mb-lg-4">
						Don&apos;t have an account yet?&nbsp;&nbsp;
						<Link href="/account/signup">Signup!</Link>
					</p>
					<form className="needs-validation" noValidate onSubmit={handleSubmit}>
						<div className="pb-3 mb-3">
							<div className="position-relative">
								<i className="ai-mail fs-lg position-absolute top-50 start-0 translate-middle-y ms-3"></i>
								<input
									className="form-control form-control-lg ps-5"
									type="email"
									name="email"
									placeholder="Email address"
									value={formData.email}
									onChange={handleChange}
									required
								/>
							</div>
						</div>
						<div className="mb-4">
							<div className="position-relative">
								<i className="ai-lock-closed fs-lg position-absolute top-50 start-0 translate-middle-y ms-3"></i>
								<div className="password-toggle">
									<input
										className="form-control form-control-lg ps-5"
										type="password"
										name="password"
										placeholder="Password"
										value={formData.password}
										onChange={handleChange}
										required
									/>
									<label className="password-toggle-btn" aria-label="Show/hide password">
										<input className="password-toggle-check" type="checkbox" />
										<span className="password-toggle-indicator"></span>
									</label>
								</div>
							</div>
						</div>
						<div className="d-flex flex-wrap align-items-center justify-content-between pb-4">
							<div className="form-check my-1">
								<input className="form-check-input" type="checkbox" id="keep-signedin" />
								<label className="form-check-label ms-1" htmlFor="keep-signedin">
									Keep me signed in
								</label>
							</div>
							<a
								className="fs-sm fw-semibold text-decoration-none my-1"
								href="/recover"
							>
								Forgot password?
							</a>
						</div>
						<button className="btn btn-lg btn-primary w-100 mb-4" type="submit">
							Sign in
						</button>

						<h2 className="h6 text-center pt-3 pt-lg-4 mb-4">
							Or sign in with your social account
						</h2>
						<div className="row row-cols-1 row-cols-sm-2 gy-3">
							<div className="col">
								<a
									className="btn btn-icon btn-outline-secondary btn-google btn-lg w-100"
									href="#"
								>
									<i className="ai-google fs-xl me-2"></i>
									Google
								</a>
							</div>
							<div className="col">
								<a
									className="btn btn-icon btn-outline-secondary btn-facebook btn-lg w-100"
									href="#"
								>
									<i className="ai-facebook fs-xl me-2"></i>
									Facebook
								</a>
							</div>
						</div>
					</form>
					<p className="nav w-100 fs-sm pt-5 mt-auto mb-5" style={{ maxWidth: 526 }}>
						<span className="text-body-secondary">&copy; Made with Love by</span>
						<a
							className="nav-link d-inline-block p-0 ms-1"
							href="https://jassi.me/"
							target="_blank"
							rel="noopener"
						>
							@jsm33t
						</a>
					</p>
				</div>
			</div>

			<div
				className="w-50 bg-size-cover bg-repeat-0 bg-position-center"
				style={{ backgroundImage: 'url(/assets/images/accountcover.jpg)' }}
			></div>
		</div>
	);
}