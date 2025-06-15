'use client';

import { apiClient } from '@/lib/apiClient';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { modalRef } from '@/components/ui/ModalBox';
import { useState } from 'react';
import { RecoveryFormData } from '../types';

export default function RecoveryForm() {
	const { register, handleSubmit, formState: { errors } } = useForm<RecoveryFormData>();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: { email: string }) => {
		setIsLoading(true);
		try {
			const response = await apiClient.post('/auth/recover-request', { email: data.email });

			if (response.status === 200) {
				modalRef?.current?.open({
					title: 'Recovery Email Sent',
					description: 'Check your inbox for further instructions.',
				});
				setTimeout(() => window.location.replace('/account/login'), 100);
			} else {
				modalRef?.current?.open({
					title: 'Request Failed',
					description: response?.message || 'Could not send recovery email. Please try again later.',
					bodyList: response?.hints || [],
				});
			}
		} catch {
			modalRef?.current?.open({
				title: 'Network Error',
				description: 'Please check your connection and try again.',
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

						<h1>Account Recovery</h1>
						<p className="mb-4">Enter your credentials below to recover your account.</p>

						<form className="needs-validation" onSubmit={handleSubmit(onSubmit)} noValidate>
							<div className="mb-4 position-relative">
								<i className="ai-mail fs-lg position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
								<input
									className="form-control form-control-lg ps-5"
									type="email"
									{...register('email', { required: 'Email is required' })}
									placeholder="Email address"
									aria-label="Email address"
								/>
								{errors.email && (
									<small className="text-danger">{errors.email.message}</small>
								)}
							</div>

							<button className="btn btn-lg btn-primary w-100 mb-4" type="submit" disabled={isLoading}>
								{isLoading ? 'Loading...' : 'Recover Account'}
							</button>
						</form>

						<p className="nav w-100 fs-sm pt-5 mt-auto mb-0">
							<span className="text-body-secondary">Need help?</span>{' '}
							<Link href="/support">Contact Support</Link>
						</p>
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
