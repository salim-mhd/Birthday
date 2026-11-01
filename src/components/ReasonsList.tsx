'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronDown, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

const reasons = [
  'The way your eyes twinkle and crinkle whenever you laugh with all your heart.',
  'How your silver jhumkas dance when you tilt your head smiling.',
  'Your adorable pout when Salim playfully teases you.',
  'Your unconditional love for hot, fragrant biriyani (even if it beats Salim for 1st place!).',
  'How a single bar of silky chocolate can instantly cure your worst mood.',
  'Demanding late-night ice cream at 1 AM regardless of how cold it is outside.',
  'The safe warmth of your hands wrapped tight around my waist on night rides.',
  'Your natural, effortless grace—radiant without even needing a speck of makeup.',
  'The sweet, thoughtful surprises you give me that touch my soul.',
  'The way you believe in me even when I doubt myself.',
  'How you listen patiently to all my ramblings and stories.',
  'Your gentle kindness towards every living soul around you.',
  'The cute face you make when you are concentrating on something.',
  'How you turn an ordinary gloomy day into a festival of laughter.',
  'Your strength and resilience as you step into adulthood.',
  'The way you hold my hand in public and make me feel like a king.',
  'How you look in the golden hour sunshine—pure sunshine yourself.',
  'Because you are not just my girlfriend, you are my home and my best friend.',
  'Because you make Salim want to become the best version of himself.',
  'Because Chapter 21 is going to be your most majestic chapter yet.',
  'Because you are Sayana, and there is nobody else in this universe I would rather love.',
];

export default function ReasonsList() {
  const [unlockedCount, setUnlockedCount] = useState(5);
  const [activeReason, setActiveReason] = useState<number | null>(null);

  const unlockNext = (e: React.MouseEvent) => {
    if (unlockedCount < reasons.length) {
      setUnlockedCount((prev) => Math.min(prev + 4, reasons.length));
      confetti({
        particleCount: 20,
        spread: 40,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ['#fda4af', '#f43f5e'],
      });
    }
  };

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto relative z-10" id="reasons">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-rose-500" />
          <span>The Milestone Tribute</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900">
          21 Reasons Why I Love Sayana 💕
        </h2>
        <p className="text-gray-600 font-light text-base sm:text-lg">
          For your 21st birthday, here are 21 specific truths Salim keeps close to his heart.
        </p>
      </div>

      {/* Reasons List */}
      <div className="space-y-3">
        {reasons.slice(0, unlockedCount).map((reason, index) => {
          const isCurrent = activeReason === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
              onClick={() => setActiveReason(isCurrent ? null : index)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 ${
                isCurrent
                  ? 'bg-rose-50 border-rose-300 shadow-md'
                  : 'bg-white/80 border-rose-100 hover:border-rose-200 hover:bg-rose-50/40 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 font-serif font-bold text-sm flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <p className="text-sm sm:text-base text-gray-800 font-medium">
                  {reason}
                </p>
              </div>
              <Heart
                className={`w-4 h-4 shrink-0 transition-transform ${
                  isCurrent ? 'fill-rose-500 text-rose-500 scale-125' : 'text-gray-300'
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Unlock button if not all unlocked */}
      {unlockedCount < reasons.length && (
        <div className="text-center pt-8">
          <button
            onClick={unlockNext}
            className="px-6 py-3 rounded-full bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-sm font-semibold shadow-sm transition-all hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Unlock Next Reasons ({unlockedCount}/{reasons.length})</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
