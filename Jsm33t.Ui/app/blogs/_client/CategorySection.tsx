'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';

interface CategoryDto {
	id: number;
	slug: string;
	title: string;
	isActive: boolean;
}

export default function CategorySection() {
	const [categories, setCategories] = useState<CategoryDto[]>([]);
	const router = useRouter();
	const searchParams = useSearchParams();
	const selectedSlug = searchParams.get('category') || '';

	useEffect(() => {
		apiClient.get<CategoryDto[]>('/blogs/categories')
			.then(res => {
				if (res.status === 200 && Array.isArray(res.data)) {
					setCategories(res.data);
				}
			});
	}, []);

	const handleClick = (slug?: string) => {
		const params = new URLSearchParams(window.location.search);
		if (!slug) params.delete('category');
		else params.set('category', slug);
		params.set('page', '1');
		router.replace(`?${params.toString()}`);
	};

	return (
		<div className="mb-4">
			<h5 className="mb-3">Categories</h5>
			<ul className="list-unstyled">
				<li>
					<button
						className={`btn btn-link p-0 text-start ${selectedSlug === '' ? 'fw-bold text-primary' : ''}`}
						onClick={() => handleClick()}
					>
						All
					</button>
				</li>
				{categories.map(cat => (
					<li key={cat.id}>
						<button
							className={`btn btn-link p-0 text-start ${cat.slug === selectedSlug ? 'fw-bold text-primary' : ''}`}
							onClick={() => handleClick(cat.slug)}
							disabled={!cat.isActive}
						>
							{cat.title}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
