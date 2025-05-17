'use client';

import Link from 'next/link';

export default function BlogListWithSidebar() {
	return (


			<div className="row mb-md-2 mb-xl-4">
				{/* Blog Posts */}
				<div className="col-lg-9 pe-lg-4 pe-xl-5">
					<h1 className="pb-3 pb-lg-4">Blog list with sidebar</h1>

					{[...Array(5)].map((_, i) => (
						<article key={i} className={`row g-0 border-0 ${i !== 0 ? 'pt-3 pt-sm-0' : ''} mb-4`}>
							<Link
								href={`/blog/post-${i + 1}`}
								className="col-sm-5 bg-repeat-0 bg-size-cover bg-position-center rounded-5"
								style={{ backgroundImage: `url(/assets/img/blog/list/0${i + 1}.jpg)`, minHeight: '14rem' }}
								aria-label="Post image"
							/>
							<div className="col-sm-7">
								<div className="pt-4 pb-sm-4 ps-sm-4 pe-lg-4">
									<h3>
										<Link href={`/blog/post-${i + 1}`}>
											Post Title {i + 1}
										</Link>
									</h3>
									<p className="d-sm-none d-md-block">
										Sample summary of the blog post. You can replace this with real content later.
									</p>
									<div className="d-flex flex-wrap align-items-center mt-n2">
										<a className="nav-link text-body-secondary fs-sm fw-normal p-0 mt-2 me-3" href="#">
											{5 + i}
											<i className="ai-share fs-lg ms-1"></i>
										</a>
										<a className="nav-link text-body-secondary fs-sm fw-normal d-flex align-items-end p-0 mt-2" href="#">
											{2 + i}
											<i className="ai-message fs-lg ms-1"></i>
										</a>
										<span className="fs-xs opacity-20 mt-2 mx-3">|</span>
										<span className="fs-sm text-body-secondary mt-2">May {10 + i}, 2024</span>
										<span className="fs-xs opacity-20 mt-2 mx-3">|</span>
										<a className="badge text-nav fs-xs border mt-2" href="#">Category</a>
									</div>
								</div>
							</div>
						</article>
					))}

					{/* Pagination */}
					<div className="row gy-3 align-items-center mt-lg-5 pt-2 pt-md-4 pt-lg-0">
						<div className="col col-md-4 col-6">
							<div className="d-flex align-items-center">
								<span className="text-body-secondary fs-sm">Show</span>
								<select className="form-select form-select-flush w-auto ms-2">
									<option>5</option>
									<option>10</option>
									<option>15</option>
								</select>
							</div>
						</div>
						<div className="col col-md-4 col-12 text-center">
							<button className="btn btn-primary w-md-auto w-100" type="button">Load more posts</button>
						</div>
						<div className="col col-md-4 col-6">
							<nav aria-label="Page navigation">
								<ul className="pagination pagination-sm justify-content-end mb-0">
									{[1, 2, 3, 4, 5].map(p => (
										<li key={p} className={`page-item ${p === 1 ? 'active' : ''}`}>
											<span className="page-link">{p}</span>
										</li>
									))}
								</ul>
							</nav>
						</div>
					</div>
				</div>

				{/* Sidebar */}
				<aside className="col-lg-3">
					<div className="offcanvas-lg offcanvas-end" id="sidebarBlog">
						<div className="offcanvas-header">
							<h4 className="offcanvas-title">Sidebar</h4>
							<button className="btn-close ms-auto" data-bs-dismiss="offcanvas" aria-label="Close" />
						</div>
						<div className="offcanvas-body">
							{/* Search */}
							<div className="position-relative mb-4 mb-lg-5">
								<i className="ai-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
								<input className="form-control ps-5" type="search" placeholder="Enter keyword" />
							</div>

							{/* Categories */}
							<h4 className="pt-1 pt-lg-0 mt-lg-n2">Categories:</h4>
							<ul className="nav flex-column mb-lg-5 mb-4">
								{['All categories', 'Inspiration', 'Brand strategy', 'Advertisement', 'Ecommerce', 'Travel'].map((cat, i) => (
									<li key={i} className="mb-2">
										<a className={`nav-link d-flex p-0 ${i === 0 ? 'active' : ''}`} href="#">
											{cat}
											<span className="fs-sm text-body-secondary ms-2">({20 + i * 5})</span>
										</a>
									</li>
								))}
							</ul>

							{/* Social */}
							<h4 className="pt-3 pt-lg-0 pb-1">Join us:</h4>
							<div className="d-flex mt-n3 ms-n3 mb-lg-5 mb-4 pb-3 pb-lg-0">
								{['instagram', 'facebook', 'telegram', 'x'].map(name => (
									<a key={name} className={`btn btn-secondary btn-icon btn-sm btn-${name} rounded-circle mt-3 ms-3`} href="#" aria-label={name}>
										<i className={`ai-${name}`}></i>
									</a>
								))}
							</div>
						</div>
					</div>
				</aside>
			</div>
		
	);
}
