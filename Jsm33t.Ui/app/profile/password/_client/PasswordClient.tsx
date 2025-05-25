'use client';

import { useForm } from 'react-hook-form';

type FormData = {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
};

export default function PasswordEditSection() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<FormData>();

	const onSubmit = async (data: FormData) => {
		// call API to update password
		console.log(data);
	};

	return (
		<section className="card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
			<div className="card-body">
				<div className="d-flex align-items-center mt-sm-n1 pb-4 mb-0 mb-lg-1 mb-xl-3">
					<i className="ai-lock-closed text-primary lead pe-1 me-2"></i>
					<h2 className="h4 mb-0">Change Password</h2>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<div className="mb-4 position-relative">
						<i className="ai-lock-closed fs-lg position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
						<input
							type="password"
							className="form-control form-control-lg ps-5"
							placeholder="Current password"
							{...register('currentPassword', { required: 'Current password is required' })}
						/>
						{errors.currentPassword && (
							<small className="text-danger">{errors.currentPassword.message}</small>
						)}
					</div>

					<div className="mb-4 position-relative">
						<i className="ai-lock-closed fs-lg position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
						<input
							type="password"
							className="form-control form-control-lg ps-5"
							placeholder="New password"
							{...register('newPassword', {
								required: 'New password is required',
								minLength: { value: 6, message: 'Minimum 6 characters' },
							})}
						/>
						{errors.newPassword && (
							<small className="text-danger">{errors.newPassword.message}</small>
						)}
					</div>

					<div className="mb-4 position-relative">
						<i className="ai-lock-closed fs-lg position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
						<input
							type="password"
							className="form-control form-control-lg ps-5"
							placeholder="Confirm new password"
							{...register('confirmPassword', {
								required: 'Confirm password is required',
								validate: (value) =>
									value === watch('newPassword') || 'Passwords do not match',
							})}
						/>
						{errors.confirmPassword && (
							<small className="text-danger">{errors.confirmPassword.message}</small>
						)}
					</div>

					<button
						className="btn btn-lg btn-primary w-100 mb-4"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Updating...' : 'Update Password'}
					</button>
				</form>
			</div>
		</section>
	);
}
