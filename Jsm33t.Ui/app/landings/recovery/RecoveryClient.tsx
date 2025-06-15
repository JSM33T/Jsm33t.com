'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiClient } from '@/lib/apiClient';
import { modalRef } from '@/components/ui/ModalBox';
import Link from 'next/link';

interface FormData {
	newPassword: string;
}

export default function RecoverCompletePage() {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

	const onSubmit = async (data: FormData) => {
		if (!token) return;

		setIsSubmitting(true);
		try {
			const response = await apiClient.post('/auth/recover-complete', {
				token,
				newPassword: data.newPassword,
			});

			if (response.status === 200) {
				setStatus('success');
				modalRef?.current?.open({
					title: 'Password Reset Successful',
					description: 'You can now log in with your new password.',
				});
			} else {
				throw new Error();
			}
		} catch {
			setStatus('error');
			modalRef?.current?.open({
				title: 'Reset Failed',
				description: 'Invalid token or request expired.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!token) {
		return (
			<section className="container text-center pt-5">
				<h1 className="text-2xl font-bold text-danger">Invalid or Missing Token</h1>
				<Link href="/" className="btn btn-outline-secondary mt-3">Back to Home</Link>
			</section>
		);
	}

	return (
		<section className="container pt-5 mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<h1 className="mb-4">Set New Password</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-3">
							<label htmlFor="newPassword" className="form-label">New Password</label>
							<input
								type="password"
								id="newPassword"
								className="form-control"
								{...register('newPassword', { required: 'Password is required' })}
								placeholder="Enter new password"
							/>
							{errors.newPassword && <small className="text-danger">{errors.newPassword.message}</small>}
						</div>

						<button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
							{isSubmitting ? 'Submitting...' : 'Reset Password'}
						</button>
					</form>

					{status === 'success' && (
						<div className="text-center mt-4">
							<Link href="/account/login" className="btn btn-success">Go to Login</Link>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
