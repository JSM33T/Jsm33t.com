/* app/components/MapSection.tsx */
'use client';

import Image from 'next/image';
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function MapSection() {
	return (
		<section className="bg-dark py-5" data-bs-theme="dark">
			<div className="container pt-2 py-sm-3 py-md-4 py-lg-5 my-xxl-3">
				<div className="row pt-md-2 pt-lg-3 pt-xl-4 pb-lg-2 pb-xl-3">
					<div className="col-md-6">
						<h2 className="h1 pe-xxl-5 me-xl-4 mb-md-0">
							Our <span className="text-warning">data centers</span> spread all over the world. Get access to the API from anywhere
						</h2>
					</div>
					<div className="col-md-6 col-xl-5 offset-xl-1">
						<p className="text-body fs-xl mb-0">
							Our data centers are a key component of our global infrastructure, providing reliable and scalable computing
							resources to customers around the world. We offer a highly distributed and resilient platform that can support
							the most demanding workloads.
						</p>
					</div>
				</div>
				<div className="pt-5 mt-sm-2 mt-md-3 mt-lg-4 mt-xl-5">
					<Image
						src="https://around.createx.studio/assets/img/landing/saas-4/map.png"
						alt="Map"
						width={1200}
						height={600}
						layout="responsive"
					/>
				</div>
			</div>
		</section>

	);
}
