'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BlogListWithSidebar() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Always read from the actual query param!
	const searchKey = searchParams.get('searchKey') || '';
	const [input, setInput] = useState(searchKey);
	const [results, setResults] = useState<any[]>([]);

	// Keep input state in sync with query string if changed externally (back/forward)
	useEffect(() => {
		setInput(searchKey);
	}, [searchKey]);

	// Fetch posts based on query param (NOT input state)
	useEffect(() => {
		// Fetch ONLY when query param changes
		if (!searchKey) return setResults([]);
		fetch(`/api/blogs?searchKey=${encodeURIComponent(searchKey)}`)
			.then(res => res.json())
			.then(data => setResults(data.posts || []));
	}, [searchKey]);

	// Update query param on debounce when user types
	useEffect(() => {
		const handler = setTimeout(() => {
			// Only update URL if changed
			if (input !== searchKey) {
				const params = new URLSearchParams(window.location.search);
				if (input) {
					params.set('searchKey', input);
				} else {
					params.delete('searchKey');
				}
				router.replace(`?${params.toString()}`, { scroll: false });
			}
		}, 400);
		return () => clearTimeout(handler);
	}, [input]);

	// Expose a fetch method if you need to manually re-trigger fetch:
	const fetchByQuery = () => {
		fetch(`/api/blogs?searchKey=${encodeURIComponent(searchKey)}`)
			.then(res => res.json())
			.then(data => setResults(data.posts || []));
	};

	return (
		<div className="row mb-md-2 mb-xl-4">
			{/* Blog Posts */}
			<div className="col-lg-9 pe-lg-4 pe-xl-5">
				{/* ... Render results ... */}
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
					{/* ... */}
				</div>
			</aside>
		</div>
	);
}
