'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/apiClient';
import { HTML_UTIL_setBodyBg } from '@/lib/htmlUtils';
import Image from 'next/image';

type ProfileData = {
	id: number;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	userName: string;
	bio: string;
	createdAt: string;
	points: number;
	gender: string;
	avatar: string;
	role: string;
};

export default function ProfileSection() {
	const [profile, setProfile] = useState<ProfileData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		apiClient.get<ProfileData>('/profile/get')
			.then(res => {
				if (res.status === 200) setProfile(res.data);
			})
			.finally(() => setLoading(false));
		HTML_UTIL_setBodyBg('bg-secondary');
	}, []);

	if (loading)
		return <p className="text-center py-5">Loading profile...</p>;
	if (!profile)
		return <p className="text-center py-5 text-danger">Failed to load profile.</p>;

	const fullName = `${profile.firstName} ${profile.lastName}`;

	return (
		<section className="bg-body text-body card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
			<div className="card-body">
				{/* Heading */}
				<div className="d-flex align-items-center mt-sm-n1 pb-4 mb-0 mb-lg-1 mb-xl-3">
					<i className="ai-user text-primary lead pe-1 me-2"></i>
					<h2 className="h4 mb-0">Basic Info</h2>
					<a className="btn btn-sm btn-outline-secondary ms-auto" href="/account-settings">
						<i className="ai-edit ms-n1 me-2"></i>Edit Info
					</a>
				</div>

				{/* User Info */}
				<div className="d-md-flex align-items-center">
					<div className="d-sm-flex align-items-center">
						<div
							className="rounded-circle bg-size-cover bg-position-center flex-shrink-0"
							style={{
								width: 80,
								height: 80,
								backgroundImage: `url(${profile.avatar})`,
							}}
						></div>
						<div className="pt-3 pt-sm-0 ps-sm-3">
							<h3 className="h5 mb-2">
								{fullName}
								<i className="ai-circle-check-filled fs-base text-success ms-2"></i>
							</h3>
							<div className="text-muted fw-medium d-flex flex-wrap">
								<div className="d-flex align-items-center me-3">
									<i className="ai-mail me-1"></i>
									{profile.email}
								</div>
								<div className="d-flex align-items-center text-nowrap">
									<i className="ai-id-badge me-1"></i>
									@{profile.userName}
								</div>
							</div>
						</div>
					</div>

					{/* Profile Completion Bar */}
					<div className="w-100 pt-3 pt-md-0 ms-md-auto" style={{ maxWidth: 212 }}>
						<div className="d-flex justify-content-between fs-sm pb-1 mb-2">
							XP
							<strong className="ms-2">{profile.points}</strong>
						</div>
						<div className="progress" style={{ height: 5 }}>
							<div
								className="progress-bar"
								role="progressbar"
								style={{ width: `${profile.points}%` }}
								aria-valuenow={profile.points}
								aria-valuemin={0}
								aria-valuemax={100}
							></div>
						</div>
					</div>
				</div>

				{/* Details Table & Bonuses */}
				<div className="row py-4 mb-2 mb-sm-3">
					<div className="col-md-6 mb-4 mb-md-0">
						<table className="table mb-0 text-body">
							<tbody>
								<tr>
									<td className="border-0 text-muted py-1 px-0">Gender</td>
									<td className="border-0 fw-medium py-1 ps-3">{profile.gender}</td>
								</tr>
								<tr>
									<td className="border-0 text-muted py-1 px-0">Role</td>
									<td className="border-0 fw-medium py-1 ps-3">{profile.role}</td>
								</tr>
								<tr>
									<td className="border-0 text-muted py-1 px-0">Joined</td>
									<td className="border-0 fw-medium py-1 ps-3">
										{new Date(profile.createdAt).toLocaleDateString()}
									</td>
								</tr>
								<tr>
									<td className="border-0 text-muted py-1 px-0">Bio</td>
									<td className="border-0 fw-medium py-1 ps-3">{profile.bio}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="col-md-6 d-md-flex justify-content-end">
						<div className="w-100 border rounded-3 p-4 bg-light bg-opacity-10 text-body" style={{ maxWidth: 212 }}>
							<Image
								src="/icons/gift-icon.svg"
								alt="Gift icon"
								width={24}
								height={24}
								className="d-block mb-2"
							/>
							<h4 className="h5 lh-base mb-0">123 bonuses</h4>
							<p className="fs-sm text-muted mb-0">1 bonus = $1</p>
						</div>
					</div>
				</div>

				{/* Alert */}
				<div className="alert alert-info d-flex mb-0" role="alert">
					<i className="ai-circle-info fs-xl"></i>
					<div className="ps-2">
						Fill in the information 100% to receive more suitable offers.
						<a className="alert-link ms-1" href="/account-settings">Go to settings!</a>
					</div>
				</div>
			</div>
		</section>

	);
}
