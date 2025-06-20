'use client';

import { motion, Variants } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const pathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number = 0): any => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      delay: i * 0.3,
      ease: [0.42, 0, 0.58, 1], // Use cubic bezier instead of string
    },
  }),
};

export default function HomeTopSection() {
	const svgPaths = useRef([
		"M520 2725 c0 -3 0 -104 0 -225 0 -121 0 -224 0 -230 0 -6 84 -10 230 -10 l231 0 -3 -787 c-4 -900 0 -858 -87 -944 -71 -71 -168 -85 -263 -38 -43 22 -73 62 -104 138 l-23 56 -250 3 c-138 1 -251 -1 -251 -5 0 -5 11 -48 24 -98 47 -173 117 -297 228 -401 188 -175 476 -231 735 -142 132 45 199 87 281 173 103 108 159 228 187 400 12 75 15 262 15 1103 l0 1012 -475 0 c-261 0 -475 -2 -475 -5z",
		"M2305 2734 c-326 -53 -572 -272 -639 -571 -21 -92 -21 -270 0 -371 33 -164 134 -314 272 -405 79 -53 217 -116 397 -182 201 -74 271 -111 341 -180 74 -73 96 -129 96 -242 -1 -96 -31 -162 -107 -231 -73 -67 -154 -97 -260 -96 -102 1 -167 28 -229 94 -61 66 -88 121 -111 232 l-5 28 -256 0 -257 0 7 -60 c21 -187 95 -345 226 -484 176 -186 400 -275 664 -263 198 9 362 65 508 176 127 96 233 262 280 436 31 118 31 338 -1 450 -82 290 -258 442 -689 594 -95 34 -198 74 -230 90 -70 35 -146 115 -161 167 -14 52 -14 147 1 198 18 60 99 138 163 157 100 29 212 9 275 -48 54 -48 76 -86 97 -168 l19 -70 244 0 244 0 -3 49 c-8 132 -80 311 -171 423 -96 119 -250 219 -395 258 -60 16 -263 28 -320 19z",
		"M3447 2481 l-187 -269 2 -417 3 -417 160 233 160 234 3 -907 c1 -533 6 -908 11 -908 5 0 168 233 362 518 775 1134 880 1287 889 1290 7 2 10 -320 10 -912 l0 -916 250 0 250 0 0 1370 0 1370 -232 0 -233 0 -390 -560 c-214 -307 -393 -559 -397 -559 -5 -1 -8 251 -8 559 l0 560 -232 0 -233 -1 -188 -268z",
		"M5445 2727 c-3 -7 -4 -114 -3 -237 l3 -225 483 -3 482 -2 0 -330 0 -330 -272 -2 -273 -3 0 -235 0 -235 273 -3 272 -2 0 -320 c0 -249 -3 -320 -12 -320 -7 0 -220 0 -473 0 -253 0 -466 -4 -473 -8 -9 -7 -12 -61 -10 -238 l3 -229 738 -3 737 -2 -2 1367 -3 1368 -733 3 c-588 2 -734 0 -737 -11z",
		"M7002 2503 l3 -238 478 -3 477 -2 0 -330 0 -330 -267 -2 -268 -3 -3 -237 -2 -238 270 0 270 0 -2 -320 -3 -321 -475 -2 -475 -2 -3 -237 -2 -238 735 0 735 0 0 1370 0 1370 -735 0 -735 0 2 -237z",
		"M8557 2723 c-4 -3 -7 -618 -7 -1365 l0 -1358 255 0 255 0 0 1130 0 1130 253 2 252 3 3 233 2 232 -503 0 c-277 0 -507 -3 -510 -7z"

	]).current;

	return (
		<div>
			<section className="bg-primary bg-opacity-10 d-flex min-vh-100 overflow-hidden py-5">
				<div className="container d-flex justify-content-center py-md-4 py-xl-5">
					<div className="row align-items-center pt-5 mt-4">
						<div className="col-lg-6 mb-4 pb-3 d-flex justify-content-center">
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.8, ease: 'easeOut' }}
								className="position-relative"
								style={{ borderRadius: '2rem', maxWidth: '100%' }}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="220"
									height="400"
									viewBox="00 200 960 100"
									preserveAspectRatio="xMidYMid meet"
									style={{ marginLeft: 0 }}
								>
									<g transform="translate(0,275) scale(0.1,-0.1)" fill="none" stroke="currentColor" strokeWidth="40">
										{svgPaths.map((d, i) => (
											<motion.path
												key={i}
												d={d}
												variants={pathVariants}
												initial="hidden"
												animate="visible"
												custom={i}
											/>
										))}
									</g>
								</svg>
							</motion.div>
						</div>

						<div className="col-lg-6 text-center text-lg-start">
							<motion.h1
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
								className="display-3 pb-3 mb-4"
							>
								<span className="fw-light">Welcome to</span> my digital space
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5, duration: 0.6 }}
								className="lead"
							>
								Explore personal blogs, tech write-ups, original music, and visual stories crafted with intention.
							</motion.p>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7, duration: 0.6 }}
								className="d-sm-flex justify-content-center justify-content-lg-start pt-4"
							>
								<Link className="btn btn-lg btn-primary w-100 w-sm-auto mb-2 me-sm-2" href="/about">
									About Me
								</Link>
							</motion.div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
