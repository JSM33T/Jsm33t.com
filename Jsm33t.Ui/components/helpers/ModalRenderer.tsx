'use client';
import ModalBox, { modalRef } from '@/components/sections/ModalBox';

export default function ModalRenderer() {
	return <ModalBox ref={modalRef} type="lg" />;
}
