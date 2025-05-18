// lib/music-data.ts
export const musicList = [
	{
		slug: 'falana',
		albumName: 'Sunrise Sessions',
		releaseDate: '2024-10-01',
		artists: ['Nora Waves'],
		cover: '/music/sunrise-sessions/cover.jpg',
		description: 'A tranquil journey through soundscapes of dawn.'
	},
	// more entries...
];

export function getMusicBySlug(slug: string) {
	return musicList.find((m) => m.slug === slug);
}

export function getAllSlugs() {
	return musicList.map((m) => m.slug);
}
