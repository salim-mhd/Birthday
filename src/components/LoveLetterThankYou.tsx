'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Feather, BookmarkCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveLetterThankYou() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#e11d48', '#fda4af', '#f43f5e'],
      });
    }
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto relative z-10" id="thank-you">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
          <Feather className="w-3.5 h-3.5 text-rose-600" />
          <span>From Salim&apos;s Soul To Yours</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900">
          Thank You For Coming Into My Life 💌
        </h2>
        <p className="text-gray-600 font-light text-base sm:text-lg">
          No birthday gift, no words, and no song will ever be enough to express how grateful I am that God brought you to me.
        </p>
      </div>

      {/* Wax Seal Envelope Container */}
      <div className="relative max-w-2xl mx-auto">
        {!isOpen ? (
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={handleOpenLetter}
            className="cursor-pointer bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 rounded-3xl p-8 sm:p-12 border-2 border-rose-200/90 shadow-2xl text-center relative overflow-hidden group"
          >
            {/* Background envelope flaps effect */}
            <div className="absolute top-0 inset-x-0 h-16 bg-rose-200/40 rounded-b-[50px] border-b border-rose-300/40" />

            <div className="relative z-10 space-y-6 pt-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-rose-600 to-red-700 shadow-xl flex items-center justify-center text-white text-3xl border-4 border-amber-300/80 group-hover:scale-110 transition-transform">
                <span className="font-cursive font-bold text-2xl">S&S</span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-gray-800">
                  A Private Love Letter For Sayana
                </h3>
                <p className="text-sm text-gray-500 font-serif italic">
                  Sealed with Salim&apos;s deepest affection • Touch the wax seal to open
                </p>
              </div>

              <button className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 mx-auto transition-colors">
                <Mail className="w-4 h-4" />
                <span>Break Wax Seal & Read Letter 🕊️</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Unfolded Parchment Letter */
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#fffdfa] rounded-3xl p-6 sm:p-12 border border-amber-200/80 shadow-2xl relative space-y-6"
            style={{
              backgroundImage: 'radial-gradient(#e5d5be 0.5px, transparent 0.5px)',
              backgroundSize: '16px 16px',
            }}
          >
            {/* Header / Date stamp */}
            <div className="flex items-center justify-between border-b border-amber-200/70 pb-4 text-xs text-amber-900 font-serif">
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-rose-600" />
                <span className="font-semibold uppercase tracking-wider">Salim&apos;s Heartbeat Journal</span>
              </div>
              <span className="italic">Chapter 21 • With Eternal Love</span>
            </div>

            {/* Letter Content */}
            <div className="space-y-4 text-gray-800 font-serif text-base sm:text-lg leading-relaxed">
              <p className="font-cursive text-2xl sm:text-3xl text-rose-700 font-semibold">
                To My Dearest Sayana,
              </p>

              <p>
                Before you stepped into my world, life was just ordinary days ticking by. But the moment your gentle smile entered my life, you turned the mundane into pure poetry. You gave my days meaning, rhythm, and a reason to smile at my phone like a fool.
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/80 border border-rose-100/90 space-y-2 text-rose-950 font-serif text-sm sm:text-base italic">
                <span className="font-bold text-rose-600 block not-italic uppercase text-[11px] tracking-wider">
                  The Things I Am Most Thankful For:
                </span>
                <p>
                  ✨ <strong>Thank you for coming into my life:</strong> You are the sweetest prayer I never knew I was praying for.
                </p>
                <p>
                  ✨ <strong>Thank you for your warmth & surprises:</strong> The little thoughtful gestures, the unexpected joys you bring me, and how you always know how to make me feel special.
                </p>
                <p>
                  ✨ <strong>Thank you for your laughter:</strong> Your giggles are my favorite sound, and making you laugh is my proudest achievement every single day.
                </p>
                <p>
                  ✨ <strong>Thank you for your patience & love:</strong> Standing by me, believing in me, and giving me a safe haven in your heart.
                </p>
              </div>

              <p>
                Seeing you turn 21 today makes me look back with so much gratitude and look forward with so much excitement. You are growing into an incredible, independent, radiant woman—yet you will always remain the cute girl who loves chocolates, craves ice cream at midnight, and holds onto me during cold motorcycle rides.
              </p>

              <p>
                My promise to you on this 21st milestone: I will cherish you in the highs, hold your hand in the lows, celebrate your every win, and love you a little more with every single breath I take.
              </p>

              <div className="pt-6 border-t border-amber-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase font-bold text-gray-400">Forever Devoted,</div>
                  <div className="font-cursive text-3xl sm:text-4xl text-rose-600 font-bold mt-1">
                    Your Salim ❤️
                  </div>
                </div>

                <button
                  onClick={handleOpenLetter}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 underline"
                >
                  Close & Re-seal Letter
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

