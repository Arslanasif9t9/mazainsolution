import { useRef, useEffect } from 'react';

/**
 * Plays selected time-ranges ("chunks") from a single background video,
 * one after another, looping back to the first chunk at the end.
 * Example chunks: [{ start: 0, end: 5 }, { start: 20, end: 25 }, { start: 45, end: 50 }]
 */
export default function HeroBackgroundVideo({ src, chunks = [] }) {
  const videoRef = useRef(null);
  const chunkIndexRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || chunks.length === 0) return;

    // Start playback at the first chunk's start time
    const playChunk = (index) => {
      video.currentTime = chunks[index].start;
      video.play().catch(() => {});
    };

    const handleTimeUpdate = () => {
      const current = chunks[chunkIndexRef.current];
      if (video.currentTime >= current.end) {
        chunkIndexRef.current = (chunkIndexRef.current + 1) % chunks.length;
        playChunk(chunkIndexRef.current);
      }
    };

    const handleLoadedMetadata = () => playChunk(0);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [chunks]);

  if (!src) return null;

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover object-top z-0 opacity-60"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}