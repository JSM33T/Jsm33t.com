'use client';

import { Toast } from 'bootstrap';
import { forwardRef, useImperativeHandle, useRef } from 'react';

type ShowToastParams = {
	title: string;
	message: string;
	timestamp?: string;
	color?: string;
};

export type ToastBoxRef = {
	show: (params: ShowToastParams) => void;
};

const ToastBox = forwardRef<ToastBoxRef>((_, ref) => {
	const toastRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);
	const timeRef = useRef<HTMLElement>(null);
	const dotRef = useRef<HTMLDivElement>(null);

	useImperativeHandle(ref, () => ({
		show: ({ title, message, timestamp = 'Just now', color = 'primary' }) => {
			if (!toastRef.current) return;

			if (titleRef.current) titleRef.current.textContent = title;
			if (bodyRef.current) bodyRef.current.textContent = message;
			if (timeRef.current) timeRef.current.textContent = timestamp;
			if (dotRef.current) {
				dotRef.current.className = `d-inline-block align-middle bg-${color} rounded-circle me-2`;
			}

			const toast = Toast.getInstance(toastRef.current) || new Toast(toastRef.current);
			toast.show();
		}
	}));

	return (
		<div
			className="toast position-fixed top-0 start-50 translate-middle shadow mt-4"
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
			data-bs-autohide="false"
			style={{ zIndex: 9999 }}
			ref={toastRef}
		>
			<div className="toast-header">
				<div ref={dotRef} style={{ width: '1.25rem', height: '1.25rem' }}></div>
				<h6 className="mb-0 me-auto" ref={titleRef}>Title</h6>
				<small className="fw-medium text-body-secondary" ref={timeRef}>Just now</small>
				<button type="button" className="btn-close ms-2" data-bs-dismiss="toast" aria-label="Close" />
			</div>
			<div className="toast-body" ref={bodyRef}>
				Message
			</div>
		</div>
	);
});
ToastBox.displayName = 'ToastBox';
export default ToastBox;
