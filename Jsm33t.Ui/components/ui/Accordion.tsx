"use client";
import { useState } from 'react';

type FAQ = {
	question: string;
	answer: string;
};

type AccordionProps = {
	faqs: FAQ[];
};

export default function Accordion({ faqs }: AccordionProps) {
	const [openIndex, setOpenIndex] = useState<number>(0); // first item open by default

	return (
		<div className="accordion" id="accordionDefault">
			{faqs.map((faq, index) => {
				const isOpen = openIndex === index;
				const headingId = `heading${index}`;
				const collapseId = `collapse${index}`;

				return (
					<div className="accordion-item" key={index}>
						<h3 className="accordion-header" id={headingId}>
							<button
								className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
								type="button"
								aria-expanded={isOpen}
								aria-controls={collapseId}
								onClick={() => setOpenIndex(isOpen ? -1 : index)}
							>
								{faq.question}
							</button>
						</h3>
						<div
							id={collapseId}
							className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
							aria-labelledby={headingId}
							data-bs-parent="#accordionDefault"
						>
							<div className="accordion-body fs-sm">
								{faq.answer}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
