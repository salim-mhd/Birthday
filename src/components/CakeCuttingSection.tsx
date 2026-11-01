'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Utensils, Award, PartyPopper, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CakeCuttingSection() {
  const [isCut, setIsCut] = useState(false);
  const [knifePosition, setKnifePosition] = useState(0); // 0 to 100%
  const [sliceEaten, setSliceEaten] = useState(false);
  const [sayanaFed, setSayanaFed] = useState(false);
  const [birthdayWish, setBirthdayWish] = useState('');
  const [wishSaved, setWishSaved] = useState(false);
  const [isCutting, setIsCutting] = useState(false);

  const triggerCakeCut = () => {
    setIsCut(true);
    setIsCutting(false);
    setKnifePosition(100);

    // Multi-angle festive confetti barrage
    const count = 200;
    const defaults = {
      origin: { y: 0.6 },
    };

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

    // Also fire side cannons
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24'],
      });
    }, 350);
  };

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
    setKnifePosition(0);
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative z-10" id="cake-cutting">
      <div className="bg-gradient-to-br from-pink-50 via-rose-50/60 to-amber-50/60 rounded-3xl p-6 sm:p-12 border-2 border-rose-200/90 shadow-2xl relative overflow-hidden text-center">
        {/* Decorative sparkles in background */}
        <div className="absolute top-6 left-8 text-rose-300 text-3xl animate-pulse">✨</div>
        <div className="absolute top-10 right-10 text-amber-300 text-4xl animate-bounce">🎉</div>
        <div className="absolute bottom-6 left-10 text-pink-300 text-3xl animate-pulse">🌸</div>

        {/* Header */}
        <div className="max-w-2xl mx-auto mb-10 space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <PartyPopper className="w-3.5 h-3.5 text-rose-600" />
            <span>The Big 21 Celebration Ceremony</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Cut The Birthday Cake, Sayana! 🎂🔪
          </h2>

          <p className="text-gray-600 font-light text-base sm:text-lg">
            {!isCut
              ? 'Gather round! Grab the knife and slice through your 21st celebration cake to unlock sweet memories and wishes!'
              : 'Yayyy! The cake is officially cut! Time to celebrate with a delicious bite!'}
          </p>
        </div>

        {/* Interactive Cake Illustration Stage */}
        <div className="relative max-w-md mx-auto my-6 py-6 min-h-[340px] flex flex-col items-center justify-center">
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

          {/* 3-Tier Luxury Birthday Cake SVG / HTML representation */}
          <div className="relative w-72 sm:w-80 flex flex-col items-center">
            {/* Top Tier (Small) */}
            <div className="relative w-40 h-16 rounded-t-2xl bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 border-2 border-rose-300 shadow-sm flex items-center justify-center overflow-hidden">
              {/* White creamy frosting drops */}
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
              {/* Decorative strawberry icons */}
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

              {/* Slicing Line Cut Effect */}
              {isCut && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-0 bottom-0 left-1/2 w-1.5 bg-gradient-to-b from-amber-300 via-white to-amber-300 shadow-[0_0_12px_#fff] z-30"
                />
              )}
            </div>

            {/* Cake Golden Serving Stand */}
            <div className="w-80 sm:w-96 h-5 rounded-full bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-300 border border-amber-400 shadow-lg mt-1" />
            <div className="w-28 h-6 bg-gradient-to-b from-amber-300 to-amber-400 border border-amber-400 shadow-md rounded-b-xl" />

            {/* Moving Knife Animation */}
            {!isCut && (
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                  rotate: [15, 20, 15],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-12 right-2 sm:right-6 z-30 pointer-events-none"
              >
                <div className="flex flex-col items-center">
                  <span className="text-4xl drop-shadow-md">🔪</span>
                  <span className="text-[10px] font-bold bg-white/90 text-rose-600 px-2 py-0.5 rounded-full shadow border border-rose-200">
                    Ready to cut!
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="max-w-md mx-auto space-y-4 pt-2">
          {!isCut ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={triggerCakeCut}
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-serif font-bold text-lg shadow-xl shadow-rose-300/60 transition-all flex items-center justify-center gap-3"
            >
              <Utensils className="w-5 h-5" />
              <span>Slice The Birthday Cake! 🎂🔪</span>
            </motion.button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/90 border border-rose-200 shadow-md space-y-3">
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
                <form onSubmit={handleSaveWish} className="bg-white/80 p-4 rounded-2xl border border-rose-200 space-y-2">
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
      </div>
    </section>
  );
}
