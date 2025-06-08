'use client';

import ToastBox, { ToastBoxRef } from '@/components/ui/ToastBox';
import { useRef } from 'react';


export default function ToastExample() {
	const toastRef = useRef<ToastBoxRef>(null);

	const handleToast = () => {
		toastRef.current?.show({
			title: 'Around',
			message: 'This is a toast from React',
			timestamp: 'a few seconds ago',
			color: 'success' // or 'danger', 'warning', etc.
		});
	};

	return (
		<>
			<button onClick={handleToast} className="btn btn-outline-primary btn-sm">
				Show Toast
			</button>
			<ToastBox ref={toastRef} />
		</>
	);
}
