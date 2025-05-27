'use client';

import { useEffect, useState } from 'react';
import { showBootstrapModal } from '@/components/helpers/ShowBootstrapModal';
import { modalRef } from '@/components/sections/ModalBox';
import { apiClient } from '@/lib/apiClient'; // Assumes you have a wrapper around fetch/axios
import { userAgent } from 'next/server';

export interface Device {
	sessionId: number;
	accessToken: string;
	deviceId: string;
	ipAddress: string | null;
	userAgent: string | null;
	issuedAt: string;
	expiresAt: string;
	isActive: boolean;
	loggedOutAt: string | null;
	isCurrent: boolean; // <-- Add this
}

// util
function parseDeviceInfo(userAgent?: string | null) {
	if (!userAgent) return { os: 'Unknown', browser: 'Unknown', device: 'desktop', osIcon: '❓', browserIcon: '❓' };
	userAgent = userAgent.toLowerCase();

	// OS
	let os = 'Unknown', osIcon = '💻', device = 'desktop';
	if (userAgent.includes('windows')) { os = 'Windows'; osIcon = '🪟'; }
	else if (userAgent.includes('android')) { os = 'Android'; osIcon = '🤖'; device = 'mobile'; }
	else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ios')) { os = 'iOS'; osIcon = '🍏'; device = 'mobile'; }
	else if (userAgent.includes('mac os') || userAgent.includes('macintosh')) { os = 'macOS'; osIcon = '🍏'; }
	else if (userAgent.includes('linux')) { os = 'Linux'; osIcon = '🐧'; }

	// Browser
	let browser = 'Unknown', browserIcon = '🌐';
	if (userAgent.includes('edg')) { browser = 'Edge'; browserIcon = '🔵'; }
	else if (userAgent.includes('chrome')) { browser = 'Chrome'; browserIcon = '🟡'; }
	else if (userAgent.includes('safari')) { browser = 'Safari'; browserIcon = '🧭'; }
	else if (userAgent.includes('firefox')) { browser = 'Firefox'; browserIcon = '🦊'; }
	else if (userAgent.includes('opera') || userAgent.includes('opr')) { browser = 'Opera'; browserIcon = '🔴'; }

	return { os, browser, device, osIcon, browserIcon };
}

export default function DeviceSection() {
	const [devices, setDevices] = useState<Device[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchDevices = async () => {
		setLoading(true);
		try {
			const res = await apiClient.get('/profile/devices');
			if (res.status === 200 && Array.isArray(res.data)) {
				setDevices(res.data);
			} else {
				setDevices([]);
			}
		} catch {
			setDevices([]);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchDevices();
	}, []);

	const handleDeleteClick = (deviceId: string) => {
		showBootstrapModal({
			title: "Logout Device",
			body: "Are you sure you want to logout from this device? This action cannot be undone.",
			confirmText: "Yes, Logout",
			cancelText: "Cancel",
			onConfirm: async () => {
				try {
					await apiClient.post('/profile/devices/remove', { deviceId });
					setDevices(prev => prev.filter(d => d.deviceId !== deviceId));
				} catch {
					modalRef.current?.open({
						title: "Failed",
						description: "Could not remove the device. Please try again.",
						bodyList: [],
					});
				}
			}
		});
	};

	const handleRemoveAll = () => {
		showBootstrapModal({
			title: "Logout All Devices",
			body: "Are you sure you want to logout from all devices except this one? This cannot be undone.",
			confirmText: "Yes, Logout All",
			cancelText: "Cancel",
			onConfirm: async () => {
				try {
					await apiClient.post('/api/profile/devices/remove', { deleteAll: true });
					// Optionally: refetch the list, or only leave the current device (depends on your API return)
					fetchDevices();
				} catch {
					modalRef.current?.open({
						title: "Failed",
						description: "Could not remove all devices. Please try again.",
						bodyList: [],
					});
				}
			}
		});
	};

	if (loading)
		return <p className="text-center py-5">Loading devices...</p>;

	if (!devices.length)
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
				<div className="row row-cols-1 row-cols-md-1 g-4">
					<div className="row row-cols-1 row-cols-md-1 row-cols-xl-2 g-4">
						{devices.map(device => {
							const { os, browser, device: deviceType, osIcon, browserIcon } = parseDeviceInfo(device.userAgent);
							return (
								<div className="col" key={device.sessionId}>
									<div className={`card h-100 rounded-3 p-3 p-sm-4${device.isCurrent ? ' border-primary border-2' : ''}`}>
										<div className="d-flex align-items-center pb-2 mb-1">
											<span className="fs-3 me-2">{osIcon}</span>
											<h3 className="h6 text-nowrap text-truncate mb-0">
												{browserIcon} {browser} {deviceType === "mobile" && '📱'} {deviceType === "desktop" && '🖥️'}
											</h3>
											{device.isCurrent && (
												<span className="badge bg-success text-white fs-xs ms-3">
													Current Device
												</span>
											)}
											<div className="d-flex ms-auto">
												<button
													className="nav-link text-danger fs-xl fw-normal py-1 pe-0 ps-1 ms-2"
													type="button"
													title="Delete"
													aria-label="Delete"
													onClick={() => handleDeleteClick(device.deviceId)}
													disabled={device.isCurrent}
												>
													<i className="ai-trash"></i>
												</button>
											</div>
										</div>
										<p className="mb-1 text-body-secondary">
											OS: <span className="text-dark">{os}</span>
										</p>
										<p className="mb-1 text-body-secondary">
											Browser: <span className="text-dark">{browser}</span>
										</p>
										<p className="mb-1 text-body-secondary">
											UserAgent: <span className="text-dark">{device.userAgent}</span>
										</p>
										<p className="mb-1 text-body-secondary">
											Last used: <span className="text-dark">{device.issuedAt ? new Date(device.issuedAt).toLocaleString() : '-'}</span>
										</p>
										<p className="mb-1 text-body-secondary">
											Ip Add: <span className="text-dark">{device.ipAddress}</span>
										</p>
									</div>
								</div>
							);
						})}

						{/* Remove all devices card */}
						<div className="col">
							<div className="card h-100 justify-content-center align-items-center border-dashed rounded-3 py-5 px-3 px-sm-4">
								<a className="stretched-link d-flex align-items-center fw-semibold text-decoration-none my-sm-3"
									href="#removeAll"
									onClick={e => { e.preventDefault(); handleRemoveAll(); }}>
									<i className="ai-trash fs-xl me-2"></i>
									Remove All
								</a>
							</div>
						</div>
					</div>


				</div>
				<div className="py-4 mt-sm-2 mt-md-3">
					<h3 className="h6 mb-1">Device Management</h3>
					<p className="mb-0">You can log into 5 devices at a time. Every new login removes the oldest device automatically.</p>
				</div>
				<div className="alert alert-info d-flex mb-0">
					<i className="ai-circle-info fs-xl me-2"></i>
					<p className="mb-0">
						Keep your device info handy. Log out from all devices and reset your password if you suspect any unauthorized access.
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
