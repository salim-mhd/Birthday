'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Music, Sparkles, Play, Pause, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Song 1: Magale (Sai Abhyankar) - 4:14 to 4:54
const SONG_1_ID = 'N-ZdH5kQQ1I';
const SONG_1_START = 254; // 4:14
const SONG_1_END = 294;   // 4:54

// Song 2: Punchiri (Paal Polethe Punchiri) for "The Girl With My Favorite Smile" section
const SONG_2_ID = '1tk5yb5EKlk';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSong, setActiveSong] = useState<'magale' | 'punchiri'>('magale');
  const [isPlayer1Ready, setIsPlayer1Ready] = useState(false);
  const [isPlayer2Ready, setIsPlayer2Ready] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const player1Ref = useRef<any>(null);
  const player2Ref = useRef<any>(null);
  const userAudioEnabledRef = useRef<boolean>(false);
  const isInMomentsRef = useRef<boolean>(false);
  const checkLoopIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize YouTube Iframe API for both players
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }

    const initPlayers = () => {
      if (!window.YT || !window.YT.Player) return;

      // Player 1: Magale
      if (!player1Ref.current) {
        player1Ref.current = new window.YT.Player('youtube-audio-frame-1', {
          height: '100',
          width: '100',
          videoId: SONG_1_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            start: SONG_1_START,
            end: SONG_1_END,
            playsinline: 1,
            origin: typeof window !== 'undefined' ? window.location.origin : '',
          },
          events: {
            onReady: (event: any) => {
              setIsPlayer1Ready(true);
              event.target.setVolume(90);
              event.target.seekTo(SON_1_START, true);
            },
            onStateChange: (event: any) => {
              if (event.data === 1 && !isInMomentsRef.current) {
                setIsPlaying(true);
                setActiveSong('magale');
              } else if (event.data === 0) {
                // Loop back to 4:14
                event.target.seekTo(SONG_1_START, true);
                if (userAudioEnabledRef.current && !isInMomentsRef.current) {
                  event.target.playVideo();
                }
              }
            },
          },
        });
      }

      // Player 2: Punchiri (for "The Girl With My Favorite Smile")
      if (!player2Ref.current) {
        player2Ref.current = new window.YT.Player('youtube-audio-frame-2', {
          height: '100',
          width: '100',
          videoId: SONG_2_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            playsinline: 1,
            origin: typeof window !== 'undefined' ? window.location.origin : '',
          },
          events: {
            onReady: (event: any) => {
              setIsPlayer2Ready(true);
              event.target.setVolume(95);
            },
            onStateChange: (event: any) => {
              if (event.data === 1 && isInMomentsRef.current) {
                setIsPlaying(true);
                setActiveSong('punchiri');
              } else if (event.data === 0) {
                // Loop song 2 if still in section
                if (userAudioEnabledRef.current && isInMomentsRef.current) {
                  event.target.seekTo(0, true);
                  event.target.playVideo();
                }
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayers();
    } else {
      window.onYouTubeIframeAPIReady = initPlayers;
    }

    return () => {
      if (checkLoopIntervalRef.current) {
        clearInterval(checkLoopIntervalRef.current);
      }
      try {
        if (player1Ref.current?.destroy) player1Ref.current.destroy();
        if (player2Ref.current?.destroy) player2Ref.current.destroy();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  const SON_1_START = SONG_1_START;

  // Active loop monitor for Song 1 (Magale: 4:14 to 4:54)
  useEffect(() => {
    if (isPlaying && activeSong === 'magale') {
      checkLoopIntervalRef.current = setInterval(() => {
        if (player1Ref.current && typeof player1Ref.current.getCurrentTime === 'function') {
          const currentTime = player1Ref.current.getCurrentTime();
          if (currentTime >= SONG_1_END || currentTime < SONG_1_START - 2) {
            player1Ref.current.seekTo(SONG_1_START, true);
          }
        }
      }, 400);
    } else {
      if (checkLoopIntervalRef.current) {
        clearInterval(checkLoopIntervalRef.current);
        checkLoopIntervalRef.current = null;
      }
    }

    return () => {
      if (checkLoopIntervalRef.current) {
        clearInterval(checkLoopIntervalRef.current);
        checkLoopIntervalRef.current = null;
      }
    };
  }, [isPlaying, activeSong]);

  // Transition handler between songs
  const switchSong = useCallback((toMoments: boolean) => {
    isInMomentsRef.current = toMoments;

    if (!userAudioEnabledRef.current) return;

    if (toMoments) {
      // Pause Song 1 (Magale)
      if (player1Ref.current && typeof player1Ref.current.pauseVideo === 'function') {
        player1Ref.current.pauseVideo();
      }
      // Play Song 2 (Punchiri)
      if (player2Ref.current && typeof player2Ref.current.playVideo === 'function') {
        player2Ref.current.playVideo();
      }
      setActiveSong('punchiri');
      setIsPlaying(true);
    } else {
      // Pause Song 2 (Punchiri)
      if (player2Ref.current && typeof player2Ref.current.pauseVideo === 'function') {
        player2Ref.current.pauseVideo();
      }
      // Resume Song 1 (Magale)
      if (player1Ref.current && typeof player1Ref.current.playVideo === 'function') {
        player1Ref.current.playVideo();
      }
      setActiveSong('magale');
      setIsPlaying(true);
    }
  }, []);

  // IntersectionObserver on #moments ("The Girl With My Favorite Smile")
  useEffect(() => {
    const momentsElem = document.getElementById('moments');
    if (!momentsElem) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisible = entry.isIntersecting;
        if (isVisible !== isInMomentsRef.current) {
          switchSong(isVisible);
        }
      },
      {
        threshold: 0.18, // Triggers when section enters view
      }
    );

    observer.observe(momentsElem);

    // Scroll listener fallback to ensure 100% reliability
    const handleScrollCheck = () => {
      const rect = momentsElem.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
      if (inView !== isInMomentsRef.current) {
        switchSong(inView);
      }
    };

    window.addEventListener('scroll', handleScrollCheck, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollCheck);
    };
  }, [switchSong]);

  // Toggle user audio on/off
  const toggleMusic = () => {
    if (isPlaying) {
      userAudioEnabledRef.current = false;
      if (player1Ref.current?.pauseVideo) player1Ref.current.pauseVideo();
      if (player2Ref.current?.pauseVideo) player2Ref.current.pauseVideo();
      setIsPlaying(false);
    } else {
      userAudioEnabledRef.current = true;
      if (isInMomentsRef.current) {
        if (player2Ref.current?.playVideo) player2Ref.current.playVideo();
        setActiveSong('punchiri');
      } else {
        if (player1Ref.current?.playVideo) {
          player1Ref.current.seekTo(SONG_1_START, true);
          player1Ref.current.playVideo();
        }
        setActiveSong('magale');
      }
      setIsPlaying(true);
    }
  };

  // Start audio on first user click anywhere (standard browser audio requirement)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!userAudioEnabledRef.current && isPlayer1Ready && isPlayer2Ready) {
        userAudioEnabledRef.current = true;
        if (isInMomentsRef.current) {
          if (player2Ref.current?.playVideo) player2Ref.current.playVideo();
          setActiveSong('punchiri');
        } else {
          if (player1Ref.current?.playVideo) {
            player1Ref.current.seekTo(SONG_1_START, true);
            player1Ref.current.playVideo();
          }
          setActiveSong('magale');
        }
        setIsPlaying(true);
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlayer1Ready, isPlayer2Ready]);

  return (
    <>
      {/* Hidden YouTube Iframe containers */}
      <div className="fixed -bottom-96 -left-96 w-10 h-10 pointer-events-none opacity-0 overflow-hidden z-0">
        <div id="youtube-audio-frame-1" />
        <div id="youtube-audio-frame-2" />
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
              className="bg-white/95 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-rose-200 w-80 text-left space-y-3 mb-1"
            >
              <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                <div className="flex items-center gap-1.5 text-rose-600 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Dual Romantic Soundtrack</span>
                </div>
                <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full">
                  Smart Auto-Switch ✨
                </span>
              </div>

              {/* Current Song Display */}
              <div className="space-y-1 p-2.5 rounded-2xl bg-rose-50/70 border border-rose-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                  {activeSong === 'punchiri' ? '🌸 Currently Playing (Smile Gallery):' : '🎵 Currently Playing (Main Theme):'}
                </div>
                <h4 className="font-serif font-bold text-gray-900 text-sm">
                  {activeSong === 'punchiri'
                    ? 'Punchiri (Paal Polethe Punchiri) 💫'
                    : 'Magale • Sai Abhyankar (4:14 ➔ 4:54 Loop)'}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  {activeSong === 'punchiri'
                    ? 'Special song playing exclusively for Sayana’s smiles!'
                    : 'Romantic background theme playing across the website.'}
                </p>
              </div>

              {/* Both Songs Summary */}
              <div className="text-[11px] text-gray-600 space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">1. Magale (Climax):</span>
                  <a
                    href="https://www.youtube.com/watch?v=N-ZdH5kQQ1I"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-500 hover:underline flex items-center gap-0.5"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">2. Punchiri (Smile):</span>
                  <a
                    href="https://www.youtube.com/watch?v=1tk5yb5EKlk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-500 hover:underline flex items-center gap-0.5"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={toggleMusic}
                  className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-xs shadow-md hover:from-rose-600 hover:to-pink-600 flex items-center justify-center gap-1.5 transition-all"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause Soundtrack</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Resume Soundtrack</span>
                    </>
                  )}
                </button>
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
              {isPlaying
                ? activeSong === 'punchiri'
                  ? 'Playing: Punchiri (Paal Polethe Punchiri) 🌸'
                  : 'Playing: Magale (4:14 - 4:54) 🎶'
                : 'Sayana&apos;s Soundtrack'}
            </span>
            <span className="sm:hidden">
              {isPlaying ? (activeSong === 'punchiri' ? 'Punchiri 🌸' : 'Magale 🎶') : 'Music'}
            </span>
          </button>

          {/* Round Toggle Button */}
          <button
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pause song' : 'Play song'}
            className={`relative p-3.5 rounded-full transition-all duration-300 shadow-xl flex items-center justify-center ${
              isPlaying
                ? activeSong === 'punchiri'
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white ring-4 ring-amber-300/50 scale-105 shadow-amber-300/60'
                  : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white ring-4 ring-rose-300/50 scale-105 shadow-rose-300/60'
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
