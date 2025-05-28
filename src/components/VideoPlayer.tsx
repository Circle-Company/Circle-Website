"use client";

import { useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  className?: string;
  aspectRatio?: 'video' | 'vertical' | 'square' | 'auto';
}

export function VideoPlayer({ 
  src, 
  poster, 
  title, 
  description, 
  className = "",
  aspectRatio = 'auto'
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    setShowControls(!showControls);
    setTimeout(() => setShowControls(false), 3000);
  };

  // Determinar a classe de aspect ratio baseada na prop
  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'video':
        return 'aspect-video';
      case 'vertical':
        return 'aspect-[9/16]';
      case 'square':
        return 'aspect-square';
      case 'auto':
      default:
        return 'h-full w-full';
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${getAspectClass()}`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover cursor-pointer"
          poster={poster}
          onClick={handleVideoClick}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          muted
          playsInline
        >
          <source src={src} type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
        
        {/* Play/Pause overlay */}
        {(!isPlaying || showControls) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity">
            <button 
              onClick={handlePlay}
              className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg backdrop-blur-sm"
            >
              {isPlaying ? (
                // Pause icon
                <div className="flex gap-1">
                  <div className="w-1.5 h-5 md:w-2 md:h-6 bg-black rounded"></div>
                  <div className="w-1.5 h-5 md:w-2 md:h-6 bg-black rounded"></div>
                </div>
              ) : (
                // Play icon
                <div className="w-0 h-0 border-l-[10px] md:border-l-[12px] border-l-black border-t-[7px] md:border-t-[8px] border-t-transparent border-b-[7px] md:border-b-[8px] border-b-transparent ml-1"></div>
              )}
            </button>
          </div>
        )}
        
        {/* Video info overlay */}
        {(title || description) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
            {title && (
              <h3 className="text-white font-bold text-base md:text-lg mb-2">{title}</h3>
            )}
            {description && (
              <p className="text-gray-300 text-xs md:text-sm">{description}</p>
            )}
          </div>
        )}
        
        {/* Loading indicator */}
        {isPlaying && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
} 