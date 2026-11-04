'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles, Play, Pause, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const YOUTUBE_VIDEO_ID = 'N-ZdH5kQQ1I';
const START_SECONDS = 254; // 4:14
const END_SECONDS = 294;   // 4:54

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [volume, setVolume] = useState(90);

  const playerRef = useRef<any>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load YouTube IFrame API script
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player('youtube-audio-frame', {
        height: '100',
        width: '100',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          start: START_SECONDS,
          end: END_SECONDS,
          playsinline: 1,
          origin: typeof window !== 'undefined' ? window.location.origin : '',
        },
        events: {
          onReady: (event: any) => {
            setIsPlayerReady(true);
            event.target.setVolume(90);
            event.target.seekTo(START_SECONDS, true);
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING = 1, ENDED = 0, PAUSED = 2
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              // Video reached the end, loop back to 4:14
              event.target.seekTo(START_SECONDS, true);
              event.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Time loop watcher: checks every 400ms to ensure playback stays strictly between 4:14 (254s) and 4:54 (294s)
  useEffect(() => {
    if (isPlaying) {
      checkIntervalRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const currentTime = playerRef.current.getCurrentTime();
          // If past 4:54 or before 4:14 while playing, snap back to 4:14
          if (currentTime >= END_SECONDS || currentTime < START_SECONDS - 2) {
            playerRef.current.seekTo(START_SECONDS, true);
          }
        }
      }, 400);
    } else {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
    }

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
    };
  }, [isPlaying]);

  const playMusic = () => {
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.seekTo(START_SECONDS, true);
        playerRef.current.playVideo();
        setIsPlaying(true);
        setHasInteracted(true);
      } catch (err) {
        console.warn('Playback request error', err);
      }
    }
  };

  const pauseMusic = () => {
    if (playerRef.current && isPlayerReady) {
      try {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } catch (err) {
        console.warn('Pause request error', err);
      }
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  // Start music automatically on first user click anywhere on page (browser autoplay policy standard)
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (!hasInteracted && isPlayerReady) {
        playMusic();
        setHasInteracted(true);
      }
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, [hasInteracted, isPlayerReady]);

  return (
    <>
      {/* Hidden YouTube Iframe container (positioned offscreen but active for audio) */}
      <div className="fixed -bottom-96 -left-96 w-10 h-10 pointer-events-none opacity-0 overflow-hidden z-0">
        <div id="youtube-audio-frame" />
      </div>

      {/* Floating Music Player Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Expanded Info Card (Toggleable) */}
        <AnimatePresence>
          {showCard && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="bg-white/95 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-rose-200 w-72 text-left space-y-3 mb-1"
            >
              <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                <div className="flex items-center gap-1.5 text-rose-600 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sayana&apos;s Special Song</span>
                </div>
                <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full">
                  4:14 ➔ 4:54 Loop
                </span>
              </div>

              <div>
                <h4 className="font-serif font-bold text-gray-900 text-sm">
                  Magale (Sai Abhyankar)
                </h4>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Playing the most romantic climax portion for Sayana 🌸
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={toggleMusic}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-xs shadow-md hover:from-rose-600 hover:to-pink-600 flex items-center gap-1.5 transition-all"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause Song</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Play Song</span>
                    </>
                  )}
                </button>

                <a
                  href="https://www.youtube.com/watch?v=N-ZdH5kQQ1I"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-gray-400 hover:text-rose-600 flex items-center gap-1 font-medium transition-colors"
                >
                  <span>Open Video</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Player Pill & Control Button */}
        <div className="flex items-center gap-2">
          {/* Label Pill */}
          <button
            onClick={() => setShowCard(!showCard)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-rose-200 text-xs text-rose-700 font-semibold hover:bg-rose-50/80 transition-all cursor-pointer group"
          >
            <Music className={`w-3.5 h-3.5 text-rose-500 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <span className="hidden sm:inline">
              {isPlaying ? 'Playing: Magale (4:14 - 4:54) 🎶' : 'Sayana&apos;s Song (Magale)'}
            </span>
            <span className="sm:hidden">
              {isPlaying ? 'Magale 🎶' : 'Song'}
            </span>
          </button>

          {/* Round Toggle Button */}
          <button
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pause song' : 'Play song'}
            className={`relative p-3.5 rounded-full transition-all duration-300 shadow-xl flex items-center justify-center ${
              isPlaying
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white ring-4 ring-rose-300/50 scale-105 shadow-rose-300/60'
                : 'bg-white/95 backdrop-blur-md text-rose-600 border border-rose-200 hover:scale-105'
            }`}
          >
            {isPlaying ? (
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-5 h-5 animate-pulse" />
                {/* Animated visualizer bars */}
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-0.5 bg-white rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
                  <span className="w-0.5 bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s] h-4" />
                  <span className="w-0.5 bg-white rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s] h-2.5" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <VolumeX className="w-5 h-5" />
                <Play className="w-3.5 h-3.5 fill-rose-600" />
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
