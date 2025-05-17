import type { Metadata } from 'next';
import LoginForm from './_client/LoginForm';

export const metadata: Metadata = {
	title: 'About',
	description: 'Get in touch with our support or sales team.',
};

export default function LoginPagee() {
	return (
		<>
            <LoginForm />
		</>
	);
}
