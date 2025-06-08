'use client';

import { useEffect } from 'react';
import { setAuthToken } from '@/lib/apiClient';
import { useUser } from '@/context/UserContext';
import { jwtDecode } from 'jwt-decode';

export default function ClientTokenProvider() {
	const { setUser } = useUser();

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			try {
				const decoded = jwtDecode<any>(token);
				const now = Math.floor(Date.now() / 1000);

				if (decoded.exp > now) {
					setAuthToken(token);

					const userObj = {
						firstName: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
						lastName: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'],
						email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
						username: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
						avatar: decoded['avatar'],
					};

					//console.log('[JWT USER]', userObj);
					setUser(userObj);
					//console.log("details set form the token");
				} else {
					localStorage.removeItem('authToken');
					//console.log("token removed")
				}
			} catch {
				console.warn('Invalid token in localStorage');
				console.log("invalid token")
			}
		}
	}, []);

	return null;
}
