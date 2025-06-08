'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { modalRef } from '@/components/ui/ModalBox';

export default function SignupForm() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		userName: '',
		email: '',
		password: '',
	});
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [emailError, setEmailError] = useState<string | null>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));

		if (name === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			setEmailError(!emailRegex.test(value) ? 'Enter a valid email address.' : null);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			setEmailError('Enter a valid email address.');
			return;
		}
		setIsLoading(true);

		try {
			const res = await apiClient.post('/auth/signup', formData);
			if (res.status === 200) {
				modalRef?.current?.open({
					title: 'Account Created',
					description: res.message,
					bodyList: res.hints,
				});
				setTimeout(() => router.replace('/account/login'), 2000);
			} else {
				modalRef?.current?.open({
					title: 'Signup Failed',
					description: res.message || 'Something went wrong while creating your account.',
					bodyList: res.hints,
				});
			}
		} catch {
			modalRef?.current?.open({
				title: 'Error',
				description: 'An unexpected error occurred.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="container-fluid min-vh-100 d-flex p-0">
			<div className="row flex-grow-1 w-100 g-0">
				<div className="col-lg-6 d-flex align-items-center justify-content-center bg-light p-4 p-lg-5">
					<div className="w-100" style={{ maxWidth: 526 }}>
						<Link
							className="btn btn-icon bg-light border rounded-circle position-absolute top-0 end-0 mt-3 me-3"
							href="/"
							aria-label="Back to home"
						>
							<i className="ai-home"></i>
						</Link>

						<h1>Create your account</h1>
						<p className="mb-4">
							Already have an account? <Link href="/account/login">Sign in here</Link>
						</p>
						<p className="mb-4">
							Forgot password? <Link href="/account/recovery">Recover Account</Link>
						</p>

						<form className="needs-validation" noValidate onSubmit={handleSubmit}>
							<div className="row g-3 mb-3">
								<div className="col-sm-6">
									<input
										className="form-control form-control-lg"
										type="text"
										name="firstName"
										placeholder="First name"
										value={formData.firstName}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="col-sm-6">
									<input
										className="form-control form-control-lg"
										type="text"
										name="lastName"
										placeholder="Last name"
										value={formData.lastName}
										onChange={handleChange}
										required
									/>
								</div>
							</div>

							<div className="mb-3">
								<input
									className="form-control form-control-lg"
									type="text"
									name="userName"
									placeholder="Username"
									value={formData.userName}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="mb-3 position-relative">
								<input
									className="form-control form-control-lg"
									type="email"
									name="email"
									placeholder="Email address"
									value={formData.email}
									onChange={handleChange}
									required
								/>
								{emailError && (
									<small className="text-danger position-absolute mt-1">{emailError}</small>
								)}
							</div>

							{/* PASSWORD TOGGLE FIELD */}
							<div className="mb-4">
								<div className="position-relative">
									<i className="ai-lock-closed fs-lg position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
									<div className="password-toggle">
										<input
											className="form-control form-control-lg ps-5"
											type={isPasswordVisible ? 'text' : 'password'}
											name="password"
											placeholder="Password"
											value={formData.password}
											onChange={handleChange}
											required
										/>
										<label
											className="password-toggle-btn"
											aria-label="Show/hide password"
											style={{ cursor: 'pointer' }}
										>
											<input
												className="password-toggle-check"
												type="checkbox"
												checked={isPasswordVisible}
												onChange={() => setIsPasswordVisible((v) => !v)}
												tabIndex={-1}
												style={{ display: 'none' }}
											/>
											<span className="password-toggle-indicator"></span>
										</label>
									</div>
								</div>
							</div>

							<button className="btn btn-lg btn-primary w-100 mb-4" type="submit" disabled={isLoading}>
								{isLoading ? 'Loading...' : 'Sign up'}
							</button>

							<p className="nav w-100 fs-sm pt-5 mt-auto mb-0">
								<span className="text-body-secondary">&copy; All rights reserved. Made by</span>
								<a className="nav-link d-inline-block p-0 ms-1" href="https://createx.studio/" target="_blank" rel="noopener">
									Createx Studio
								</a>
							</p>
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
