import Link from "next/link";

const services = [
	{
		title: 'Overview',
		description: 'Login to an existing account.',
		link: '/profile/overview'
	},
	{
		title: 'Edit',
		description: 'Edit Profile Details',
		link: '/profile/edit'
	},
	{
		title: 'Password',
		description: 'Recover your account in case of lost password.',
		link: '/profile/password'
	},
	{
		title: 'Devices',
		description: 'Recover your account in case of lost password.',
		link: '/profile/devices'
	}
];


export default function ProfilePage() {
	return (
		<section className="container pt-5 pb-xxl-3 mt-5">
			<div className="row">
				<div className="col-lg-4 pb-3 mb-3">
					<h2 className="h1">Profile</h2>
					<p className="pe-5 mb-0">Your profile overview, update, security, devices </p>
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
