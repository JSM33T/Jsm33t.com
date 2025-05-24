import type { Metadata } from 'next';
import RecoveryForm from './_client/RecoveryForm';

export const metadata: Metadata = {
	title: 'Account Recoverey',
	description: 'Recovery your account in case you lost your password or username.'
};

export default function LoginPagee() {
	return (
		<>
			<RecoveryForm />
		</>
	);
}
