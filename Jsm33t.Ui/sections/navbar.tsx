"use client";
// import GoogleLoginButton from "@/app/_client/GoogleAuth";
import ThemeSwitcher from "@/components/helpers/ThemeSwitcher";
import Jsm33tLogo from "@/components/svg/Jsm33tLogo";

import Link from "next/link";
import { useEffect } from "react";

const Navbar = () => {
	useEffect(() => {
		// Dynamically import Collapse from bootstrap only on client
		const navbarCollapse = document.getElementById("navbarNav");

		const handler = async () => {
			const { Collapse } = await import("bootstrap");

			const links = document.querySelectorAll(".navbar-nav .nav-link");
			links.forEach((link) => {
				link.addEventListener("click", () => {
					if (navbarCollapse?.classList.contains("show")) {
						new Collapse(navbarCollapse).hide();
					}
				});
			});
		};

		handler();

		return () => {
			const links = document.querySelectorAll(".navbar-nav .nav-link");
			links.forEach((link) => {
				link.removeEventListener("click", () => { });
			});
		};
	}, []);
	return (
		<>
			<header className="navbar navbar-expand-lg fixed-top navbar-stuck">
				<div className="container">
					<Link className="navbar-brand pe-sm-3" href="/">
						<Jsm33tLogo />
					</Link>
					{/* <GoogleLoginButton /> */}

					<div
						className="form-check form-switch mode-switch order-lg-2 me-3 me-lg-4 ms-auto"
						data-bs-toggle="mode"
					>
						<ThemeSwitcher />
						<label
							className="form-check-label"
							htmlFor="theme-mode"
						>
							<i className="ai-sun fs-lg"></i>
						</label>
						<label
							className="form-check-label"
							htmlFor="theme-mode"
						>
							<i className="ai-moon fs-lg"></i>
						</label>
					</div>
					<button
						className="navbar-toggler ms-sm-3"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<nav className="collapse navbar-collapse" id="navbarNav">
						<ul
							className="navbar-nav navbar-nav-scroll me-auto"
							style={
								{
									"--ar-scroll-height": "520px",
								} as React.CSSProperties
							}
						>
							<li className="nav-item">
								<Link className="nav-link" href="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/about">About</Link>
							</li>
							{/* <li className="nav-item">
								<Link className="nav-link" href="/contact">Contact</Link>
							</li>  */}
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Navbar;
