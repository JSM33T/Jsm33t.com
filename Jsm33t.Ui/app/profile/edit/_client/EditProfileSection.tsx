'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { apiClient } from '@/lib/apiClient';
import { modalRef } from '@/components/ui/ModalBox';
import { useUser } from '@/context/UserContext';
import { HTML_UTIL_setBodyBg } from '@/lib/htmlUtils';

type ProfileForm = {
	firstName: string;
	lastName: string;
	userName: string;
	gender: string;
	bio: string;
	avatar?: string;
	email?: string;
};

const DEFAULT_AVATAR = '/assets/images/default_user.jpg';

// --- Utility for user update (context + localStorage) ---
const syncUser = (form: ProfileForm) => {
	const userObj = {
		firstName: form.firstName,
		lastName: form.lastName,
		username: form.userName,
		avatar: form.avatar || DEFAULT_AVATAR,
		email: form.email || '',
	};
	return userObj;
};

export default function ProfileEditPanel() {
	const [form, setForm] = useState<ProfileForm>({
		firstName: '',
		lastName: '',
		userName: '',
		gender: '',
		bio: '',
		avatar: '',
		email: '',
	});
	const { setUser } = useUser();
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [saving, setSaving] = useState(false);
	const [savingAvatar, setSavingAvatar] = useState(false);

	// Load profile data
	useEffect(() => {
		apiClient.get<ProfileForm>('/profile/get').then(res => {
			if (res.status === 200 && res.data) {
				setForm({
					firstName: res.data.firstName || '',
					lastName: res.data.lastName || '',
					userName: res.data.userName || '',
					gender: res.data.gender || '',
					bio: res.data.bio || '',
					avatar: res.data.avatar || DEFAULT_AVATAR,
					email: res.data.email || '',
				});
			}
		});
		HTML_UTIL_setBodyBg('bg-secondary');
	}, []);

	// Generic change handler
	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	// Avatar preview + file capture
	const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setAvatarFile(e.target.files[0]);
			setForm(prev => ({ ...prev, avatar: URL.createObjectURL(e.target.files![0]) }));
		}
	};

	// Modal feedback utility
	const showModal = (title: string, description: string) => {
		modalRef.current?.open({ title, description, bodyList: [] });
	};

	// Save (profile text fields)
	const handleSave = async () => {
		setSaving(true);
		try {
			const res = await apiClient.post('/profile/update', {
				firstName: form.firstName,
				lastName: form.lastName,
				userName: form.userName,
				gender: form.gender,
				bio: form.bio
			});
			if (res.status === 200) {
				const userObj = syncUser(form);
				setUser(userObj);
				localStorage.setItem("user", JSON.stringify(userObj));
				showModal("Profile Saved", res.message || "Profile updated.");
			} else {
				showModal("Failed", res.message || "Profile update failed.");
			}
		} finally {
			setSaving(false);
		}
	};

	const handleSaveAvatar = async () => {
		if (!avatarFile) {
			showModal("No Image", "Please select an image to upload.");
			return;
		}
		setSavingAvatar(true);
		try {
			const data = new FormData();
			data.append('Avatar', avatarFile);

			const res = await apiClient.post<{ url: string }>('/profile/updatepfp', data);
			if (res.status === 200 && res.data?.url) {
				const newAvatar = res.data.url;

				// Merge with previous user (ALWAYS!)
				const prevUser = JSON.parse(localStorage.getItem('user') || '{}');
				const userObj = {
					...prevUser,
					avatar: newAvatar,
				};
				setUser(userObj);
				localStorage.setItem("user", JSON.stringify(userObj));

				// Update form for preview/UI
				setForm(prev => ({ ...prev, avatar: newAvatar }));

				showModal("Profile Picture Updated", res.message || "Profile picture updated successfully.");
			} else {
				showModal("Failed", res.message || "Could not update profile picture.");
			}
		} finally {
			setSavingAvatar(false);
		}
	};

	return (
		// EditProfile.jsx
		<section className='container pb-lg-2 pb-xl-4'>
			{/* Profile Picture */}
			<div className="card border-0 p-4 mb-4 shadow-sm bg-body">
				<h3 className="h5 mb-3">Profile Picture</h3>
				<div className="mb-3 d-flex align-items-center">
					<label
						htmlFor="avatar-upload"
						className="rounded-circle bg-size-cover bg-position-center flex-shrink-0"
						style={{
							width: 80,
							height: 80,
							backgroundImage: `url(${form.avatar || DEFAULT_AVATAR})`,
							cursor: 'pointer'
						}}
						aria-label="Upload picture"
					>
						<span className="d-block text-light text-center lh-1 pb-1" style={{ backgroundColor: 'rgba(0,0,0,.5)' }}>
							<i className="ai-camera"></i>
						</span>
					</label>
					<input
						type="file"
						id="avatar-upload"
						accept="image/*"
						onChange={handleAvatar}
						style={{ display: 'none' }}
					/>
					<div className="ps-3">
						<h3 className="h6 mb-1">Change Photo</h3>
						<p className="fs-sm text-muted mb-0">PNG/JPG up to 1000px.</p>
					</div>
				</div>
				<button className="btn btn-primary" type="button" onClick={handleSaveAvatar} disabled={savingAvatar}>
					{savingAvatar ? "Saving..." : "Save Image"}
				</button>
			</div>
			{/* Profile Fields */}
			<div className="card border-0 p-4">
				<h3 className="h5 mb-3">Edit Profile Info</h3>
				<div className="mb-3">
					<label className="form-label" htmlFor="firstName">First name</label>
					<input className="form-control" type="text" name="firstName" value={form.firstName} id="firstName" onChange={handleChange} />
				</div>
				<div className="mb-3">
					<label className="form-label" htmlFor="lastName">Last name</label>
					<input className="form-control" type="text" name="lastName" value={form.lastName} id="lastName" onChange={handleChange} />
				</div>
				<div className="mb-3">
					<label className="form-label" htmlFor="userName">Username</label>
					<input className="form-control" type="text" name="userName" value={form.userName} id="userName" onChange={handleChange} />
				</div>
				<div className="mb-3">
					<label className="form-label me-3">Gender:</label>
					{[
						{ value: "m", label: "Male" },
						{ value: "f", label: "Female" },
						{ value: "o", label: "Other" }
					].map((g) => (
						<div className="form-check form-check-inline" key={g.value}>
							<input
								className="form-check-input"
								type="radio"
								name="gender"
								value={g.value}
								id={`gender-${g.value}`}
								checked={form.gender === g.value}
								onChange={handleChange}
							/>
							<label className="form-check-label" htmlFor={`gender-${g.value}`}>{g.label}</label>
						</div>
					))}
				</div>
				<div className="mb-3">
					<label className="form-label" htmlFor="bio">Bio</label>
					<textarea className="form-control" name="bio" rows={3} value={form.bio} id="bio" onChange={handleChange}></textarea>
				</div>
				<div className="d-flex justify-content-end">
					<button className="btn btn-primary" type="button" onClick={handleSave} disabled={saving}>
						{saving ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</div>
		</section>

	// <section className='container pb-lg-2 pb-xl-4 py-xxl-5 my-5'>
	// 	{/* Profile Picture Panel */}
	// 	<div className="card border-0 p-4 mb-4">
	// 		<h3 className="h5 mb-3">Profile Picture</h3>
	// 		<div className="mb-3 d-flex align-items-center">
	// 			<label
	// 				htmlFor="avatar-upload"
	// 				className="rounded-circle bg-size-cover bg-position-center flex-shrink-0"
	// 				style={{
	// 					width: 80,
	// 					height: 80,
	// 					backgroundImage: `url(${form.avatar || DEFAULT_AVATAR})`,
	// 					cursor: 'pointer'
	// 				}}
	// 				aria-label="Upload picture"
	// 			>
	// 				<span className="d-block text-light text-center lh-1 pb-1" style={{ backgroundColor: 'rgba(0,0,0,.5)' }}>
	// 					<i className="ai-camera"></i>
	// 				</span>
	// 			</label>
	// 			<input
	// 				type="file"
	// 				id="avatar-upload"
	// 				accept="image/*"
	// 				onChange={handleAvatar}
	// 				style={{ display: 'none' }}
	// 			/>
	// 			<div className="ps-3">
	// 				<h3 className="h6 mb-1">Change Photo</h3>
	// 				<p className="fs-sm text-body-secondary mb-0">PNG/JPG up to 1000px.</p>
	// 			</div>
	// 		</div>
	// 		<button className="btn btn-primary" type="button" onClick={handleSaveAvatar} disabled={savingAvatar}>
	// 			{savingAvatar ? "Saving..." : "Save Image"}
	// 		</button>
	// 	</div>

	// 	{/* Profile Text Fields Panel */}
	// 	<div className="card border-0 p-4">
	// 		<h3 className="h5 mb-3">Edit Profile Info</h3>
	// 		<div className="mb-3">
	// 			<label className="form-label" htmlFor="firstName">First name</label>
	// 			<input className="form-control" type="text" name="firstName" value={form.firstName} id="firstName" onChange={handleChange} />
	// 		</div>
	// 		<div className="mb-3">
	// 			<label className="form-label" htmlFor="lastName">Last name</label>
	// 			<input className="form-control" type="text" name="lastName" value={form.lastName} id="lastName" onChange={handleChange} />
	// 		</div>
	// 		<div className="mb-3">
	// 			<label className="form-label" htmlFor="userName">Username</label>
	// 			<input className="form-control" type="text" name="userName" value={form.userName} id="userName" onChange={handleChange} />
	// 		</div>
	// 		<div className="mb-3">
	// 			<label className="form-label me-3">Gender:</label>
	// 			{[
	// 				{ value: "m", label: "Male" },
	// 				{ value: "f", label: "Female" },
	// 				{ value: "o", label: "Other" }
	// 			].map((g) => (
	// 				<div className="form-check form-check-inline" key={g.value}>
	// 					<input
	// 						className="form-check-input"
	// 						type="radio"
	// 						name="gender"
	// 						value={g.value}
	// 						id={`gender-${g.value}`}
	// 						checked={form.gender === g.value}
	// 						onChange={handleChange}
	// 					/>
	// 					<label className="form-check-label" htmlFor={`gender-${g.value}`}>{g.label}</label>
	// 				</div>
	// 			))}
	// 		</div>
	// 		<div className="mb-3">
	// 			<label className="form-label" htmlFor="bio">Bio</label>
	// 			<textarea className="form-control" name="bio" rows={3} value={form.bio} id="bio" onChange={handleChange}></textarea>
	// 		</div>
	// 		<div className="d-flex justify-content-end">
	// 			<button className="btn btn-primary" type="button" onClick={handleSave} disabled={saving}>
	// 				{saving ? "Saving..." : "Save Changes"}
	// 			</button>
	// 		</div>
	// 	</div>
	// </section>
	);
}
