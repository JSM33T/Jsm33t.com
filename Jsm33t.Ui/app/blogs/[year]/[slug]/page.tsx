// app/blogs/[year]/[slug]/page.tsx
import React from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ReactMarkdown from 'react-markdown';

interface BlogDetailDto {
	title: string;
	author?: string;
	slug: string;
	content: string;
	category: string;
	coverImageUrl?: string;
	createdAt?: string;
}

export default async function BlogViewPage() {
	const res = await fetch('http://localhost:5035/api/blog/kdramas', {
		cache: 'no-store',
	});

	if (!res.ok) {
		return <div className="container my-5 pt-5">Not found.</div>;
	}

	const json = await res.json();
	const data: BlogDetailDto = json.data;;
	const blogPost = {
		title: data.title,
		author: data.author ?? 'Unknown',
		date: data.createdAt ?? '2025-01-01',
		category: data.category ?? 'General',
		image: data.coverImageUrl ?? 'https://picsum.photos/800/400?random=1',
		content: data.content,
	};

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Blogs', href: '/blogs' },
		{ label: blogPost.title },
	];

	return (
		<div className="container my-5 pt-5">
			<Breadcrumbs items={breadcrumbs} />
			<div className="container py-6">
				<article className="mx-auto max-w-4xl">
					<img src={blogPost.image} alt={blogPost.title} className="w-full rounded-2xl mb-6" />
					<h1 className="text-3xl font-bold mb-2">{blogPost.title}</h1>
					<p className="text-sm text-gray-500 mb-4">
						By {blogPost.author} • {blogPost.date} •{' '}
						<span className="text-blue-600">{blogPost.category}</span>
					</p>
					<div className="markdown-body">
						<ReactMarkdown>{blogPost.content}</ReactMarkdown>
					</div>
				</article>
			</div>

			<button
				className="d-lg-none btn btn-sm fs-sm btn-primary w-100 rounded-0 fixed-bottom"
				type="button"
				data-bs-toggle="offcanvas"
				data-bs-target="#sidebarBlog"
			>
				<i className="ai-layout-column me-2"></i>
				Sidebar
			</button>
		</div>
	);
}
