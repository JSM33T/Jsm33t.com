'use client';
import { post } from '@/lib/https';
import { useState, ChangeEvent, FormEvent } from 'react';


type FormData = {
    name: string;
    email: string;
    message: string;
    priority: number;
};

export default function ContactForm() {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		message: '',
		priority: 3,
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === 'priority' ? Number(value) : value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		console.log('Form Data:', formData);
		const response = await post('/contact', formData);
		console.log('API Response:', response);
	};

	return (
		<form onSubmit={handleSubmit} className="p-4 border rounded-4">
			<div className="mb-3">
				<label htmlFor="name" className="form-label">Name</label>
				<input
					type="text"
					className="form-control rounded"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="email" className="form-label">Email</label>
				<input
					type="email"
					className="form-control rounded"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="message" className="form-label">Message</label>
				<textarea
					className="form-control rounded"
					id="message"
					name="message"
					rows={4}
					value={formData.message}
					onChange={handleChange}
					required
				></textarea>
			</div>

			<div className="mb-3">
				<label htmlFor="priority" className="form-label">
                    Priority: {formData.priority}
				</label>
				<input
					type="range"
					className="form-range"
					id="priority"
					name="priority"
					min={1}
					max={5}
					value={formData.priority}
					onChange={handleChange}
				/>
			</div>

			<button type="submit" className="disabled btn btn-primary rounded">Send (ID)</button>
		</form>
	);
}
