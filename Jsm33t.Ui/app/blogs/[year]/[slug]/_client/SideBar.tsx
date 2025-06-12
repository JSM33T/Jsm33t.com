'use client';

import React from 'react';

interface SidebarProps {
	content: string;
	query: string;
	onQueryChange: (q: string) => void;
}

const Sidebar = ({ content, query, onQueryChange }: SidebarProps) => {
	const handleClick = (id: string) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};

	const highlightMatches = (text: string, keyword: string) => {
		if (!keyword) return text;

		const regex = new RegExp(`(${keyword})`, 'gi');
		let matchIndex = 0;

		return text.split(regex).map((part, i) => {
			if (regex.test(part)) {
				const id = `highlight-${matchIndex++}`;
				return (
					<mark
						key={i}
						style={{ cursor: 'pointer' }}
						onClick={() => handleClick(id)}
					>
						{part}
					</mark>
				);
			}
			return part;
		});
	};

	const previewText = content.slice(0, 1000);

	return (
		<aside className="col-lg-3 offset-xl-1">
			<div className="offcanvas-lg offcanvas-end" id="sidebar">
				<div className="offcanvas-header">
					<h4 className="offcanvas-title">Sidebar</h4>
					<button
						className="btn-close ms-auto"
						type="button"
						data-bs-dismiss="offcanvas"
						data-bs-target="#sidebar"
						aria-label="Close"
					></button>
				</div>
				<div className="offcanvas-body">
					{/* Search box */}
					<div className="position-relative mb-4 mb-lg-5">
						<i className="ai-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
						<input
							className="form-control ps-5"
							type="search"
							placeholder="Search in blog"
							value={query}
							onChange={(e) => onQueryChange(e.target.value)}
						/>
					</div>

					{/* Preview with highlight links */}
					{query && (
						<div className="mb-4">
							<p className="small text-muted mb-2">Preview:</p>
							<div className="small">
								{highlightMatches(previewText, query)}
								{previewText.length < content.length && '...'}
							</div>
						</div>
					)}
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
