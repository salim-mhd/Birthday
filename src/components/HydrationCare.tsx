'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Heart, ShieldCheck, Sparkles, Plus, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const compliments = [
  'Good girl! Salim is proud of you! 🥰',
  'Glowing skin unlocked! You are 70% water and 100% mine ❤️',
  'Goddess hydration mode: Active! ✨',
  'Stay fresh, my queen. Your smile looks extra radiant today! 🌸',
  'Doctor Salim approves this hydration milestone! 🩺💕',
  'One more sip closer to endless energy for our next night ride! 🏍️',
];

export default function HydrationCare() {
  const [glasses, setGlasses] = useState(3);
  const [lastCompliment, setLastCompliment] = useState<string | null>(null);

  const addGlass = (e: React.MouseEvent) => {
    const nextCount = Math.min(glasses + 1, 8);
    setGlasses(nextCount);
    const randomMsg = compliments[Math.floor(Math.random() * compliments.length)];
    setLastCompliment(randomMsg);

    confetti({
      particleCount: 20,
      spread: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ['#38bdf8', '#0284c7', '#bae6fd'],
    });
  };

  const percentage = Math.min(Math.round((glasses / 8) * 100), 100);

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto relative z-10" id="care">
      <div className="bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 border border-sky-200/80 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Subtle background water drop aesthetic */}
        <div className="absolute -top-10 -right-10 text-sky-200/40 text-9xl pointer-events-none select-none">
          💧
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          {/* Animated Water Glass Visual */}
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-44 rounded-b-3xl border-4 border-sky-300 bg-white/60 overflow-hidden shadow-inner flex flex-col justify-end">
              {/* Animated water level */}
              <motion.div
                className="w-full bg-gradient-to-t from-sky-400 to-cyan-300 relative"
                initial={{ height: '37%' }}
                animate={{ height: `${percentage}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {/* Surface wave shimmer */}
                <div className="absolute top-0 inset-x-0 h-2 bg-sky-200/70 animate-pulse" />
                {/* Floating bubbles */}
                <div className="absolute bottom-2 left-3 w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                <div className="absolute bottom-6 right-4 w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" />
              </motion.div>

              {/* Water percentage label */}
              <div className="absolute inset-0 flex items-center justify-center font-bold text-sky-900 text-lg">
                {percentage}%
              </div>
            </div>

            <span className="text-xs font-semibold text-sky-700 mt-2">
              {glasses} of 8 Glasses Today
            </span>
          </div>

          {/* Text and caring message */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
              <Droplet className="w-3.5 h-3.5 fill-sky-500 text-sky-500" />
              <span>Salim&apos;s Caring Directive</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              Drink Your Water, My Princess! 💧
            </h3>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              You get so occupied being sweet, eating your chocolates, and looking effortlessly gorgeous that you forget to hydrate. Salim is here to take care of you, even when we are miles or minutes apart!
            </p>

            {/* Daily Care Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 font-medium pt-1">
              <div className="flex items-center gap-2 bg-white/70 px-3 py-1.5 rounded-xl border border-sky-100">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Keeps your skin glowing & soft</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 px-3 py-1.5 rounded-xl border border-sky-100">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Good balance for spicy biriyani!</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 px-3 py-1.5 rounded-xl border border-sky-100">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Hydrated lips for gentle kisses 💋</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 px-3 py-1.5 rounded-xl border border-sky-100">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Because Salim cares about your health ❤️</span>
              </div>
            </div>

            {/* Interactive Drink Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={addGlass}
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-medium shadow-md hover:shadow-sky-300/60 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>I Drank A Glass Just Now! 🥛</span>
              </button>

              <button
                onClick={() => setGlasses(1)}
                className="text-xs text-sky-600 hover:text-sky-800 underline font-medium"
              >
                Reset for tomorrow
              </button>
            </div>

            {/* Sweet Compliment Banner */}
            <AnimatePresence>
              {lastCompliment && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-sky-100/90 border border-sky-300 rounded-2xl text-xs sm:text-sm text-sky-800 font-semibold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{lastCompliment}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
