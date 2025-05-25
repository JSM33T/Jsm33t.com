'use client';

import ReactMarkdown from 'react-markdown';

const blogPost = {
	title: 'Exploring the Future of AI',
	author: 'Jasmeet Singh',
	date: 'May 25, 2025',
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
`,
};

export default function BlogPostView() {
	return (
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
	);
}
