// import Image from "next/image";

// export default function AboutTheSpace() {
// 	return (
// 		<>
// 			{/* Social networks */}
// 			<section className="container pt-2">
// 				<div className="row mt-5 pt-sm-2 pt-lg-3 pt-xl-4 pt-xxl-5">
// 					<div className="col-md-10 col-lg-8 col-xl-7">
// 						<h2 className="pb-sm-2">About Me</h2>
// 						<p className="fs-lg mb-2 mb-sm-3 mb-lg-2">
// 							Here you’ll find a mix of everything I love to build and share — from logs, blogs, and micro-tutorials to case studies, bootlegs/remixes, and custom sample packs. I also release AI-based utilities, both free and paid, alongside practical tools, code samples, and hands-on guides for real-world system design.
// 							Expect a blend of technical deep-dives, bite-sized walkthroughs, and creative experiments — basically, anything that makes tech easier, smarter, or just more fun.
// 						</p>
// 					</div>
// 				</div>
// 				<div className="row row-cols-1 row-cols-sm-2 pt-4 pt-lg-5">
// 					<div className="col mb-4 mb-sm-0">
// 						<div className="d-flex align-items-center justify-content-center bg-secondary h-100 rounded-5 p-4 p-xl-5">
// 							<Image
// 								className="d-block rounded-4 my-2"
// 								src="/assets/img/portfolio/single/v1/02.jpg"
// 								width={367}
// 								height={250}
// 								alt="Social Image 1"
// 							/>
// 						</div>
// 					</div>
// 					<div className="col">
// 						<div className="d-flex align-items-end justify-content-center bg-secondary h-100 rounded-5 px-4 px-xl-5">
// 							<Image
// 								className="d-block rounded-4 rounded-bottom-0 mt-4"
// 								src="/assets/img/portfolio/single/v1/03.jpg"
// 								width={524}
// 								height={300}
// 								alt="Social Image 2"
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 			</section>
// 		</>
// 	);
// }


'use client';

import { motion } from 'framer-motion';
import Image from "next/image";

export default function AboutTheSpace() {
	return (
		<>
			<section className="container pt-2">
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 1 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					className="row mt-5 pt-sm-2 pt-lg-3 pt-xl-4 pt-xxl-5"
				>
					<div className="col-md-10 col-lg-8 col-xl-7">
						<motion.h2
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="pb-sm-2"
						>
							About Me
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.2 }}
							className="fs-lg mb-2 mb-sm-3 mb-lg-2"
						>
							Here you’ll find a mix of everything I love to build and share — from logs, blogs, and micro-tutorials to case studies, bootlegs/remixes, and custom sample packs. I also release AI-based utilities, both free and paid, alongside practical tools, code samples, and hands-on guides for real-world system design.
							Expect a blend of technical deep-dives, bite-sized walkthroughs, and creative experiments — basically, anything that makes tech easier, smarter, or just more fun.
						</motion.p>
					</div>
				</motion.div>
				<div className="row row-cols-1 row-cols-sm-2 pt-4 pt-lg-5">
					<motion.div
						initial={{ opacity: 0, scale: 0.93 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.7, ease: 'backOut' }}
						className="col mb-4 mb-sm-0"
					>
						<div className="d-flex align-items-center justify-content-center bg-secondary h-100 rounded-5 p-4 p-xl-5">
							<Image
								className="d-block rounded-4 my-2"
								src="/assets/img/portfolio/single/v1/02.jpg"
								width={367}
								height={250}
								alt="Social Image 1"
							/>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, scale: 0.93 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.7, ease: 'backOut', delay: 0.15 }}
						className="col"
					>
						<div className="d-flex align-items-end justify-content-center bg-secondary h-100 rounded-5 px-4 px-xl-5">
							<Image
								className="d-block rounded-4 rounded-bottom-0 mt-4"
								src="/assets/img/portfolio/single/v1/03.jpg"
								width={524}
								height={300}
								alt="Social Image 2"
							/>
						</div>
					</motion.div>
				</div>
			</section>
		</>
	);
}
