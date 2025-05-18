'use client';

import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function VideoSection() {
	return (
		<section className="position-relative py-5">
			<span
				className="position-absolute top-0 start-0 w-100 h-100 d-dark-mode-none"
				style={{ background: 'linear-gradient(360deg, #fff 5.39%, #f6f9fc 78.66%)' }}
			></span>
			<span
				className="position-absolute top-0 start-0 w-100 h-100 d-none d-dark-mode-block"
				style={{ background: 'linear-gradient(360deg, #121519 5.39%, rgba(255, 255, 255, 0.03) 78.66%)' }}
			></span>

			<div className="container position-relative z-2 py-2 py-sm-3 py-sm-4 py-md-5">
				<div className="row align-items-center py-lg-2 py-xl-3 my-xl-1 my-xxl-3">
					<div className="col-md-5 col-xl-4">
						<h2 className="h1 pb-2 pb-sm-3 mb-md-0">
							Learn <span className="text-gradient-primary">how Around works</span> in a nutshell. Watch a short introductory video
						</h2>
					</div>

					<div className="col-md-7 offset-xl-1">
						<div className="position-relative">
							<div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-5">
								<a
									href="https://www.youtube.com/watch?v=mTWvfrzzgTI"
									className="btn btn-icon btn-xl btn-primary rounded-circle stretched-link"
									target='_blank'
									aria-label="Play video"
								>
									<i className="ai-play-filled"></i>
								</a>
							</div>
							<Image
								src="https://around.createx.studio/assets/img/landing/saas-4/video-cover-light.jpg"
								alt="Video cover"
								className="d-dark-mode-none rounded-3"
								width={960}
								height={540}
								layout="responsive"
							/>
							<Image
								src="/assets/img/landing/saas-4/video-cover-dark.png"
								alt="Video cover"
								className="d-none d-dark-mode-block rounded-3"
								width={960}
								height={540}
								layout="responsive"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
