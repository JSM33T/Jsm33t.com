'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/apiClient';
import CategorySection from './CategorySection';
import { motion } from 'framer-motion';

const pageSize = 10;

export default function BlogListWithSidebar() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const searchKey = searchParams.get('search') || '';
	const categorySlug = searchParams.get('categoryslug') || '';
	const page = Number(searchParams.get('page') || 1);

	const [input, setInput] = useState(searchKey);
	const [results, setResults] = useState<BlogListDto[]>([]);
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState(0);

	interface BlogListDto {
		id: number;
		rowId: string;
		title: string;
		slug: string;
		summary: string;
		coverImageUrl: string;
		blogYear: number;
		category: string;
		series: string;
		createdAt: string | null;
		viewCount: number;
		likeCount: number;
		isFeatured: boolean;
		status: number;
	}

	useEffect(() => {
		setInput(searchKey);
	}, [searchKey]);

	useEffect(() => {
		setLoading(true);

		const url = `/blog/list?pageNumber=${page}&pageSize=${pageSize}` +
			(searchKey ? `&search=${encodeURIComponent(searchKey)}` : '') +
			(categorySlug ? `&categoryslug=${encodeURIComponent(categorySlug)}` : '');

		apiClient.get<{ items: BlogListDto[]; totalCount: number }>(url)
			.then(res => {
				setResults(res.data.items || []);
				setTotal(res.data.totalCount || 0);
			})
			.finally(() => setLoading(false));
	}, [searchKey, page, categorySlug]);

	useEffect(() => {
		const handler = setTimeout(() => {
			if (input !== searchKey) {
				const params = new URLSearchParams(window.location.search);
				if (input) params.set('search', input);
				else params.delete('search');

				params.set('page', '1');
				router.replace(`?${params.toString()}`, { scroll: false });
			}
		}, 400);
		return () => clearTimeout(handler);
	}, [input]);

	const totalPages = Math.max(1, Math.ceil(total / pageSize));

	const changePage = (p: number) => {
		const params = new URLSearchParams(window.location.search);
		params.set('page', p.toString());
		router.replace(`?${params.toString()}`);
	};

	return (
		<div className="row mb-md-2 mb-xl-4">
			{/* Blog Posts */}
			<div className="col-lg-9 pe-lg-4 pe-xl-5">
				<h1 className="pb-3 pb-lg-4">Blog list with sidebar</h1>
				{loading && <div>Loading...</div>}
				{!loading && results.length === 0 && <div>No blogs found.</div>}

				{!loading && results.map((blog, index) => (
					<motion.article
						key={blog.id}
						className="row g-0 border-0 mb-4"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: index * 0.05 }}
					>
						<article key={blog.id} className="row g-0 border-0 mb-4">
							<Link
								className="col-sm-5 bg-repeat-0 bg-size-cover bg-position-center rounded-5"
								href={`/blogs/${blog.blogYear}/${blog.slug}`}
								style={{
									backgroundImage: `url(${blog.coverImageUrl})`,
									minHeight: '14rem',
									display: 'block'
								}}
								aria-label="Post image"
							/>
							<div className="col-sm-7">
								<div className="pt-4 pb-sm-4 ps-sm-4 pe-lg-4">
									<h3>
										<Link href={`/blogs/${blog.blogYear}/${blog.slug}`}>{blog.title}</Link>
									</h3>
									<p className="d-sm-none d-md-block">{blog.summary}</p>
									<div className="d-flex flex-wrap align-items-center mt-n2">
										<span className="fs-sm text-body-secondary mt-2">
											{blog.createdAt?.substring(0, 10) || "Draft"}
										</span>
										<span className="fs-xs opacity-20 mt-2 mx-3">|</span>
										{blog.category && (
											<span className="badge text-nav fs-xs border mt-2">{blog.category}</span>
										)}
									</div>
								</div>
							</div>
						</article>
					</motion.article>
				))}



				{totalPages > 1 && (
					<nav className="mt-4">
						<ul className="pagination">
							{Array.from({ length: totalPages }, (_, idx) => idx + 1).map(num => (
								<li key={num} className={`page-item${num === page ? ' active' : ''}`}>
									<button className="page-link" onClick={() => changePage(num)}>{num}</button>
								</li>
							))}
						</ul>
					</nav>
				)}
			</div>

			{/* Sidebar */}
			<aside className="col-lg-3">
				<div className="offcanvas-lg offcanvas-end" id="sidebarBlog">
					<div className="position-relative mb-4 mb-lg-5">
						<i className="ai-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
						<input
							className="form-control ps-5"
							type="search"
							placeholder="Enter keyword"
							value={input}
							onChange={e => setInput(e.target.value)}
						/>
					</div>
					<CategorySection />
				</div>
			</aside>
		</div>
	);
}
