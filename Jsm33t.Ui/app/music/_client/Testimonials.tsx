// components/Testimonials.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

const testimonials = [
	{
		name: 'Nikhil Sahni',
		role: 'Electronic Music Producer / DJ',
		image: 'https://around.createx.studio/assets/img/landing/mobile-app-showcase/testimonials/01.png',
		bg: 'info',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis libero vitae sem ornare ornare...',
	},
	{
		name: 'Quantom Theory',
		role: 'Student',
		image: 'https://around.createx.studio/assets/img/landing/mobile-app-showcase/testimonials/02.png',
		bg: 'warning',
		text: 'Proin interdum purus non quam convallis, quis dignissim leo cursus. Praesent finibus elit nisl...',
	},
	{
		name: 'Asad Gujral',
		role: 'Student',
		image: 'https://around.createx.studio/assets/img/landing/mobile-app-showcase/testimonials/04.png',
		bg: 'primary',
		text: 'Viverra aliquam interdum mauris facilisi commodo euismod sit est. Et auctor diam a ac vitae...',
	},
];

export default function Testimonials() {
	return (
		<section className="container py-5 mb-1 mb-sm-2 my-lg-3 my-xl-4 my-xxl-5">
			<div className="row justify-content-center pt-2 pt-sm-4 pb-4 mb-2 mb-lg-3">
				<div className="col-lg-8 col-xl-7 col-xxl-6 text-center pt-2">
					<h2 className="h1 mb-1">Testimonials from students who recommend Around</h2>
				</div>
			</div>

			<Swiper
				modules={[Pagination]}
				spaceBetween={24}
				loop
				pagination={{ clickable: true }}
				slidesPerView={1}
				breakpoints={{ 800: { slidesPerView: 2 } }}
				className="pb-2 pb-sm-4 pt-5"
			>
				{testimonials.map((item, idx) => (
					<SwiperSlide key={idx} className="h-auto">
						<div className={`card border-0 bg-${item.bg} bg-opacity-10 h-100 text-center`}>
							<div className={`polygon-avatar bg-${item.bg} mx-auto translate-middle-y`}>
								<img src={item.image} alt={item.name} />
							</div>
							<div className="card-body pt-0 mt-n4">
								<p className="card-text fs-xl">{item.text}</p>
							</div>
							<div className="card-footer border-0 pt-0">
								<div className="h4 mb-1">{item.name}</div>
								<span>{item.role}</span>
							</div>
						</div>
					</SwiperSlide>
				))}
				<div className="swiper-pagination position-relative bottom-0 mt-2 mt-lg-3 pt-4"></div>
			</Swiper>
		</section>
	);
}
