import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PasswordEditSection from './_client/PasswordClient';

export const metadata: Metadata = {
	title: 'My Profile',
	description: 'Manage your personal information and account settings.',
};

const breadcrumbs = [
	{ label: 'Home', href: '/' },
	{ label: 'Profile', href: '/profile' },
	{ label: 'Overview' },
];

export default function ProfilePage() {
	return (
		<section className="container pt-5 pb-lg-2 pb-xl-4 py-xxl-5 my-5">
			<Breadcrumbs items={breadcrumbs} />

			<div className="row pb-1 pb-sm-3 pb-lg-4">
				<PasswordEditSection />

			</div>
		</section>
	);
}
