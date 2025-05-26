// 'use client';

// import { useEffect, useState } from 'react';
// import { apiClient } from '@/lib/apiClient';

// type Device = {
// 	id: number;
// 	name: string;
// 	type: string;
// 	os: string;
// 	lastUsed: string;
// 	isPrimary?: boolean;
// 	location?: string;
// };

// export default function DeviceSection() {
// 	const [devices, setDevices] = useState<Device[]>([]);
// 	const [loading, setLoading] = useState(true);
// 	const MOCK_DEVICES: Device[] = [
// 		{
// 			id: 1,
// 			name: 'JSM Laptop',
// 			type: 'Laptop',
// 			os: 'Windows 11 Pro',
// 			lastUsed: '2024-05-22T18:30:00Z',
// 			isPrimary: true,
// 			location: 'Hyderabad, India',
// 		},
// 		{
// 			id: 2,
// 			name: 'Pixel 8',
// 			type: 'Mobile',
// 			os: 'Android 14',
// 			lastUsed: '2024-05-24T10:15:00Z',
// 			location: 'Delhi, India',
// 		},
// 		{
// 			id: 3,
// 			name: 'MacBook Air',
// 			type: 'Laptop',
// 			os: 'macOS Sonoma',
// 			lastUsed: '2024-05-20T20:01:00Z',
// 			location: 'Pune, India',
// 		},
// 	];
// 	useEffect(() => {

// 		setTimeout(() => {
// 			setDevices(MOCK_DEVICES);
// 			setLoading(false);
// 		}, 700);
// 		// apiClient.get<Device[]>('/device/list')
// 		// 	.then(res => {
// 		// 		if (res.status === 200) setDevices(res.data);
// 		// 	})
// 		// 	.finally(() => setLoading(false));
// 	}, []);

// 	if (loading) return <p className="text-center py-5">Loading devices...</p>;
// 	if (!devices || devices.length === 0)
// 		return (
// 			<section className="card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
// 				<div className="card-body">
// 					<div className="d-flex align-items-center pb-4 mt-sm-n1 mb-0 mb-lg-1 mb-xl-3">
// 						<i className="ai-monitor text-primary lead pe-1 me-2"></i>
// 						<h2 className="h4 mb-0">Devices</h2>
// 					</div>
// 					<p className="mb-0">No devices linked to your account.</p>
// 				</div>
// 			</section>
// 		);

// 	return (
// 		<section className="card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
// 			<div className="card-body">
// 				<div className="d-flex align-items-center pb-4 mt-sm-n1 mb-0 mb-lg-1 mb-xl-3">
// 					<i className="ai-monitor text-primary lead pe-1 me-2"></i>
// 					<h2 className="h4 mb-0">Linked Devices</h2>
// 				</div>
// 				<div className="row row-cols-1 row-cols-md-2 g-4">
// 					{devices.map((device, idx) => (
// 						<div className="col" key={device.id}>
// 							<div className="card h-100 rounded-3 p-3 p-sm-4">
// 								<div className="d-flex align-items-center pb-2 mb-1">
// 									<h3 className="h6 text-nowrap text-truncate mb-0">
// 										{device.name} ({device.type})
// 									</h3>
// 									{device.isPrimary && (
// 										<span className="badge bg-primary bg-opacity-10 text-primary fs-xs ms-3">
// 											Primary
// 										</span>
// 									)}
// 									<div className="d-flex ms-auto">
// 										<button className="nav-link fs-xl fw-normal py-1 pe-0 ps-1 ms-2" type="button" title="Edit" aria-label="Edit">
// 											<i className="ai-edit-alt"></i>
// 										</button>
// 										<button className="nav-link text-danger fs-xl fw-normal py-1 pe-0 ps-1 ms-2" type="button" title="Delete" aria-label="Delete">
// 											<i className="ai-trash"></i>
// 										</button>
// 									</div>
// 								</div>
// 								<p className="mb-1 text-body-secondary">
// 									OS: <span className="text-dark">{device.os}</span>
// 								</p>
// 								<p className="mb-1 text-body-secondary">
// 									Last used: <span className="text-dark">{new Date(device.lastUsed).toLocaleString()}</span>
// 								</p>
// 								{device.location && (
// 									<p className="mb-0 text-body-secondary">
// 										Location: <span className="text-dark">{device.location}</span>
// 									</p>
// 								)}
// 							</div>
// 						</div>
// 					))}
// 					{/* Add device card */}
// 					<div className="col">
// 						<div className="card h-100 justify-content-center align-items-center border-dashed rounded-3 py-5 px-3 px-sm-4">
// 							<a className="stretched-link d-flex align-items-center fw-semibold text-decoration-none my-sm-3" href="#addDevice" data-bs-toggle="modal">
// 								<i className="ai-circle-plus fs-xl me-2"></i>
// 								Add new device
// 							</a>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="py-4 mt-sm-2 mt-md-3">
// 					<h3 className="h6 mb-1">Device Management</h3>
// 					<p className="mb-0">You can link up to 5 devices. Mark a device as "Primary" to receive security alerts and device-specific access.</p>
// 				</div>
// 				<div className="alert alert-info d-flex mb-0">
// 					<i className="ai-circle-info fs-xl me-2"></i>
// 					<p className="mb-0">
// 						Keeping your devices updated helps improve your account security.
// 						<a href="#" className="alert-link ms-1">Learn more</a>
// 					</p>
// 				</div>
// 			</div>
// 		</section>
// 	);
// }



'use client';

import { showBootstrapModal } from '@/components/helpers/ShowBootstrapModal';
import { modalRef } from '@/components/sections/ModalBox';
import { useEffect, useState } from 'react';

// import { apiClient } from '@/lib/apiClient'; // Uncomment when using real API

