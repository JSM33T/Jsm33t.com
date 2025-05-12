'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';


export default function RouteProgress() {
	const pathname = usePathname();

	useEffect(() => {

		const timeout = setTimeout(() => {
		}, 300); // minor delay for smoother effect

		return () => clearTimeout(timeout);
	}, [pathname]);

	return null;
}
