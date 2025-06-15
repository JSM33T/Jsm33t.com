'use client';

import React, { useMemo } from 'react';
import { SidebarProps } from '../types';

const Sidebar = ({ content, query, onQueryChange, onMatchClick }: SidebarProps) => {
	const previewText = content.slice(0, 1000);

	const matchIndexes = useMemo(() => {
		if (!query) return [];
		const regex = new RegExp(query, 'gi');
		return [...previewText.matchAll(regex)].map((m, i) => ({ index: i, text: m[0] }));
	}, [previewText, query]);

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

					{/* Match list with scroll triggers */}
					{query && matchIndexes.length > 0 && (
						<div className="mb-4">
							<p className="small text-muted mb-2">Matches:</p>
							<ul className="list-unstyled small">
								{matchIndexes.map((match, i) => (
									<li key={i}>
										<button
											className="btn btn-link text-start p-0"
											onClick={() => onMatchClick(i)}
										>
											#{i + 1}: {match.text}
										</button>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
