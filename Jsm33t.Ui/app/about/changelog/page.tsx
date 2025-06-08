'use client';

import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Crumb } from '@/types/common';
import { apiClient } from "@/lib/apiClient";

export interface ChangelogEntry {
	version: string;
	changes: {
		id: number;
		version: string;
		title: string;
		description: string;
		changeType: string;
		contributors: string;
		changedAt: string;
	}[];
}


const breadcrumbs: Crumb[] = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Changelog' },
];

function getBadgeColor(type: string) {
	switch (type.toLowerCase()) {
		case 'feature':
			return 'success';
		case 'fix':
		case 'bug':
			return 'danger';
		case 'add':
			return 'primary';
		default:
			return 'secondary';
	}
}

export default function Changelog() {
	const [logs, setLogs] = useState<ChangelogEntry[]>([]);

	useEffect(() => {
		apiClient.get<ChangelogEntry[]>('/changelog/grouped').then(res => {
			console.log(res.data);
			if (res.status == 200 && Array.isArray(res.data)) {
				setLogs(res.data);
			}
		});
	}, []);

	return (
		<section className="container pt-5 pb-lg-2 pb-xl-4 py-xxl-5 my-5">
			<Breadcrumbs items={breadcrumbs} />

			<div className="row pb-1 pb-sm-3 pb-lg-4">
				<div className="col-lg-4 pe-xxl-4">
					<h1 className="display-2" data-aos="flip-up" data-aos-duration="200">Changelog</h1>
					<p className="fs-lg pb-4 mb-0 mb-sm-2" data-aos="flip-up" data-aos-duration="500">
						All the updates
					</p>
				</div>
				<div className="col-lg-8 col-xl-7 offset-xl-1">
					{logs.map((log, i) => (
						<div key={log.version} className="mb-4 border-bottom pb-3">
							<button
								className="btn btn-link d-flex justify-content-between align-items-center w-100 px-0 text-start"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target={`#collapse-${i}`}
								aria-expanded={i === 0 ? 'true' : 'false'}
							>
								<h5 className="mb-0">{log.version}</h5>
								<span className="ms-auto text-muted small">View Changes</span>
							</button>
							<div id={`collapse-${i}`} className={`collapse ${i === 0 ? 'show' : ''} mt-3`}>
								<ul className="list-unstyled">
									{log.changes.map(change => (
										<li key={change.id} className="mb-4">
											<h6 className="mb-1">{change.title}</h6>
											<span className={`badge bg-${getBadgeColor(change.changeType)} me-2`}>
												{change.changeType}
											</span>
											<small className="text-muted">{new Date(change.changedAt).toLocaleDateString()}</small>
											<p className="mb-1 mt-2">{change.description}</p>
											{change.contributors && (
												<small className="text-muted">By {change.contributors}</small>
											)}
										</li>
									))}
								</ul>
							</div>
						</div>
					))}

				</div>
			</div>
		</section>
	);
}
