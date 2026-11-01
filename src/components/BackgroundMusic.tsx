'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Play a soft, dreamy romantic music-box chord progression in C/F major
  const playRomanticChime = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Romantic music-box notes (frequencies in Hz: C4, E4, G4, B4, C5, D5, E5, G5, A5)
    const melodyPatterns = [
      [523.25, 659.25, 783.99, 1046.50], // C major arpeggio
      [440.00, 523.25, 659.25, 880.00],  // A minor arpeggio
      [349.23, 440.00, 523.25, 698.46],  // F major arpeggio
      [392.00, 493.88, 587.33, 783.99],  // G major arpeggio
      [523.25, 659.25, 880.00, 1046.50], // C maj7 dreamy
      [587.33, 698.46, 880.00, 1174.66], // Dm9
      [493.88, 587.33, 783.99, 987.77],  // G7
      [523.25, 783.99, 1046.50, 1318.51] // High C octave
    ];

    let patternIdx = 0;
    let noteIdx = 0;

    const playNote = (freq: number, duration = 1.8, delay = 0) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sine wave with subtle triangle warmth for music-box bell effect
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      // Soft envelope (gentle bell pluck)
      const now = ctx.currentTime + delay;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    };

    const step = () => {
      const currentPattern = melodyPatterns[patternIdx % melodyPatterns.length];
      const freq = currentPattern[noteIdx % currentPattern.length];
      playNote(freq, 2.2);

      // Occasionally add a gentle bass root
      if (noteIdx % 4 === 0) {
        playNote(freq / 2, 2.8);
      }

      noteIdx++;
      if (noteIdx >= currentPattern.length) {
        noteIdx = 0;
        patternIdx++;
      }
    };

    step();
    intervalRef.current = setInterval(step, 450);
  };

  const stopMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
      setIsPlaying(false);
    } else {
      playRomanticChime();
      setIsPlaying(true);
      setHasInteracted(true);
    }
  };

  // Auto-prompt or start when user clicks anywhere
  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };
    window.addEventListener('click', handleFirstClick, { once: true });
    return () => {
      stopMusic();
      window.removeEventListener('click', handleFirstClick);
    };
  }, [hasInteracted]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-3">
        {!isPlaying && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-rose-200 text-xs text-rose-600 font-medium animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Play Sayana&apos;s Melody</span>
          </div>
        )}
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause romantic melody' : 'Play romantic melody'}
          className={`relative p-3.5 rounded-full transition-all duration-300 shadow-xl flex items-center justify-center ${
            isPlaying
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white ring-4 ring-rose-300/50 scale-105'
              : 'bg-white/90 backdrop-blur-md text-rose-600 border border-rose-200 hover:scale-105'
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
              <Music className="w-3.5 h-3.5 opacity-70" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
