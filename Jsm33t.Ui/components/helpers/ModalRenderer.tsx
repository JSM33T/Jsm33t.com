'use client';
import ModalBox, { modalRef } from '@/components/ui/ModalBox';

export default function ModalRenderer() {
	return <ModalBox ref={modalRef} type="lg" />;
}