type Device = {
	id: number;
	name: string;
	type: string;
	os: string;
	lastUsed: string;
	isPrimary?: boolean;
	location?: string;
};

export default function DeviceSection() {
	const [devices, setDevices] = useState<Device[]>([]);
	const [loading, setLoading] = useState(true);
	const MOCK_DEVICES: Device[] = [
		{
			id: 1,
			name: 'JSM Laptop',
			type: 'Laptop',
			os: 'Windows 11 Pro',
			lastUsed: '2024-05-22T18:30:00Z',
			isPrimary: true,
			location: 'Hyderabad, India',
		},
		{
			id: 2,
			name: 'Pixel 8',
			type: 'Mobile',
			os: 'Android 14',
			lastUsed: '2024-05-24T10:15:00Z',
			location: 'Delhi, India',
		},
		{
			id: 3,
			name: 'MacBook Air',
			type: 'Laptop',
			os: 'macOS Sonoma',
			lastUsed: '2024-05-20T20:01:00Z',
			location: 'Pune, India',
		},
	];

	useEffect(() => {
		setTimeout(() => {
			setDevices(MOCK_DEVICES);
			setLoading(false);
		}, 700);
		// apiClient.get<Device[]>('/device/list')
		// 	.then(res => {
		// 		if (res.status === 200) setDevices(res.data);
		// 	})
		// 	.finally(() => setLoading(false));
	}, []);

	const handleDeleteClick = (id: number) => {
		showBootstrapModal({
			title: "Delete Device",
			body: "Are you sure you want to logout from this device? This action cannot be undone.",
			confirmText: "Yes, Delete",
			cancelText: "Cancel",
			onConfirm: async () => {
				// await apiClient.delete(`/device/delete/${id}`); // Uncomment for real API
				setDevices((prev) => prev.filter((d) => d.id !== id));
			}
		});
	};

	if (loading) return <p className="text-center py-5">Loading devices...</p>;
	if (!devices || devices.length === 0)
		return (
			<section className="card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
				<div className="card-body">
					<div className="d-flex align-items-center pb-4 mt-sm-n1 mb-0 mb-lg-1 mb-xl-3">
						<i className="ai-monitor text-primary lead pe-1 me-2"></i>
						<h2 className="h4 mb-0">Devices</h2>
					</div>
					<p className="mb-0">No devices linked to your account.</p>
				</div>
			</section>
		);

	return (
		<section className="card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
			<div className="card-body">
				<div className="d-flex align-items-center pb-4 mt-sm-n1 mb-0 mb-lg-1 mb-xl-3">
					<i className="ai-monitor text-primary lead pe-1 me-2"></i>
					<h2 className="h4 mb-0">Linked Devices</h2>
				</div>
				<div className="row row-cols-1 row-cols-md-2 g-4">
					{devices.map((device) => (
						<div className="col" key={device.id}>
							<div className="card h-100 rounded-3 p-3 p-sm-4">
								<div className="d-flex align-items-center pb-2 mb-1">
									<h3 className="h6 text-nowrap text-truncate mb-0">
										{device.name} ({device.type})
									</h3>
									{device.isPrimary && (
										<span className="badge bg-primary bg-opacity-10 text-primary fs-xs ms-3">
											Primary
										</span>
									)}
									<div className="d-flex ms-auto">
										{/* <button className="nav-link fs-xl fw-normal py-1 pe-0 ps-1 ms-2" type="button" title="Edit" aria-label="Edit">
											<i className="ai-edit-alt"></i>
										</button> */}
										<button
											className="nav-link text-danger fs-xl fw-normal py-1 pe-0 ps-1 ms-2"
											type="button"
											title="Delete"
											aria-label="Delete"
											onClick={() => handleDeleteClick(device.id)}
										>
											<i className="ai-trash"></i>
										</button>
									</div>
								</div>
								<p className="mb-1 text-body-secondary">
									OS: <span className="text-dark">{device.os}</span>
								</p>
								<p className="mb-1 text-body-secondary">
									Last used: <span className="text-dark">{new Date(device.lastUsed).toLocaleString()}</span>
								</p>
								{device.location && (
									<p className="mb-0 text-body-secondary">
										Location: <span className="text-dark">{device.location}</span>
									</p>
								)}
							</div>
						</div>
					))}
					{/* Add device card */}
					<div className="col">
						<div className="card h-100 justify-content-center align-items-center border-dashed rounded-3 py-5 px-3 px-sm-4">
							<a className="stretched-link d-flex align-items-center fw-semibold text-decoration-none my-sm-3" href="#addDevice" data-bs-toggle="modal">
								<i className="ai-trash fs-xl me-2"></i>
								Remove All
							</a>
						</div>
					</div>
				</div>
				<div className="py-4 mt-sm-2 mt-md-3">
					<h3 className="h6 mb-1">Device Management</h3>
					<p className="mb-0">You can log into 5 devices at a time , every new login will remove the oldest device</p>
				</div>
				<div className="alert alert-info d-flex mb-0">
					<i className="ai-circle-info fs-xl me-2"></i>
					<p className="mb-0">
						Keep your device info handy. Do log out from all devices and reset your password if you suspect any unauthorized access.
						{/* <a href="#" className="alert-link ms-1">Learn more</a> */}


						<a
							href="#"
							className="alert-link ms-1"
							onClick={e => {
								e.preventDefault();
								modalRef.current?.open({
									title: "Device Security Info",
									description: "Linked devices let you control access and get security alerts. Only trusted devices should be added.",
									bodyList: [
										"Do not login with public devices.",
										"Remove devices you don’t recognize.",
										"Regularly review and update your device list for best security.",
									],
								});
							}}
						>
							Learn more
						</a>

					</p>
				</div>
			</div>
		</section>
	);
}
