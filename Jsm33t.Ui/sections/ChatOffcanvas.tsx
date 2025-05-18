'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

type Message = {
	sender: 'user' | 'bot';
	text: string;
};

const botReplies = [
	"I'm still in the oven, learning new tricks!",
	"Hang tight, I'm under development.",
	"I'm a work in progress—more features coming soon!",
	"I'm still baking, but I'll try my best to help.",
	"Sorry, I'm still being built. Check back later for more smarts!",
	"I'm in early development, so my answers might be limited.",
	"I'm still cooking up my responses!",
	"I'm a beta bot—thanks for your patience!"
];

export type ChatOffcanvasRef = {
	openOffcanvas: () => void;
};

const ChatOffcanvas = forwardRef<ChatOffcanvasRef>((_, ref) => {
	const offcanvasRef = useRef<HTMLDivElement | null>(null);
	const offcanvasInstanceRef = useRef<any>(null);
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');

	const openOffcanvas = async () => {
		if (offcanvasRef.current && typeof window !== 'undefined') {
			const { Offcanvas } = await import('bootstrap');
			if (!offcanvasInstanceRef.current) {
				offcanvasInstanceRef.current = new Offcanvas(offcanvasRef.current);
			}
			offcanvasInstanceRef.current.show();
		}
	};

	useImperativeHandle(ref, () => ({ openOffcanvas }));

	const sendMessage = () => {
		if (!input.trim()) return;
		setMessages((prev) => [...prev, { sender: 'user', text: input.trim() }]);
		setInput('');
		setTimeout(() => {
			setMessages((prev) => [
				...prev,
				{ sender: 'bot', text: botReplies[Math.floor(Math.random() * botReplies.length)] }
			]);
		}, 800);
	};

	useEffect(() => {
		setMessages([{ sender: 'bot', text: "Hey there! How can I help you?" }]);
	}, []);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div
			className="offcanvas offcanvas-end w-100 w-md-75 w-lg-25"
			tabIndex={-1}
			ref={offcanvasRef}
		>
			<div className="offcanvas-header">
				<h5 className="offcanvas-title">😺Kitty bot</h5>
				<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>

			<div className="offcanvas-body p-0 d-flex flex-column h-100">
				<div className="flex-grow-1 overflow-auto p-3">
					{messages.map((msg, idx) => (
						<div key={idx} className={`mb-3 d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
							<div className={`p-2 rounded ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'}`} style={{ maxWidth: '75%' }}>
								{msg.text}
							</div>
						</div>
					))}
					<div ref={bottomRef} />
				</div>
				<div className="border-top p-3">
					<div className="input-group">
						<textarea
							className="form-control"
							placeholder="Type your message..."
							rows={1}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
						/>
						<button className="btn btn-secondary" onClick={sendMessage}>
							Send
						</button>
					</div>
				</div>
			</div>
		</div>
	);
});

ChatOffcanvas.displayName = 'ChatOffcanvas';
export default ChatOffcanvas;
