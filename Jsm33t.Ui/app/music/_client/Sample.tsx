'use client';

import { MusicTrack, usePlayer } from "@/context/PlayerContext";

const tracks: MusicTrack[] = [
	{
		slug: 'sunrise-sessions',
		url: '/assets/sample.mp3',
		title: 'Sunrise Sessions',
		artist: 'Nora Waves',
	},
	{
		slug: 'evening-chill',
		url: '/assets/sample2.mp3',
		title: 'Evening Chill',
		artist: 'Sky Breeze',
	},
	{
		slug: 'night-drive',
		url: '/assets/sample3.mp3',
		title: 'Night Drive',
		artist: 'Moonlight Beats',
	},
];

export default function PlayButton() {
	const { play } = usePlayer();

	return (
		<div className="d-flex flex-column gap-2">
			{tracks.map((track) => (
				<button
					key={track.slug}
					onClick={() => play(track)}
					className="btn btn-primary"
				>
					▶ Play {track.title} – {track.artist}
				</button>
			))}
		</div>
	);
}
