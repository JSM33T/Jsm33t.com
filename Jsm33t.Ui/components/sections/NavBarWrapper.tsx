'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/sections/navbar';

export default function NavbarWrapper() {
	const pathname = usePathname();
	const hideNavbar = ['/account/signup', '/account/login'].includes(pathname);
	if (hideNavbar) return null;
	return <Navbar />;
}
