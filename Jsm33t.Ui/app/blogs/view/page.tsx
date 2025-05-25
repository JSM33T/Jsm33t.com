import type { Metadata } from 'next';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BlogPostView from './_client/BlogViewClient';



export const metadata: Metadata = {
	title: 'Blog',
	description: 'Latest posts, tips, and inspiration from the team at Jsm33t.',
};

const breadcrumbs = [
	{ label: 'Home', href: '/' },
	{ label: 'View' }
];

export default function BlogViewPage() {
	return (
		<>
			<div className="container my-5 pt-5">
				<Breadcrumbs items={breadcrumbs} />
				<BlogPostView />
				<button className="d-lg-none btn btn-sm fs-sm btn-primary w-100 rounded-0 fixed-bottom" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarBlog">
					<i className="ai-layout-column me-2"></i>
					Sidebar
				</button>
			</div>
		</>
	);
}
