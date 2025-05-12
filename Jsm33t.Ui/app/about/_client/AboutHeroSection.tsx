'use client';

import { motion } from 'framer-motion';

export default function AboutHeroSection() {
	return (
		<section className="container pt-5 mt-4 mt-sm-3 mt-xl-4 pb-4 mb-4 h-m-100">
			<div className="row align-items-center pt-4 mt-xl-2">
				<div className="col-md-6 col-xl-5 mb-4 mb-md-0">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						className="ratio ratio-1x1 d-flex align-items-center position-relative rounded-circle overflow-hidden bg-size-cover mx-auto"
						style={{
							maxWidth: '530px',
							backgroundImage: 'url(/assets/images/about_hero.jpg)',
							backgroundSize: 'cover',
							backgroundColor: '#111',
						}}
					>
						<div className="bg-black position-absolute top-0 start-0 w-100 h-100 opacity-0" />
						<div className="position-relative z-2 p-4" data-bs-theme="dark">
							<div className="text-center mx-auto" style={{ maxWidth: '275px' }}>
								<span className="d-block text-body fs-sm text-uppercase mb-3">About Me</span>
							</div>
						</div>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					className="col-md-6 col-xl-5 offset-xl-1"
				>
					<div className="fs-sm text-uppercase mb-3 text-muted">About me</div>
					<h2 className="display-6 fw-semibold mb-4">Hey, I’m Jassi 👋</h2>
					<p className="fs-xl">
						Hi hi 👋 I’m Jasmeet (friends call me whatever sticks). 
						I’ve had my hands on a keyboard since childhood — breaking things, building them back, and falling in love with how tech works. 
						Now, I’m a full-time software engineer who designs systems and loves exploring new tools, patterns, and ideas. 
						I used to be into music too — dropped some bootlegs that made it to national radio and even composed two original orchestral pieces. 
						These days, I just vibe with sound when it calls.
					</p>

					<p className="fs-xl mb-0">
						This space? It’s my cozy digital sketchbook — a mix of code, concepts, quiet projects, and curiosities. Feel free to explore, drop a note, or just hang out 🌿
					</p>
				</motion.div>
			</div>
		</section>
	);
}
