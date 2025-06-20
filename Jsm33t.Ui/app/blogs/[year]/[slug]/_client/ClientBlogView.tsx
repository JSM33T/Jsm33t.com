'use client';

import { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Sidebar from './SideBar';
import { BlogDetailDto } from '../types';
import Image from 'next/image';

export function ClientBlogView({ blogPost }: { blogPost: BlogDetailDto }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [htmlContent, setHtmlContent] = useState('');

	const scrollToMatch = (index: number) => {
		const el = document.getElementById(`highlight-${index}`);
		el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};

	useEffect(() => {
		const renderHtml = async () => {
			const rawHtml = await marked.parse(blogPost.content);

			if (!searchQuery) {
				setHtmlContent(DOMPurify.sanitize(rawHtml));
				return;
			}

			let matchIndex = 0;
			const highlighted = rawHtml.replace(
				new RegExp(`(${searchQuery})`, 'gi'),
				(match) => `<mark id="highlight-${matchIndex++}">${match}</mark>`
			);

			setHtmlContent(DOMPurify.sanitize(highlighted));
		};

		renderHtml();
	}, [blogPost.content, searchQuery]);

	return (
		<div className="row pt-4">
			<div className="col-lg-8">
				<article className="mx-auto max-w-4xl">
					{blogPost.image && (
						<Image
							src={blogPost.image}
							alt={blogPost.title}
							width={1284}
							height={500}
							className="rounded-2xl mb-4"
							style={{ objectFit: 'cover' }}
						/>
					)}

					<h1 className="text-3xl font-bold mb-2">{blogPost.title}</h1>
					<p className="text-sm text-muted mb-4">
						By {blogPost.author ?? 'Unknown'} • {blogPost.createdAt ?? '2025-01-01'} •{' '}
						<span className="text-primary">{blogPost.category}</span>
					</p>

					<div
						className="markdown-body"
						dangerouslySetInnerHTML={{ __html: htmlContent }}
					/>
				</article>
			</div>

			<Sidebar
				content={blogPost.content}
				query={searchQuery}
				onQueryChange={setSearchQuery}
				onMatchClick={scrollToMatch}
			/>

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
