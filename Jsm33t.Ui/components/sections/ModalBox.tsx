'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';

type ModalBoxProps = {
	type?: 'sm' | 'lg' | 'xl' | 'fullscreen' | 'scrollable' | 'centered' | '';
};

type OpenParams = {
	title: string;
	description: string;
	bodyList?: string[];
};

export type ModalBoxRef = {
	open: (params: OpenParams) => void;
};

export const modalRef = { current: null } as { current: ModalBoxRef | null }; // globally accessible

const ModalBox = forwardRef<ModalBoxRef, ModalBoxProps>(({ type = '' }, ref) => {
	const modalRefLocal = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	useImperativeHandle(ref, () => {
		modalRef.current = {
			open: async ({ title, description, bodyList = [] }) => {
				if (!modalRefLocal.current) return;

				if (titleRef.current) titleRef.current.textContent = title;
				if (descRef.current) descRef.current.textContent = description;
				if (listRef.current) {
					listRef.current.innerHTML = '';
					bodyList.forEach(item => {
						const li = document.createElement('li');
						li.textContent = item;
						listRef.current!.appendChild(li);
					});
				}

				// 🔐 Dynamic import to avoid document access during SSR
				const { Modal } = await import('bootstrap');
				const modal = Modal.getInstance(modalRefLocal.current) || new Modal(modalRefLocal.current);
				modal.show();
			},
		};
		return modalRef.current;
	});

	const modalClass = {
		sm: 'modal-sm',
		md: 'modal-md',
		lg: 'modal-lg',
		xl: 'modal-xl',
		fullscreen: 'modal-fullscreen',
		scrollable: 'modal-dialog-scrollable',
		centered: 'modal-dialog-centered',
		'': '',
	}[type] || '';

	return (
		<div className="modal fade" tabIndex={-1} role="dialog" ref={modalRefLocal}>
			<div className={`modal-dialog ${modalClass}`} role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title" ref={titleRef}>Modal Title</h4>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
					</div>
					<div className="modal-body">
						<p ref={descRef}></p>
						<ul className="ps-3" ref={listRef}></ul>
					</div>
					<div className="modal-footer flex-column flex-sm-row">
						<button type="button" className="btn btn-secondary w-100 w-sm-auto mb-3 mb-sm-0" data-bs-dismiss="modal">Close</button>
						<button type="button" className="btn btn-primary w-100 w-sm-auto ms-sm-3">Save changes</button>
					</div>
				</div>
			</div>
		</div>
	);
});

ModalBox.displayName = 'ModalBox';
export default ModalBox;
