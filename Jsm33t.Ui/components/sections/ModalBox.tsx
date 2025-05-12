'use client';

import { Modal } from 'bootstrap';
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

const ModalBox = forwardRef<ModalBoxRef, ModalBoxProps>(({ type = '' }, ref) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	useImperativeHandle(ref, () => ({
		open: ({ title, description, bodyList = [] }) => {
			if (!modalRef.current) return;

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

			const modal = Modal.getInstance(modalRef.current) || new Modal(modalRef.current);
			modal.show();
		}
	}));

	const modalClass = {
		sm: 'modal-sm',
		lg: 'modal-lg',
		xl: 'modal-xl',
		fullscreen: 'modal-fullscreen',
		scrollable: 'modal-dialog-scrollable',
		centered: 'modal-dialog-centered',
		'': ''
	}[type] || '';

	return (
		<div className="modal fade" tabIndex={-1} role="dialog" ref={modalRef}>
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
