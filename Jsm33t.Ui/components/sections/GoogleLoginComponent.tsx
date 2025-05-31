import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export interface GoogleProfile {
	email: string;
	name: string;
	sub: string;       // Google user id
	picture: string;
	[key: string]: unknown;
}

interface GoogleLoginComponentProps {
	onLogin: (profile: GoogleProfile) => void | Promise<void>;
}

export default function GoogleLoginComponent({ onLogin }: GoogleLoginComponentProps) {
	return (
		<GoogleLogin
			onSuccess={(credentialResponse: CredentialResponse) => {
				if (credentialResponse.credential) {
					const decoded = jwtDecode<GoogleProfile>(credentialResponse.credential);
					onLogin(decoded);
				} else {
					alert('Google Login Failed: No credential found.');
				}
			}}
			onError={() => {
				alert('Google Login Failed');
			}}
		/>
	);
}
