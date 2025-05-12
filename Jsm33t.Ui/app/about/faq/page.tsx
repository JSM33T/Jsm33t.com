import Accordion from '@/components/sections/Accordion';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import { Crumb } from '@/types/common';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FAQs',
	description: 'Get in touch with our support or sales team.',
};

const breadcrumbs: Crumb[] = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'FAQs' },
];

const faqs = [
	{ question: 'When is it going to be live?', answer: 'Planned to build it progressively, will be up with its first version till sept' },
	{ question: 'Can we have an account here?', answer: 'Yes, logins via Email will be up till next month followed by goole,fb, ms and other logins' },
];

const supportMail = 'mail@jsm33t.com';

export default function AboutPage() {
	return (
		<>
			<section className="container pt-5 pb-lg-2 pb-xl-4 py-xxl-5 my-5">
				<Breadcrumbs items={breadcrumbs} />

				<div className="row pb-1 pb-sm-3 pb-lg-4">
					<div className="col-lg-4 pe-xxl-4">
						<h1 className="display-2" data-aos="flip-up" data-aos-duration="200">FAQs</h1>
						<p className="fs-lg pb-4 mb-0 mb-sm-2" data-aos="flip-up" data-aos-duration="500">
							Got suggestions, ideas? Ping me up with this form or mail me at{' '}
							<a href={`mailto:${supportMail}`} className="text-primary">{supportMail}</a>
						</p>
					</div>
					<div className="col-lg-8 col-xl-7 offset-xl-1">
						<div className="row g-4">
							<Accordion faqs={faqs} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
