// app/blogs/view/[year]/[slug]/page.tsx
import { Metadata } from 'next';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import ReactMarkdown from 'react-markdown';


interface BlogParams {
	params: {
		year: string;
		slug: string;
	};
}


// Simulate fetching from a database/API
async function getBlogPost(year: string, slug: string) {
	// Replace this with your real fetch logic
	return {
		title: 'Exploring the Future of AI',
		author: 'Jasmeet Singh',
		date: `${year}-05-25`,
		category: 'Technology',
		image: '/assets/img/blog/detail.jpg',
		content: `
# The Rise of Artificial Intelligence

Artificial Intelligence (AI) is transforming every aspect of our lives — from automation to personalization.

## Key Areas of Impact

- **Healthcare**
- **Finance**
- **Creative Arts**

> "AI is not the future, it's the present." – Anonymous

### Final Thoughts

Stay informed. Stay updated. The AI wave is here.
`
	};
}

export async function generateMetadata({ params }: BlogParams): Promise<Metadata> {
	const { year, slug } = params;
	const blogPost = await getBlogPost(year, slug);

	return {
		title: blogPost.title,
		description: blogPost.content.replace(/[#>*\-]/g, '').substring(0, 150), // crude summary
		openGraph: {
			title: blogPost.title,
			description: blogPost.content.replace(/[#>*\-]/g, '').substring(0, 150),
			images: [{ url: blogPost.image }],
		},
	};
}

export default async function BlogViewPage({ params }: BlogParams) {
	const { year, slug } = params;
	const blogPost = await getBlogPost(year, slug);

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: blogPost.title }
	];

	return (
		<div className="container my-5 pt-5">
			<Breadcrumbs items={breadcrumbs} />
			<div className="container py-6">
				<article className="mx-auto max-w-4xl">
					<img src={blogPost.image} alt={blogPost.title} className="w-full rounded-2xl mb-6" />
					<h1 className="text-3xl font-bold mb-2">{blogPost.title}</h1>
					<p className="text-sm text-gray-500 mb-4">
						By {blogPost.author} • {blogPost.date} • <span className="text-blue-600">{blogPost.category}</span>
					</p>
					<div className="markdown-body">
						<ReactMarkdown>{blogPost.content}</ReactMarkdown>
					</div>
				</article>
			</div>
			<button className="d-lg-none btn btn-sm fs-sm btn-primary w-100 rounded-0 fixed-bottom" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarBlog">
				<i className="ai-layout-column me-2"></i>
				Sidebar
			</button>
		</div>
	);
}
