'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
	useEffect(() => {
		// @ts-expect-error: No types for bootstrap
		import('bootstrap/dist/js/bootstrap.esm.js');
	}, []);

	return null;
}
