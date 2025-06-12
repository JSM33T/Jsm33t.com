// app/blogs/[year]/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ReactMarkdown from 'react-markdown';
import Sidebar from './_client/SideBar';
import { ClientBlogView } from './_client/ClientBlogView';

interface BlogDetailDto {
	title: string;
	author?: string;
	slug: string;
	content: string;
	category: string;
	coverImageUrl?: string;
	createdAt?: string;
}

interface BlogViewPageProps {
	params: {
		slug: string;
		year: string;
	};
}

export default async function BlogViewPage({ params }: BlogViewPageProps) {
	const apiUrl = `http://localhost:5035/api/blog/${params.slug}`;
	const res = await fetch(apiUrl, { cache: 'no-store' });

	if (!res.ok) return notFound();

	const json = await res.json();
	const data: BlogDetailDto = json.data;

	const blogPost = {
		title: data.title,
		author: data.author ?? 'Unknown',
		slug: data.slug,
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

	// client-side state must be lifted to a client component like Sidebar

	return (
		<div className="container my-5 pt-5">
			<Breadcrumbs items={breadcrumbs} />
			<ClientBlogView blogPost={blogPost} />
		</div>
	);
}