'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { modalRef } from '@/components/sections/ModalBox'; 

export default function SignupForm() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		userName: '',
		email: '',
		password: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	// const handleSubmit = async (e: FormEvent) => {
	// 	e.preventDefault();

	// 	const res = await apiClient.post('/auth/signup', formData);
	// 	if (res.status === 200) {
	// 		// Signup success – redirect to login
	// 		router.replace('/login');
	// 	}
	// };
	const handleSubmit = async (e: FormEvent) => {
	e.preventDefault();

	const res = await apiClient.post('/auth/signup', formData);

	if (res.status === 200) {
		modalRef?.current?.open({
			title: 'Account Created',
			description: res.message,
			bodyList: res.hints
		});

		setTimeout(() => router.replace('/login'), 2000);
	} else {
		modalRef?.current?.open({
			title: 'Signup Failed',
			description: res.message || 'Something went wrong while creating your account.',
			bodyList: res.hints
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
					<h1>Create your account</h1>
					<p className="pb-3 mb-3 mb-lg-4">
						Already have an account?&nbsp;&nbsp;
						<Link href="/account/login">Sign in here</Link>
					</p>

					<form className="needs-validation" noValidate onSubmit={handleSubmit}>
						<div className="row g-3 pb-3 mb-3">
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

						<div className="pb-3 mb-3">
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

						<div className="pb-3 mb-3">
							<input
								className="form-control form-control-lg"
								type="email"
								name="email"
								placeholder="Email address"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-4">
							<div className="password-toggle position-relative">
								<input
									className="form-control form-control-lg"
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

						<button className="btn btn-lg btn-primary w-100 mb-4" type="submit">
							Sign up
						</button>

						<p className="nav w-100 fs-sm pt-5 mt-auto mb-5" style={{ maxWidth: 526 }}>
							<span className="text-body-secondary">&copy; All rights reserved. Made by</span>
							<a className="nav-link d-inline-block p-0 ms-1" href="https://createx.studio/" target="_blank" rel="noopener">
								Createx Studio
							</a>
						</p>
					</form>
				</div>
			</div>

			<div
				className="w-50 bg-size-cover bg-repeat-0 bg-position-center"
				style={{ backgroundImage: 'url(/assets/images/accountcover.jpg)' }}
			></div>
		</div>
	);
}
