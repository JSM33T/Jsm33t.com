import Link from 'next/link';
type Crumb = {
	label: string;
	href?: string;
};

type BreadcrumbsProps = {
	items: Crumb[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<nav aria-label="breadcrumb">
			<ol className="pt-lg-3 pb-lg-4 pb-2 breadcrumb">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					return (
						<li
							key={index}
							className={`breadcrumb-item${isLast ? ' active' : ''}`}
							aria-current={isLast ? 'page' : undefined}
						>
							{!isLast && item.href ? (
								<Link href={item.href}>{item.label}</Link>
							) : (
								item.label
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
