'use client';

import { useState } from 'react';
import Sidebar from './SideBar';

interface BlogDetailDto {
	title: string;
	author?: string;
	slug: string;
	content: string;
	category: string;
	coverImageUrl?: string;
	image?: string;
	createdAt?: string;
}


export function ClientBlogView({ blogPost }: { blogPost: BlogDetailDto }) {
	const [searchQuery, setSearchQuery] = useState('');

	const highlightBlogContent = (text: string, keyword: string) => {
		if (!keyword) return text;
		const regex = new RegExp(`(${keyword})`, 'gi');
		let matchIndex = 0;
		return text.split(regex).map((part, i) =>
			regex.test(part) ? (
				<mark key={i} id={`highlight-${matchIndex++}`}>
					{part}
				</mark>
			) : (
				part
			)
		);
	};

	return (
		<div className="row pt-4">
			<div className="col-lg-8">
				<article className="mx-auto max-w-4xl">
					<img
						src={blogPost.image ?? ''}
						alt={blogPost.title}
						className="rounded-2xl mb-4"
						style={{ width: '1284px', maxHeight: '500px', objectFit: 'cover' }}
					/>
					<h1 className="text-3xl font-bold mb-2">{blogPost.title}</h1>
					<p className="text-sm text-muted mb-4">
						By {blogPost.author} • {blogPost.createdAt ?? '2025-01-01'} •{' '}
						<span className="text-primary">{blogPost.category}</span>
					</p>
					<div className="markdown-body">
						<p>{highlightBlogContent(blogPost.content, searchQuery)}</p>
					</div>
				</article>
			</div>

			<Sidebar content={blogPost.content} query={searchQuery} onQueryChange={setSearchQuery} />

			<button
				className="d-lg-none btn btn-sm fs-sm btn-primary w-100 rounded-0 fixed-bottom"
				type="button"
				data-bs-toggle="offcanvas"
				data-bs-target="#sidebar"
			>
				<i className="ai-layout-column me-2"></i>
				Sidebar
			</button>
		</div>
	);
}