'use client';

import Link from "next/link";

const services = [
	{
		title: 'Contact', 
		description: 'Reach out to us for any inquiries or support. We are here to help you.',
		link: '/about/contact'
	},
	{
		title: 'FAQs',
		description: 'Explore answers to common questions and get the information you need quickly.',
		link: '/about/faq'
	},
	{
		title: 'Attributes',
		description: 'Discover what sets us apart and learn more about our unique qualities.',
		link: '/about/attributes'
	},
	{
		title: 'Changelog',
		description: 'Historical updates',
		link: '/about/changelog'
	}
];


export default function AboutSections() {
	return (
		<section className="container pt-5 pb-xxl-3 mt-5">

			<div className="row">
			

				<div className="col-lg-8 offset-lg-2">
					<div className="row row-cols-1 row-cols-sm-2 g-4">
						{services.map((service, idx) => (
							<div className="col" key={idx}>
								<div className="card border-0 bg-secondary rounded-5 mb-4">
									<div className="card-body pb-3">
										<h3 className="h4">{service.title}</h3>
										<p className="mb-0">{service.description}</p>
									</div>
									<div className="card-footer border-0 pt-3 mb-3">
										<Link className="btn btn-icon btn-lg btn-outline-primary rounded-circle stretched-link" href={service.link} aria-label="Learn more">
											<i className="ai ai-arrow-right"></i>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
