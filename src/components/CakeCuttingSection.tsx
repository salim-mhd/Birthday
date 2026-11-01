'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Utensils, Award, PartyPopper, RotateCcw, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CakeCuttingSection() {
  const [isCut, setIsCut] = useState(false);
  const [cutProgress, setCutProgress] = useState(0); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [sliceEaten, setSliceEaten] = useState(false);
  const [sayanaFed, setSayanaFed] = useState(false);
  const [birthdayWish, setBirthdayWish] = useState('');
  const [wishSaved, setWishSaved] = useState(false);

  const arenaRef = useRef<HTMLDivElement>(null);
  const dragStartYRef = useRef<number>(0);
  const initialProgressRef = useRef<number>(0);

  const triggerCakeCut = useCallback(() => {
    setIsCut(true);
    setIsDragging(false);
    setCutProgress(100);

    // Multi-angle festive confetti barrage
    const count = 220;
    const defaults = { origin: { y: 0.6 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#f43f5e', '#fb7185', '#fbbf24'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#ec4899', '#f472b6', '#a855f7'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#fbbf24', '#f59e0b', '#ffffff'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#e11d48', '#fda4af'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 90,
        angle: 60,
        spread: 75,
        origin: { x: 0, y: 0.7 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24'],
      });
      confetti({
        particleCount: 90,
        angle: 120,
        spread: 75,
        origin: { x: 1, y: 0.7 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24'],
      });
    }, 350);
  }, []);

  // Mouse / Touch drag handlers
  const handleStartDrag = (clientY: number) => {
    if (isCut) return;
    setIsDragging(true);
    dragStartYRef.current = clientY;
    initialProgressRef.current = cutProgress;
  };

  const handleMoveDrag = useCallback((clientY: number) => {
    if (!isDragging || isCut || !arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const totalHeight = rect.height * 0.75; // Active slicing zone height

    const deltaY = clientY - dragStartYRef.current;
    const deltaPercent = (deltaY / totalHeight) * 100;
    const newProgress = Math.max(0, Math.min(100, initialProgressRef.current + deltaPercent));

    setCutProgress(newProgress);

    if (newProgress >= 85) {
      triggerCakeCut();
    }
  }, [isDragging, isCut, triggerCakeCut]);

  const handleEndDrag = useCallback(() => {
    if (!isDragging || isCut) return;
    setIsDragging(false);

    if (cutProgress >= 70) {
      triggerCakeCut();
    } else {
      // Smoothly snap back to 0 if not dragged far enough
      setCutProgress(0);
    }
  }, [isDragging, isCut, cutProgress, triggerCakeCut]);

  // Window-level mouse & touch listeners while dragging
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      handleMoveDrag(e.clientY);
    };

    const onMouseUp = () => {
      handleEndDrag();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMoveDrag(e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      handleEndDrag();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleMoveDrag, handleEndDrag]);

  const handleFeedSalim = () => {
    setSliceEaten(true);
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fb7185'],
    });
  };

  const handleFeedSayana = () => {
    setSayanaFed(true);
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#fbbf24', '#f43f5e'],
    });
  };

  const handleSaveWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdayWish.trim()) return;

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'Sayana’s Cake Cutting Wish 🎂✨',
          message: birthdayWish.trim(),
          emoji: '🎂',
        }),
      });
      setWishSaved(true);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    } catch (err) {
      console.warn('Fallback save', err);
      setWishSaved(true);
    }
  };

  const resetCake = () => {
    setIsCut(false);
    setSliceEaten(false);
    setSayanaFed(false);
    setCutProgress(0);
    setIsDragging(false);
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative z-10" id="cake-cutting">
      <div className="bg-gradient-to-br from-pink-50 via-rose-50/60 to-amber-50/60 rounded-3xl p-6 sm:p-12 border-2 border-rose-200/90 shadow-2xl relative overflow-hidden text-center select-none">
        {/* Decorative sparkles */}
        <div className="absolute top-6 left-8 text-rose-300 text-3xl animate-pulse">✨</div>
        <div className="absolute top-10 right-10 text-amber-300 text-4xl animate-bounce">🎉</div>
        <div className="absolute bottom-6 left-10 text-pink-300 text-3xl animate-pulse">🌸</div>

        {/* Header */}
        <div className="max-w-2xl mx-auto mb-8 space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <PartyPopper className="w-3.5 h-3.5 text-rose-600" />
            <span>Interactive Cake Cutting Ceremony</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Cut The Birthday Cake With Your Mouse! 🎂🔪
          </h2>

          <p className="text-gray-600 font-light text-base sm:text-lg">
            {!isCut ? (
              <span className="inline-flex items-center gap-1.5 font-medium text-rose-600">
                <span>Hold mouse click on the knife & drag downward through the cake to slice!</span>
              </span>
            ) : (
              'Yayyy! The cake is officially cut! Time to celebrate with a delicious bite!'
            )}
          </p>
        </div>

        {/* Drag Instructions & Cut Meter Pill */}
        {!isCut && (
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-rose-300 shadow-md text-xs sm:text-sm font-bold text-rose-700 mb-4 animate-pulse">
            <ArrowDown className="w-4 h-4 text-rose-500 animate-bounce" />
            <span>
              {isDragging
                ? `Cutting Progress: ${Math.round(cutProgress)}% (Keep dragging down!)`
                : 'Click & Drag Knife Downward ⬇️'}
            </span>
          </div>
        )}

        {/* Interactive Cake Arena with Drag Zone */}
        <div
          ref={arenaRef}
          className="relative max-w-md mx-auto my-4 py-4 min-h-[380px] flex flex-col items-center justify-center cursor-pointer"
        >
          {/* Sparkles around cake */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 right-8 text-2xl"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="absolute -top-2 left-8 text-2xl"
          >
            💫
          </motion.div>

          {/* Golden 21 Topper on Cake */}
          <div className="relative z-20 mb-[-12px]">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-amber-950 font-serif font-black text-xl shadow-lg border-2 border-white flex items-center gap-1.5"
            >
              <span>👑</span>
              <span>21</span>
              <span>👑</span>
            </motion.div>
            <div className="w-1 h-5 bg-amber-400 mx-auto" />
          </div>

          {/* 3-Tier Luxury Birthday Cake */}
          <div className="relative w-72 sm:w-80 flex flex-col items-center">
            {/* Top Tier */}
            <div className="relative w-40 h-16 rounded-t-2xl bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 border-2 border-rose-300 shadow-sm flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 inset-x-0 flex justify-around">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-5 h-4 bg-white rounded-b-full shadow-2xs" />
                ))}
              </div>
              <span className="font-cursive font-bold text-rose-600 text-sm mt-3">
                Sayana 🌸
              </span>
            </div>

            {/* Middle Tier */}
            <div className="relative w-56 h-20 bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 border-x-2 border-b-2 border-rose-400 shadow-md flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 inset-x-0 flex justify-around">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-white rounded-b-full shadow-2xs" />
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs mt-3 select-none">
                <span>🍓</span>
                <span className="font-serif font-bold text-rose-800 text-xs uppercase tracking-wider">
                  Chapter 21
                </span>
                <span>🍓</span>
              </div>
            </div>

            {/* Bottom Tier (Base) */}
            <div className="relative w-72 sm:w-80 h-24 rounded-b-xl bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 border-x-2 border-b-2 border-rose-500 shadow-xl flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 inset-x-0 flex justify-around">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-white rounded-b-full shadow-2xs" />
                ))}
              </div>
              <span className="font-cursive font-bold text-white text-xl sm:text-2xl mt-4 drop-shadow">
                Forever Salim&apos;s Queen ❤️
              </span>
            </div>

            {/* Cake Golden Serving Stand */}
            <div className="w-80 sm:w-96 h-5 rounded-full bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-300 border border-amber-400 shadow-lg mt-1" />
            <div className="w-28 h-6 bg-gradient-to-b from-amber-300 to-amber-400 border border-amber-400 shadow-md rounded-b-xl" />

            {/* ======================================================== */}
            {/* DYNAMIC CUT LINE & SLICING LASER EFFECT                  */}
            {/* ======================================================== */}
            {(cutProgress > 0 || isCut) && (
              <div
                className="absolute top-6 bottom-7 left-1/2 -translate-x-1/2 w-2 z-30 pointer-events-none overflow-hidden"
                style={{
                  height: `${isCut ? 100 : cutProgress}%`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-b from-amber-300 via-white to-amber-400 shadow-[0_0_15px_#fff]" />
              </div>
            )}

            {/* Cake Slice Separates Out when Cut is Complete */}
            <AnimatePresence>
              {isCut && (
                <motion.div
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
                  animate={{ opacity: 1, x: 70, y: -20, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="absolute bottom-6 right-0 z-40 bg-white p-3 rounded-2xl shadow-2xl border-2 border-amber-300 flex items-center gap-3"
                >
                  <span className="text-3xl">🍰</span>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-rose-500 block">Sayana&apos;s First Slice</span>
                    <span className="text-xs font-bold text-gray-800">Vanilla Strawberry Delight</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ======================================================== */}
            {/* DRAGGABLE KNIFE CONTROLLER                               */}
            {/* ======================================================== */}
            {!isCut && (
              <div
                onMouseDown={(e) => handleStartDrag(e.clientY)}
                onTouchStart={(e) => {
                  if (e.touches.length > 0) handleStartDrag(e.touches[0].clientY);
                }}
                style={{
                  top: `calc(${cutProgress * 0.72}% + 10px)`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
                className={`absolute z-40 cursor-grab active:cursor-grabbing transition-transform duration-75 flex flex-col items-center ${
                  isDragging ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                {/* Knife Ribbon / Handle Badge */}
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white text-[11px] font-bold shadow-lg border border-white flex items-center gap-1.5 whitespace-nowrap mb-1">
                  <span>🔪</span>
                  <span>{isDragging ? 'Dragging...' : 'Drag Me Down!'}</span>
                </div>

                {/* Knife Graphic */}
                <div className="relative">
                  <div className="w-4 h-16 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-t-md shadow-md border border-gray-600 mx-auto" />
                  <div className="w-1.5 h-20 bg-gradient-to-b from-gray-200 via-white to-gray-400 rounded-b-full shadow-lg border-r border-gray-400 mx-auto" />
                  {isDragging && (
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                      className="absolute -bottom-2 -left-2 text-amber-400 text-sm"
                    >
                      ✨
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fallback button if user prefers one-click slice */}
        {!isCut && (
          <div className="pt-2">
            <button
              onClick={triggerCakeCut}
              className="text-xs text-rose-500 hover:text-rose-700 font-semibold underline flex items-center justify-center gap-1 mx-auto"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Or click here to slice automatically 🎂</span>
            </button>
          </div>
        )}

        {/* Post-Cut Celebratory Options */}
        {isCut && (
          <div className="max-w-md mx-auto space-y-4 pt-4">
            <div className="p-4 rounded-2xl bg-white/95 border border-rose-200 shadow-md space-y-3">
              <div className="flex items-center justify-center gap-2 text-rose-600 font-bold text-base">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>The Cake Is Sliced! First Bites Time! 🍰</span>
              </div>

              {/* Feeding options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleFeedSayana}
                  disabled={sayanaFed}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    sayanaFed
                      ? 'bg-rose-100 text-rose-800 cursor-default'
                      : 'bg-rose-600 text-white hover:bg-rose-700 shadow-md'
                  }`}
                >
                  <span>🍰</span>
                  <span>{sayanaFed ? 'Sayana Enjoyed Her Slice! 😋' : 'First Bite For Sayana ❤️'}</span>
                </button>

                <button
                  onClick={handleFeedSalim}
                  disabled={sliceEaten}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    sliceEaten
                      ? 'bg-amber-100 text-amber-800 cursor-default'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shadow-md'
                  }`}
                >
                  <span>🎂</span>
                  <span>{sliceEaten ? 'Salim: "Sweetest bite ever!" 🥰' : 'Feed A Bite To Salim 💖'}</span>
                </button>
              </div>
            </div>

            {/* Secret Wish Box */}
            {!wishSaved ? (
              <form onSubmit={handleSaveWish} className="bg-white/90 p-4 rounded-2xl border border-rose-200 space-y-2">
                <label className="text-xs font-bold text-gray-700 block text-left">
                  Whisper a secret 21st birthday wish while eating cake:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={birthdayWish}
                    onChange={(e) => setBirthdayWish(e.target.value)}
                    placeholder="My wish for this 21st year is..."
                    className="flex-1 p-2.5 rounded-xl border border-rose-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/40"
                  />
                  <button
                    type="submit"
                    disabled={!birthdayWish.trim()}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold shadow transition-colors"
                  >
                    Save Wish ✨
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-semibold flex items-center justify-center gap-2">
                <span>✨ Your cake wish is sealed in Salim&apos;s heart & database forever!</span>
              </div>
            )}

            {/* Cut Again button */}
            <button
              onClick={resetCake}
              className="text-xs text-rose-500 hover:text-rose-700 font-semibold underline flex items-center justify-center gap-1 mx-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Cut another slice 🎂</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
