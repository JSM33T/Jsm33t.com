"use client";
// import GoogleLoginButton from "@/app/_client/GoogleAuth";

import ThemeSwitcher from "@/components/helpers/ThemeSwitcher";
import Jsm33tLogo from "@/components/svg/Jsm33tLogo";
import { useUser } from "@/context/UserContext";
import { showBootstrapModal } from "@/components/helpers/ShowBootstrapModal";

import Link from "next/link";
import { useEffect } from "react";


const UserMenuItems = ({ badgeClass = "ms-auto" }: { badgeClass?: string }) => {
	const { user } = useUser();
	const isLoggedIn = !!user?.email;

	return (
		<>
			<h6 className="dropdown-header fs-xs fw-medium text-body-secondary text-uppercase pb-1">Account</h6>

			{isLoggedIn ? (
				<>
					<Link className="dropdown-item" href="/profile">
						<i className="ai-settings fs-lg opacity-70 me-2"></i>Profile
					</Link>
					<div className="dropdown-divider"></div>
					<a className="dropdown-item" href="#" onClick={(e) => {
						e.preventDefault();
						showBootstrapModal({
							title: 'Confirm Logout',
							body: 'Are you sure you want to log out?',
							confirmText: 'Logout',
							onConfirm: () => {
								localStorage.removeItem('authToken');
								window.location.href = '/';
							}
						});
					}}>
						<i className="ai-logout fs-lg opacity-70 me-2"></i>Sign out
					</a>
				</>
			) : (
				<Link className="dropdown-item" href="/account">
					<i className="ai-user-check fs-lg opacity-70 me-2"></i>Login / SignUp
				</Link>
			)}

		</>
	);
};

const Navbar = () => {

	const { user } = useUser();
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
					<div className="dropdown nav d-none d-sm-block order-lg-3">
						<a className="nav-link d-flex align-items-center p-0" href="#" data-bs-toggle="dropdown" aria-expanded="false">
							<img className="border rounded-circle" src={user.avatar} width="48" alt="Isabella Bocouse" />
							<div className="ps-2">
								<div className="fs-xs lh-1 opacity-60">{user.firstName},</div>
								<div className="fs-sm dropdown-toggle">{user.lastName}</div>
							</div>
						</a>
						<div className="dropdown-menu dropdown-menu-end my-1">
							<UserMenuItems />
						</div>
					</div>

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
								<Link className="nav-link" href="/blogs">Blogs</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/music">Music</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/about">About</Link>
							</li>
							<li className="nav-item dropdown d-sm-none border-top mt-2 pt-2">
								<a className="nav-link" href="#" data-bs-toggle="dropdown" aria-expanded="false">
									<img className="border rounded-circle" src={user.avatar} width="48" alt="Isabella Bocouse" />
									<div className="ps-2">
										<div className="fs-xs lh-1 opacity-60">{user.firstName}</div>
										<div className="fs-sm dropdown-toggle">{user.lastName}</div>
									</div>
								</a>
								<div className="dropdown-menu">
									<UserMenuItems badgeClass="ms-3" />
								</div>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};


export default Navbar;
