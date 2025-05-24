"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/apiClient';
import { modalRef } from '@/components/sections/ModalBox';

export default function VerifyEmailPage() {
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	useEffect(() => {
		const verify = async () => {
			try {
				const response = await apiClient.get(`/auth/verify-email?token=${token}`);
				if (response.status === 200) {
					setStatus('success');
					modalRef?.current?.open({
						title: 'Email Verified',
						description: 'Your email has been successfully verified.',
						bodyList: [],
					});
				} else {
					throw new Error();
				}
			} catch {
				setStatus('error');
				modalRef?.current?.open({
					title: 'Invalid or Expired Token',
					description: 'Please try again or request a new verification email.',
					bodyList: [],
				});
			}
		};

		if (token) verify();
		else setStatus('error');
	}, [token]);

	return (
		<section className='container pt-5 mt-5'>
			<div className="d-flex flex-column align-items-center justify-content-center h-screen text-center px-4">
				{status === 'loading' && <p className="text-lg text-muted">Verifying...</p>}

				{status === 'success' && (
					<>
						<h1 className="text-3xl font-bold text-primary mb-2">Email Verified!</h1>
						<p className="mb-4">You can now log in with your verified account.</p>
						<Link href="/account/login" className="btn btn-primary">
							Go to Login
						</Link>
					</>
				)}

				{status === 'error' && (
					<>
						<h1 className="text-3xl font-bold text-danger mb-2">Verification Failed</h1>
						<p className="mb-4">The token is invalid or expired.</p>
						<Link href="/" className="btn btn-outline-secondary">
							Back to Home
						</Link>
					</>
				)}
			</div>
		</section>
	);
}
