import Breadcrumbs from '@/components/sections/Breadcrumbs';
import { Crumb } from '@/types/common';
import type { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Attributes',
	description: 'Learn about who contributed to the space.',
};


const breadcrumbs: Crumb[] = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Attributes' },
];


export default function AboutPage() {
	return (
		<>
			<section className="container pt-5 pb-lg-2 pb-xl-4 py-xxl-5 my-5">
				<Breadcrumbs items={breadcrumbs} />

				<div className="row pb-1 pb-sm-3 pb-lg-4">
					<div className="col-lg-4 pe-xxl-4">
						<h1 className="display-2">Attributes</h1>
						<p className="fs-lg pb-4 mb-0 mb-sm-2" data-aos="flip-up" data-aos-duration="500">
                            Got suggestions, ideas? Ping me up with this form or mail me at mail@jsm33t.com
						</p>
					</div>
				</div>
			</section>
		</>
	);
}
