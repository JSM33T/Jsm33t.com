'use client';

import Link from "next/link";

const services = [
	{
		title: 'Contact',
		description: 'Reach out to us for any inquiries or support. We’re here to help you with anything you need.',
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

export default function AboutSite() {
	return (
		<>
			<section className="container pt-2 pb-xxl-3">
				<div className="row mt-5 pt-sm-2 pt-lg-3 pt-xl-4 pb-2 mb-2  pt-xxl-5">
					<div className="col-md-10 col-lg-8 col-xl-7">
						<h2 className="pb-sm-2">About the space</h2>
						<p className="fs-lg mb-2 mb-sm-3 mb-lg-2">
							Built with friends and collaborators, not just by me.
							Everything here is shaped by real feedback, open ideas, and teamwork — from tools and blogs to FAQs and changelogs.
							It’s transparent, evolving, and always open to new contributions.
						</p>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12">
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
		</>
	);
}
