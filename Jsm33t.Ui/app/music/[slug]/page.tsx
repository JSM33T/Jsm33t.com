import { getMusicBySlug } from '@/lib/music-data';
import { notFound } from 'next/navigation';

type Props = {
	params: { slug: string };
};

export default function MusicPage({ params }: { params: { slug: string } }) {
	const music = getMusicBySlug(params.slug);
	if (!music) return notFound();

	return (
		<div className="container py-5 pt-5 mt-5">
			<h1>{music.albumName}</h1>
			<p>Released: {music.releaseDate}</p>
			<p>Artists: {music.artists.join(', ')}</p>
		</div>
	);
}

