import Link from "next/link";

const services = [
	{
		title: 'Login',
		description: 'Login to an existing account.',
		link: '/account/login'
	},
	{
		title: 'SignUp',
		description: 'Create Account',
		link: '/account/signup'
	},
	{
		title: 'Recover',
		description: 'Recover your account in case of lost password.',
		link: '/account/recovery'
	}
];

export default function AccountPage() {
	return (
		<section className="container pt-5 pb-xxl-3 mt-5">
			<div className="row">
				<div className="col-lg-4 pb-3 mb-3">
					<h2 className="h1">Account</h2>
					<p className="pe-5 mb-0">With the support of our result driven team you can solve many challenges.</p>
				</div>

				<div className="col-lg-8">
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
