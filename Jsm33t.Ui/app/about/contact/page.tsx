import type { Metadata } from 'next';
import ContactForm from './_client/ContactForm';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import { Crumb } from '@/types/common';

const breadcrumbs: Crumb[] = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact' },
];

export const metadata: Metadata = {
	title: 'About',
	description: 'Get in touch with our support or sales team.',
};

export default function AboutPage() {
	return (
		<>
			<section className="bg-secondary py-5">
				<div className="container pt-5 pb-lg-5 pb-md-4 pb-2 my-5">
					<Breadcrumbs items={breadcrumbs} />
					<div className="row pb-1 pb-sm-3 pb-lg-4">
						<div className="col-lg-4 pe-xxl-4">
							<h1 className="display-2">Contact</h1>
							<p className="fs-lg pb-4 mb-0 mb-sm-2">Get in touch with us by completing the below form or call us now</p>
						</div>
						<div className="col-lg-8 col-xl-7 offset-xl-1">
							<ContactForm />
						</div>
					
					</div>

				</div>
			</section>
		</>
	);
}
