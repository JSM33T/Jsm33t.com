import type { Metadata } from 'next';
// import Testimonials from './_client/Testimonials';
// import AlbumFeatures from './_client/Albums';
// import MapSection from './_client/MapSection';
// import VideoSection from './_client/VideoSection';
// import PlayButton from './_client/Sample';
import NewAlbum from './_client/NewAlbum';

export const metadata: Metadata = {
	title: 'Music',
	description: 'All about remixes, bootlegs, originals and beyond',
};


export default function MusicPage() {
	return (
		<>
			{/* <AlbumFeatures/> */}
			<NewAlbum />
			{/* <Testimonials/> */}
			{/* <VideoSection /> */}
			{/* <PlayButton/> */}
			{/* <MapSection /> */}
		</>
	);
}