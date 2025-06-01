'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import { usePlayer } from '@/context/PlayerContext';
import { AnimatePresence, motion } from 'framer-motion';

interface Track {
	title: string;
	artist: string;
	slug: string;
	category: string;
	url: string;
	image: string;
}

const musicTracks: Track[] = [
	{
		title: 'Melancholy (Original Mix)',
		artist: 'JSM33T',
		slug: 'melancholy-original',
		category: 'originals',
		url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/original1.mp3`,
		image: '/assets/images/music_cover.jpg',
	},
	{
		title: 'Singularity',
		artist: 'JSM33T',
		slug: 'singularity-original',
		category: 'originals',
		url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/singularity.mp3`,
		image: '/assets/images/music_cover.jpg',
	},
	{
		title: 'Melancholy - DnB Remix',
		artist: 'JSM33T',
		slug: 'melancholy-dnb-remix',
		category: 'remixes',
		url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/remix1.mp3`,
		image: '/assets/images/music_cover.jpg',
	},
	{
		title: 'Bulleya - DnB Remix',
		artist: 'JSM33T',
		slug: 'bulleya-dnb-remix',
		category: 'remixes',
		url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/bulleya-dnb.mp3`,
		image: '/assets/images/music_cover.jpg',
	},
	{
		title: 'Dhadak (Teaser)',
		artist: 'JSM33T',
		slug: 'dhadak-teaser',
		category: 'teasers',
		url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/dhadak-teaser.mp3`,
		image: '/assets/images/music_cover.jpg',
	},
	{
		title: 'Bekhayali (Teaser)',
		artist: 'JSM33T',
		slug: 'bekhayali-teaser',
		category: 'teasers',
		url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/bekhayali-teaser.mp3`,
		image: '/assets/images/music_cover.jpg',
	},
	{
		title: 'Bulleya (Radio Edit)',
		artist: 'JSM33T',
		slug: 'bulleya-radio',
		category: 'radio cut',
		url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/bulleya-radio.mp3`,
		image: '/assets/images/music_cover.jpg',
	},
];

const hardcodedCategories = ['remixes', 'originals', 'teasers', 'sample packs'];

export default function NewAlbum() {
	const { play } = usePlayer();
	const [activeCategory, setActiveCategory] = useState('originals');

	const filteredTracks = musicTracks.filter(track => track.category === activeCategory);

	return (
		<>
			{/* <section className="bg-secondary bg-light position-relative pt-lg-4 pt-xl-5">
				<div className="container text-center text-white py-5">
					<h1 className="display-4">Music Library</h1>
					<p className="fs-lg bg-light">Explore remixes, originals, teasers & more</p>
					<div className="nav nav-pills justify-content-center gap-3 pt-4">
						{hardcodedCategories.map((key) => (
							<button
								key={key}
								className={`btn btn-sm rounded-pill px-4 py-2 ${activeCategory === key ? 'btn-primary' : 'btn-outline-light'}`}
								onClick={() => setActiveCategory(key)}
							>
								{key.charAt(0).toUpperCase() + key.slice(1)}
							</button>
						))}
					</div>
				</div>
			</section> */}

			<section className="bg-body-secondary bg-light position-relative pt-lg-4 pt-xl-5">
				<div className="container text-center py-5">
					<h1 className="display-4 text-body">Music Library</h1>
					<p className="fs-lg bg-body rounded-3 px-3 py-2">
						Explore remixes, originals, teasers & more
					</p>
					<div className="nav nav-pills justify-content-center gap-3 pt-4">
						{hardcodedCategories.map((key) => (
							<button
								key={key}
								className={`btn btn-sm rounded-pill px-4 py-2 fw-semibold shadow-sm ${activeCategory === key
									? "btn-primary"
									: "btn-outline-secondary"
									}`}
								onClick={() => setActiveCategory(key)}
							>
								{key.charAt(0).toUpperCase() + key.slice(1)}
							</button>
						))}
					</div>
				</div>
			</section>


			<section className="container py-5">
				<AnimatePresence mode="wait">
					{filteredTracks.length === 0 ? (
						<motion.div
							key="empty"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className="text-center text-muted"
						>
							No tracks available in this category.
						</motion.div>
					) : (
						<motion.div
							key={activeCategory}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
						>
							<Swiper
								modules={[Pagination]}
								spaceBetween={24}
								pagination={{ clickable: true }}
								slidesPerView={1}
								breakpoints={{ 560: { slidesPerView: 2 }, 960: { slidesPerView: 3 } }}
							>
								{/* {filteredTracks.map((track) => (
									<SwiperSlide key={track.slug}>
										<div className="card card-hover zoom-effect border-0 rounded-5 overflow-hidden">
											<span
												className="position-absolute top-0 start-0 w-100 h-100 z-1"
												style={{
													background: 'linear-gradient(180deg, rgba(18, 21, 25, 0.00) 35.56%, #121519 95.3%)',
												}}
											></span>
											<div className="position-absolute bottom-0 w-100 z-2 p-4">
												<div className="px-md-3">
													<h3 className="h4 text-white mb-1">{track.title}</h3>
													<p className="fs-sm text-white-50 mb-2">{track.artist}</p>
													<button className="btn btn-sm btn-light" onClick={() => play(track)}>
														▶ Play
													</button>
												</div>
											</div>
											<div className="zoom-effect-wrapper">
												<div className="zoom-effect-img">
													<Image
														src={track.image}
														alt={track.title}
														width={600}
														height={400}
														layout="responsive"
													/>
												</div>
											</div>
										</div>
									</SwiperSlide>
								))}
								 */}
								{filteredTracks.map((track, idx) => (
									<SwiperSlide key={track.slug}>
										<motion.div
											initial={{ opacity: 0, y: 30 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{
												duration: 0.5,
												delay: idx * 0.15,
											}}
											className="card card-hover zoom-effect border-0 rounded-5 overflow-hidden"
										>
											<span
												className="position-absolute top-0 start-0 w-100 h-100 z-1"
												style={{
													background: 'linear-gradient(180deg, rgba(18, 21, 25, 0.00) 35.56%, #121519 95.3%)',
												}}
											></span>
											<div className="position-absolute bottom-0 w-100 z-2 p-4">
												<div className="px-md-3">
													<h3 className="h4 text-white mb-1">{track.title}</h3>
													<p className="fs-sm text-white-50 mb-2">{track.artist}</p>
													<button className="btn btn-sm btn-light" onClick={() => play(track)}>
														▶ Play
													</button>
												</div>
											</div>
											<div className="zoom-effect-wrapper">
												<div className="zoom-effect-img">
													<Image
														src={track.image}
														alt={track.title}
														width={600}
														height={400}
														layout="responsive"
													/>
												</div>
											</div>
										</motion.div>
									</SwiperSlide>
								))}

								<div className="swiper-pagination position-relative bottom-0 pt-2 pt-md-3 mt-4"></div>
							</Swiper>
						</motion.div>
					)}
				</AnimatePresence>
			</section>
		</>
	);
}
