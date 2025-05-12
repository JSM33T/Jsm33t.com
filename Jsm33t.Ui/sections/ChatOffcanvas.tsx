'use client';

import { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type Message = {
	sender: 'user' | 'bot';
	text: string;
};

const botReplies = [
	"Hi there! How can I assist you today?",
	"That's interesting!",
	"Let me look into that for you.",
	"Sure, give me a moment.",
	"Thank you!"
];

export default function ChatOffcanvas() {
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

	const sendMessage = () => {
		if (!input.trim()) return;

		const newMessage: Message = { sender: 'user', text: input.trim() };
		setMessages((prev) => [...prev, newMessage]);
		setInput('');

		setTimeout(() => {
			const reply: Message = {
				sender: 'bot',
				text: botReplies[Math.floor(Math.random() * botReplies.length)]
			};
			setMessages((prev) => [...prev, reply]);
		}, 800);
	};

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<>
			{/* Floating Chat Button */}
			<button
				onClick={openOffcanvas}
				className="btn btn-primary position-fixed bottom-4 end-4 rounded-circle shadow"
				style={{ zIndex: 1050, width: '60px', height: '60px' }}
			>
				💬
			</button>

			{/* Offcanvas Chat */}
			<div
				className="offcanvas offcanvas-end w-100 w-md-75 w-lg-25"
				tabIndex={-1}
				ref={offcanvasRef}
			>
				<div className="offcanvas-header">
					<h5 className="offcanvas-title">Chat</h5>
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
					></button>
				</div>

				<div className="offcanvas-body p-0" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
					{/* Messages */}
					<div className="flex-grow-1 overflow-auto p-3">
						{messages.map((msg, idx) => (
							<div key={idx} className={`mb-3 d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
								<div
									className={`p-2 rounded ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'}`}
									style={{ maxWidth: '75%' }}
								>
									{msg.text}
								</div>
							</div>
						))}
						<div ref={bottomRef} />
					</div>

					{/* Input */}
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
		</>
	);
}
