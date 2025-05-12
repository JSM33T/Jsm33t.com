'use client';

import dynamic from 'next/dynamic';

const Demo = dynamic(() => import('../_client/Demo'), { ssr: false });
const ToastExample = dynamic(() => import('../_client/ToastExample'), { ssr: false });

export default function ClientOnlyDemo() {
	return (
		<>
			<Demo />
			<ToastExample />
		</>
	);
}
