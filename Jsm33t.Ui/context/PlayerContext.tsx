'use client';

import {
	createContext,
	useContext,
	useState,
	useRef,
	useEffect,
	type ReactNode,
	type ChangeEvent,
} from 'react';

// Types
export type MusicTrack = {
	slug: string;
	url: string;
	title: string;
	artist: string;
};

type PlayerContextType = {
	currentTrack: MusicTrack | null;
	isPlaying: boolean;
	showPlayer: boolean;
	play: (track: MusicTrack) => void;
	pause: () => void;
	stop: () => void;
	setShowPlayer: (val: boolean) => void;
};

// Helpers
const formatTime = (seconds: number) => {
	const m = Math.floor(seconds / 60);
	const s = Math.floor(seconds % 60);
	return `${m}:${s.toString().padStart(2, '0')}`;
};

// Context
const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
	const ctx = useContext(PlayerContext);
	if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
	return ctx;
};

// Provider
function PlayerProvider({ children }: { children: ReactNode }) {
	const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showPlayer, setShowPlayer] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (!audioRef.current) {
			audioRef.current = new Audio();
		}
	}, []);

	const play = (track: MusicTrack) => {
		if (!audioRef.current) return;

		try {
			const context = new (window.AudioContext || (window as any).webkitAudioContext)();
			if (context.state === 'suspended') context.resume();
		} catch (e) {
			console.warn('AudioContext resume skipped', e);
		}

		if (currentTrack?.slug !== track.slug) {
			audioRef.current.src = track.url;
			setCurrentTrack(track);
		}

		audioRef.current
			.play()
			.then(() => {
				setIsPlaying(true);
				setShowPlayer(true);
			})
			.catch((err) => {
				console.error('Playback error:', err);
				setIsPlaying(false);
			});
	};

	const pause = () => {
		audioRef.current?.pause();
		setIsPlaying(false);
	};

	const stop = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
			setIsPlaying(false);
		}
	};

	return (
		<PlayerContext.Provider
			value={{ currentTrack, isPlaying, play, pause, stop, showPlayer, setShowPlayer }}
		>
			{children}
			<audio ref={audioRef} hidden id="global-audio" />
		</PlayerContext.Provider>
	);
}

// UI Component
function PlayerUI({ track }: { track: MusicTrack }) {
	const { isPlaying, play, pause, stop } = usePlayer();
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	const audioCtxRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const sourceCreated = useRef(false);

	useEffect(() => {
		console.log('Initializing audio element');
		//TODO: open canvas if its not opened
		audioRef.current = document.getElementById('global-audio') as HTMLAudioElement;
		if (!audioRef.current) return;

		const updateTime = () => setCurrentTime(audioRef.current!.currentTime);
		const updateDuration = () => setDuration(audioRef.current!.duration);

		audioRef.current.addEventListener('timeupdate', updateTime);
		audioRef.current.addEventListener('loadedmetadata', updateDuration);

		return () => {
			audioRef.current?.removeEventListener('timeupdate', updateTime);
			audioRef.current?.removeEventListener('loadedmetadata', updateDuration);
		};
	}, []);

	useEffect(() => {
		if (!audioRef.current || !canvasRef.current) return;

		if (!audioCtxRef.current) {
			audioCtxRef.current = new AudioContext();
		}

		const audioCtx = audioCtxRef.current;
		if (audioCtx.state === 'suspended') {
			audioCtx.resume();
		}

		if (!sourceCreated.current) {
			const source = audioCtx.createMediaElementSource(audioRef.current);
			const analyser = audioCtx.createAnalyser();
			source.connect(analyser);
			analyser.connect(audioCtx.destination);
			analyser.fftSize = 128;

			analyserRef.current = analyser;
			sourceCreated.current = true;
		}

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const analyser = analyserRef.current;
		if (!ctx || !analyser) return;

		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);

		const draw = () => {
			requestAnimationFrame(draw);
			analyser.getByteFrequencyData(dataArray);
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const barWidth = (canvas.width / bufferLength) * 1.8;
			let x = 0;

			for (let i = 0; i < bufferLength; i++) {
				const barHeight = dataArray[i] * 1.2;
				const r = 0;
				const g = dataArray[i] + 100;
				const b = 255;

				ctx.fillStyle = `rgb(${r},${g},${b})`;
				ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
				x += barWidth + 1;
			}
		};

		draw();
	}, []);

	const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
		if (audioRef.current) {
			const t = Number(e.target.value);
			audioRef.current.currentTime = t;
			setCurrentTime(t);
		}
	};

	return (
		<div className="mt-4">
			<div className="text-center mb-3">
				<h5>{track.title}</h5>
				<p className="text-secondary mb-0">{track.artist}</p>
			</div>

			<canvas
				ref={canvasRef}
				width={600}
				height={100}
				className="w-100 bg-dark rounded"
				style={{ display: 'block', height: 100 }}
			/>

			<div className="d-flex align-items-center justify-content-between mt-3">
				<small className="text-nowrap me-2" style={{ minWidth: 90 }}>
					{formatTime(currentTime)} / {formatTime(duration)} <br />
					<span className="text-secondary">-{formatTime(duration - currentTime)}</span>
				</small>

				<input
					type="range"
					min={0}
					max={duration || 0}
					value={currentTime}
					step={1}
					onChange={handleSeek}
					className="form-range flex-grow-1 mx-2"
					style={{ height: '2px' }}
				/>
			</div>

			<div className="mt-3 d-flex gap-2 justify-content-center">
				{isPlaying ? (
					<button className="btn btn-sm btn-outline-light" onClick={pause}>
						Pause
					</button>
				) : (
					<button className="btn btn-sm btn-success" onClick={() => play(track)}>
						Play
					</button>
				)}
				<button className="btn btn-sm btn-danger" onClick={stop}>
					Stop
				</button>
			</div>
		</div>
	);
}

// Exports
export { PlayerProvider, PlayerUI };
