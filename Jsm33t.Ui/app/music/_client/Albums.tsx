/* app/components/AlbumFeatures.tsx */
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

const categoryData = [
	{
		title: 'Bootlegs',
		desc: 'Order processing, price suggestions, user research',
		image: 'https://around.createx.studio/assets/img/landing/saas-4/categories/ecommerce.jpg'
	},
	{
		title: 'Original Mixes',
		desc: 'Itinerary planning, freight pricing culculations, etc.',
		image: 'https://around.createx.studio/assets/img/landing/saas-4/categories/transportation.jpg'
	},
	{
		title: 'Features',
		desc: 'Market research, data visualization, user testing',
		image: 'https://around.createx.studio/assets/img/landing/saas-4/categories/marketing.jpg'
	},
	{
		title: 'SamplePacks',
		desc: 'Enhancing robot learning, improve robotic precision',
		image: 'https://around.createx.studio/assets/img/landing/saas-4/categories/robotics.jpg'
	}
];

export default function AlbumFeatures() {
	return (
		<>
			<section className="position-relative bg-dark pt-lg-4 pt-xl-5">
				<div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundImage: 'url(https://around.createx.studio/assets/img/landing/saas-4/hero-bg-pattern.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1 }}></div>
				<div className="container position-relative z-2 pt-2 pt-sm-4 pt-md-5">
					<div className="row justify-content-center pt-5">
						<div className="col-lg-9 col-xl-8 text-center pt-5 mt-1">
							<a href="#" className="d-inline-flex align-items-center fs-sm fw-semibold text-decoration-none bg-warning bg-opacity-10 text-warning rounded-pill py-2 px-3">
								<span className="fw-semibold lh-sm">New Around v2.0</span>
								<i className="ai-arrow-right fs-lg ms-2 me-n1"></i>
							</a>
							<h1 className="display-4 text-white pt-3 mt-3 mb-4">Music Production</h1>
							<p className="text-white opacity-70 fs-xl">From bootlegs to originals and beyond</p>
						</div>
					</div>
				</div>
				<div className="d-none d-lg-block" style={{ height: '480px' }}></div>
				<div className="d-lg-none" style={{ height: '400px' }}></div>
				<div className="d-flex position-absolute bottom-0 start-0 w-100 overflow-hidden mb-n1" style={{ color: 'var(--ar-body-bg)' }}>
					<div className="position-relative start-50 translate-middle-x flex-shrink-0" style={{ width: '3774px' }}>
						<svg width="3774" height="201" viewBox="0 0 3774 201" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 200.003C0 200.003 1137.52 0.188224 1873.5 0.000134392C2614.84 -0.189325 3774 200.003 3774 200.003H0Z" fill="currentColor"/></svg>
					</div>
				</div>
			</section>

			<section className="container position-relative z-3">
				<div className="d-none d-lg-block" style={{ marginTop: '-428px' }}></div>
				<div className="d-lg-none" style={{ marginTop: '-370px' }}></div>
				<Swiper
					modules={[Pagination]}
					spaceBetween={24}
					pagination={{ clickable: true }}
					slidesPerView={1}
					breakpoints={{
						560: { slidesPerView: 2 },
						960: { slidesPerView: 3 },
					}}
				>
					{categoryData.map((item, i) => (
						<SwiperSlide key={i}>
							<a href="#" className="card card-hover zoom-effect border-0 rounded-5 overflow-hidden">
								<span className="position-absolute top-0 start-0 w-100 h-100 z-1" style={{ background: 'linear-gradient(180deg, rgba(18, 21, 25, 0.00) 35.56%, #121519 95.3%)' }}></span>
								<div className="position-absolute bottom-0 w-100 z-2 p-4">
									<div className="px-md-3">
										<h3 className="h4 text-white mb-0">{item.title}</h3>
										<div className="d-flex align-items-center justify-content-between opacity-0">
											<span className="text-white fs-xs text-truncate opacity-70 pe-3">{item.desc}</span>
											<i className="ai-circle-arrow-right fs-3 text-primary"></i>
										</div>
									</div>
								</div>
								<div className="zoom-effect-wrapper">
									<div className="zoom-effect-img">
										<Image src={item.image} alt={item.title} width={600} height={400} layout="responsive" />
									</div>
								</div>
							</a>
						</SwiperSlide>
					))}
					<div className="swiper-pagination position-relative bottom-0 pt-2 pt-md-3 mt-4"></div>
				</Swiper>
			</section>
		</>
	);
}
