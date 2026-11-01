'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, Flame, Stars, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HeroSection() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    setWishMade(true);

    // Grand confetti explosion
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24', '#f472b6'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fda4af', '#f43f5e', '#e11d48'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fda4af', '#f43f5e', '#e11d48'],
      });
    }, 400);
  };

  return (
    <section className="relative min-h-screen pt-20 pb-16 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-300/30 via-rose-200/40 to-purple-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Milestone Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-rose-200 shadow-sm text-sm font-medium text-rose-600 mb-6"
      >
        <Sparkles className="w-4 h-4 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
        <span>Today is All About You • Sayana&apos;s 21st Milestone</span>
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
      </motion.div>

      {/* Main Title */}
      <div className="text-center max-w-4xl mx-auto space-y-4 mb-10">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight"
        >
          Happy 21<sup className="text-rose-500 text-2xl sm:text-4xl">st</sup> Birthday,
          <span className="block font-cursive text-5xl sm:text-7xl md:text-8xl romantic-gradient-text mt-2 font-normal pb-2">
            My Beautiful Sayana
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed"
        >
          21 magical years of grace, sunshine, and laughter. To the girl who stole Salim&apos;s heart, today every star in the sky shines only for you.
        </motion.p>
      </div>

      {/* Centerpiece: Collage Poster & Floating Badges */}
      <div className="relative max-w-md sm:max-w-lg w-full mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative group"
        >
          {/* Glowing backlight frame */}
          <div className="absolute -inset-3 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 rounded-3xl blur-xl opacity-60 group-hover:opacity-85 transition duration-700 animate-pulse-slow" />

          {/* Main Photo Card */}
          <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-2xl border border-rose-100">
            <div className="relative h-[440px] sm:h-[520px] w-full rounded-2xl overflow-hidden bg-rose-50">
              <Image
                src="/images/sayana-poster.jpg"
                alt="Happy 21st Birthday Sayana Collage"
                fill
                priority
                className="object-contain sm:object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-center sm:text-left">
                <span className="text-xs uppercase tracking-widest text-rose-200 font-semibold block">The 21st Queen</span>
                <span className="font-serif text-xl sm:text-2xl font-bold">Sayana • 21 Years of Magic</span>
              </div>
            </div>
          </div>

          {/* Floating Pill 1: 21 Years */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-rose-200 flex items-center gap-2"
          >
            <span className="text-2xl">👑</span>
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-gray-400">Milestone</div>
              <div className="text-xs font-bold text-rose-600">Chapter 21 Unlocked</div>
            </div>
          </motion.div>

          {/* Floating Pill 2: Salim's Pride */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-4 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-rose-200 flex items-center gap-2"
          >
            <span className="text-2xl">💖</span>
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-gray-400">Forever Loved By</div>
              <div className="text-xs font-bold text-rose-600">Salim ❤️</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Birthday Cake & Make A Wish */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="w-full max-w-lg mx-auto bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-rose-200 shadow-xl text-center space-y-4 mb-8"
      >
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl">🎂</span>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-gray-800">
            Make A 21st Birthday Wish!
          </h3>
        </div>

        <p className="text-sm text-gray-600">
          {candlesBlown
            ? '✨ Your wish is now sent to the universe! And Salim will do whatever it takes to fulfill it! ✨'
            : 'Close your eyes, think of your sweetest dream, and blow out your 21 candles!'}
        </p>

        {/* Candles state */}
        <div className="flex items-center justify-center gap-2 py-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-5 flex items-end">
                {!candlesBlown ? (
                  <motion.div
                    animate={{ scale: [1, 1.25, 0.9, 1.1], opacity: [0.9, 1, 0.8, 1] }}
                    transition={{ duration: 0.8 + (i * 0.1), repeat: Infinity }}
                  >
                    <Flame className="w-4 h-4 text-amber-500 fill-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -15 }}
                    transition={{ duration: 1 }}
                    className="text-gray-400 text-xs font-serif italic"
                  >
                    💨
                  </motion.div>
                )}
              </div>
              <div className={`w-2.5 h-7 rounded-sm ${i % 2 === 0 ? 'bg-rose-400' : 'bg-pink-300'} border border-rose-300`} />
            </div>
          ))}
        </div>

        <button
          onClick={handleBlowCandles}
          disabled={candlesBlown}
          className={`w-full py-3 px-6 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
            candlesBlown
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
              : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white hover:shadow-rose-300/60 hover:scale-[1.02]'
          }`}
        >
          {candlesBlown ? (
            <>
              <Stars className="w-5 h-5 text-amber-500" />
              <span>Wish Sealed in the Stars! 🌟</span>
            </>
          ) : (
            <>
              <Flame className="w-5 h-5" />
              <span>Blow The 21 Candles 🎂</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Quick Action Navigation Links */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
        <a
          href="#cake-cutting"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-md transition-all hover:scale-105 flex items-center gap-2"
        >
          <span>Cut The Cake! 🎂🔪</span>
        </a>
        <a
          href="#proposal-game"
          className="px-6 py-3 rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow-md transition-all hover:scale-105 flex items-center gap-2"
        >
          <span>Will You Marry Me?</span>
          <span>💍</span>
        </a>
        <a
          href="#surprises"
          className="px-6 py-3 rounded-full bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 shadow-sm transition-all hover:scale-105 flex items-center gap-2"
        >
          <Gift className="w-4 h-4 text-rose-500" />
          <span>Pick Your Surprises</span>
        </a>
        <a
          href="#thank-you"
          className="px-6 py-3 rounded-full bg-white text-gray-700 border border-rose-200 hover:bg-rose-50 shadow-sm transition-all hover:scale-105 flex items-center gap-2"
        >
          <Heart className="w-4 h-4 text-rose-500" />
          <span>Salim&apos;s Letter</span>
        </a>
      </div>
    </section>
  );
}

