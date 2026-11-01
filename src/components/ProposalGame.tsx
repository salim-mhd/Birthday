'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const funnyNoMessages = [
  'No 🙈',
  'Wait... are you sure? 🥺',
  'Nice try, too slow! 🏃‍♀️💨',
  'Error 404: "No" is forbidden! 🚫',
  'Salim said "No" is not an option! 😂',
  'Button malfunction! Press YES! 🛠️',
  'Don’t fight destiny, my love! ❤️',
  'Just look how pretty the YES button is! ✨',
  'Okay miss stubborn, YES is right there! 🥰',
  'Forever means FOREVER! 💍',
];

export default function ProposalGame() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [loveNote, setLoveNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dodgeNoButton = () => {
    // Increment dodge count
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    // Compute random displacement within a bounded container area
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const maxX = Math.min(rect.width / 2.5, 180);
      const maxY = Math.min(rect.height / 3, 100);

      // Avoid 0, keep it jumping across opposite quadrants
      const randomX = (Math.random() * 2 - 1) * maxX;
      const randomY = (Math.random() * 2 - 1) * maxY;
      setNoPosition({ x: randomX, y: randomY });
    } else {
      setNoPosition({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 120,
      });
    }
  };

  const handleSayYes = async () => {
    setHasAccepted(true);

    // Grand Fireworks Confetti celebration
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#f43f5e', '#ec4899', '#fbbf24', '#ffffff', '#e11d48'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Fire big center burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: colors,
    });

    // Save directly to MongoDB Atlas
    try {
      await fetch('/api/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer: 'YES! A Million Times YES! 💍❤️',
          loveNote: 'She clicked the YES button with fireworks!',
          clientTime: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn('Saved locally, network fallback', err);
    }
  };

  const submitPersonalVow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loveNote.trim()) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer: 'YES! Confirmed with Personal Love Note 💍',
          loveNote: loveNote.trim(),
          clientTime: new Date().toISOString(),
        }),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // The yes button grows slightly as she fails to click no
  const yesScale = Math.min(1 + noCount * 0.08, 1.4);

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto relative z-10" id="proposal-game">
      <div
        ref={containerRef}
        className="relative bg-white/90 backdrop-blur-xl border-2 border-rose-200 rounded-3xl p-8 sm:p-14 shadow-2xl text-center overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-rose-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl pointer-events-none" />

        {!hasAccepted ? (
          <div className="space-y-8 relative z-10">
            {/* Header / Intro */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>The Most Important Question of Chapter 21</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Will You Marry Me, Sayana? 💍
              </h2>

              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                From the moment your smile lit up my darkest days, I knew I never wanted to spend a single tomorrow without you. So here is Salim, putting his whole heart on the line for you.
              </p>
            </div>

            {/* Proposal Game Zone */}
            <div className="min-h-[220px] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-4 relative">
              {/* The YES Button */}
              <motion.button
                onClick={handleSayYes}
                animate={{ scale: yesScale }}
                whileHover={{ scale: yesScale * 1.05 }}
                whileTap={{ scale: yesScale * 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="z-20 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white font-bold text-lg sm:text-xl shadow-xl shadow-rose-400/50 hover:shadow-rose-400/80 flex items-center gap-3 transition-colors"
              >
                <span>YES! Forever & Always</span>
                <Heart className="w-6 h-6 fill-white animate-pulse" />
              </motion.button>

              {/* The Dodging NO Button */}
              <motion.button
                onMouseEnter={dodgeNoButton}
                onClick={dodgeNoButton}
                onTouchStart={dodgeNoButton}
                animate={{
                  x: noPosition.x,
                  y: noPosition.y,
                }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="z-10 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-base border border-gray-300 shadow-sm transition-colors cursor-pointer select-none"
              >
                {funnyNoMessages[noCount % funnyNoMessages.length]}
              </motion.button>
            </div>

            {/* Playful hint */}
            <p className="text-xs text-rose-500 font-medium italic">
              {noCount > 0
                ? `(You tried to escape ${noCount} time${noCount > 1 ? 's' : ''}! But Salim's love is inescapable! 😜)`
                : '(Try clicking "No" if you dare! 😉)'}
            </p>
          </div>
        ) : (
          /* Celebration View when She says YES! */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 relative z-10 py-4"
          >
            {/* Sparkling Ring Icon */}
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-200 via-rose-100 to-pink-200 p-1 mx-auto shadow-2xl flex items-center justify-center text-5xl"
              >
                💍
              </motion.div>
              <Sparkles className="w-8 h-8 text-amber-500 absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200">
                Official Declaration Of Love
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-gray-900">
                SHE SAID YES! 🎉❤️
              </h2>
              <p className="font-cursive text-2xl sm:text-3xl text-rose-600 font-semibold">
                Sayana & Salim • Hand in hand, through all of life&apos;s chapters.
              </p>
            </div>

            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              This moment is stamped into eternity. Thank you for choosing to be my partner, my best friend, my midnight biriyani partner, and my whole heart.
            </p>

            {/* Note form for Sayana to write back to Salim */}
            {!isSubmitted ? (
              <form onSubmit={submitPersonalVow} className="max-w-md mx-auto pt-4 space-y-3">
                <label className="block text-xs font-bold text-gray-700 text-left">
                  Leave a secret note or reply to Salim (saved to our cloud vault):
                </label>
                <textarea
                  value={loveNote}
                  onChange={(e) => setLoveNote(e.target.value)}
                  placeholder="Tell Salim something sweet, funny, or your vow..."
                  rows={3}
                  className="w-full p-3.5 rounded-2xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/50 text-sm text-gray-800 placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !loveNote.trim()}
                  className="w-full py-3 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving to Vault...' : 'Send Note To Salim 💌'}</span>
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold inline-flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Your love message has been saved in our forever vault! 🔒❤️</span>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
