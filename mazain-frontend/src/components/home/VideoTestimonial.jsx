import { useRef, useState } from 'react';

// Detects link type and extracts the ID needed to embed it
function getYouTubeId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? match[1] : null;
}

function getTikTokId(url) {
  const match = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  return match ? match[1] : null;
}

export default function VideoTestimonial({ src }) {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  const youtubeId = getYouTubeId(src);
  const tiktokId = getTikTokId(src);

  // Shared "click to play" thumbnail overlay, used for both YouTube and TikTok
  if (youtubeId || tiktokId) {
    return (
      <div className="relative bg-black rounded-3xl overflow-hidden aspect-[9/16]">
        {!hasStarted ? (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black cursor-pointer group"
            onClick={() => setHasStarted(true)}
          >
            {youtubeId && (
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
            )}
            <div className="relative w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
              <span className="text-black text-xl ml-1">▶</span>
            </div>
          </div>
        ) : youtubeId ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="relative bg-black rounded-[32px] overflow-hidden aspect-[9/16]">
  <iframe
    className="absolute inset-0 w-full h-full border-0 overflow-hidden"
    src={`https://www.tiktok.com/embed/v2/${tiktokId}`}
    title="TikTok video"
    allow="autoplay; encrypted-media; picture-in-picture"
    allowFullScreen
    scrolling="no"
  />
</div>
        )}
      </div>
    );
  }

  // Direct video file (.mp4 etc.) — original click-to-play behavior, unchanged
  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasStarted) {
      video.muted = false;
      video.play().then(() => setHasStarted(true)).catch(() => {});
    } else if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (video) video.currentTime = 0;
  };

  return (
    <div className="relative bg-black rounded-3xl overflow-hidden aspect-[9/16] cursor-pointer group" onClick={handleClick}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        preload="auto"
        muted
        src={src}
        onEnded={handleEnded}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
          <span className="text-black text-xl ml-1">▶</span>
        </div>
      </div>
    </div>
  );
}