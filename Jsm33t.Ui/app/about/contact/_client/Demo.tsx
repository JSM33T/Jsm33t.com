'use client';

import ModalBox, { ModalBoxRef } from '@/components/sections/ModalBox';
import { useRef } from 'react';


export default function Demo() {
	const modalRef = useRef<ModalBoxRef>(null);

	const showModal = () => {
		modalRef.current?.open({
			title: 'Alert Title',
			description: 'This is a dynamic description passed from outside.',
			bodyList: ['Point A', 'Point B', 'Point C']
		});
	};

	return (
		<>
			<button className="btn btn-primary btn-sm" onClick={showModal}>Open Modal</button>
			<ModalBox ref={modalRef} type="lg" />
		</>
	);
}
