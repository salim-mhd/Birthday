'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Lock, Eye, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurpriseGift {
  number: number;
  id: string;
  name: string;
  icon: string;
  category: string;
  tagline: string;
  mysteryHint: string;
  voucherDescription: string;
  salimGuarantee: string;
  colorScheme: string;
  boxGradient: string;
}

const surpriseList: SurpriseGift[] = [
  {
    number: 1,
    id: 'pathasaram',
    name: 'Pathasaram (പാദസരം / Delicate Anklet)',
    icon: '💫',
    category: 'Jewelry & Grace',
    tagline: 'Chiming melody for every graceful step',
    mysteryHint: 'Something shiny that chimes sweetly with every step you take (പാദസരം)...',
    voucherDescription: 'Official Voucher: 1x Handcrafted gold/silver Pathasaram chosen with all my love.',
    salimGuarantee: 'Salim guarantees to kneel down and fasten this gorgeous Pathasaram around your ankle himself. Every chime will remind you of our love.',
    colorScheme: 'from-amber-100/90 to-yellow-50 border-amber-300 text-amber-900',
    boxGradient: 'from-amber-400 to-amber-600',
  },
  {
    number: 2,
    id: 'selfie',
    name: 'Surprise Cute Selfie With Salim',
    icon: '🤳',
    category: 'Moments & Memories',
    tagline: 'Cute poses, crazy faces & memories framed forever',
    mysteryHint: 'A special camera click of you and Salim making funny faces and sweet smiles...',
    voucherDescription: 'Official Voucher: A 21st birthday couple photoshoot & cute selfies session with Salim.',
    salimGuarantee: 'Salim promises to take as many retakes as you want until you get the perfect aesthetic selfie angle for your gallery!',
    colorScheme: 'from-cyan-100/90 to-sky-50 border-cyan-300 text-sky-950',
    boxGradient: 'from-cyan-500 to-blue-600',
  },
  {
    number: 3,
    id: 'kiss',
    name: 'Gentle Forehead & Sweet Kisses',
    icon: '💋',
    category: 'Affection & Warmth',
    tagline: 'Pure romance, infinite refills',
    mysteryHint: 'Something tender and warm for your forehead and soft lips...',
    voucherDescription: 'Official Voucher: Unlimited sweet kisses on demand, anytime, anywhere.',
    salimGuarantee: 'Valid on bad days, good days, sleepy mornings, and celebratory moments. Lifetime guarantee, non-transferable, exclusive only to Sayana.',
    colorScheme: 'from-rose-100/90 to-pink-50 border-rose-300 text-rose-900',
    boxGradient: 'from-rose-400 to-pink-600',
  },
  {
    number: 4,
    id: 'hug',
    name: 'Tight 5-Minute Bear Hug',
    icon: '🫂',
    category: 'Comfort & Peace',
    tagline: 'The safest place in the entire world',
    mysteryHint: 'The coziest, warmest harbor whenever the world gets overwhelming...',
    voucherDescription: 'Official Voucher: The tightest, coziest embrace until your heart feels warm.',
    salimGuarantee: 'When the world gets loud, bury your face into my shoulder. Salim’s arms are your permanent home.',
    colorScheme: 'from-purple-100/90 to-indigo-50 border-purple-300 text-purple-900',
    boxGradient: 'from-purple-400 to-indigo-600',
  },
  {
    number: 5,
    id: 'chocolate',
    name: 'Silky Chocolate Hamper',
    icon: '🍫',
    category: 'Sweet Cravings',
    tagline: 'Because life is sweeter with you',
    mysteryHint: 'Your secret pocket remedy for bad moods & late-night cravings...',
    voucherDescription: 'Official Voucher: A rich collection of Sayana’s favorite dark and milk chocolates.',
    salimGuarantee: 'Guaranteed to replenish your secret snack drawer so you never run out of sweetness!',
    colorScheme: 'from-orange-100/90 to-amber-50 border-orange-300 text-orange-950',
    boxGradient: 'from-amber-600 to-amber-800',
  },
  {
    number: 6,
    id: 'icecream',
    name: 'Midnight Ice Cream Date',
    icon: '🍦',
    category: 'Late Night Treats',
    tagline: 'Double scoops under the starry sky',
    mysteryHint: 'A cold, delicious midnight delight under the starry night sky...',
    voucherDescription: 'Official Voucher: 1x Midnight drive to the best ice cream parlor.',
    salimGuarantee: 'Pick whatever flavor you want, double scoop with toppings. Even at 1 AM, if Sayana wants ice cream, Salim drives!',
    colorScheme: 'from-pink-100/90 to-red-50 border-pink-300 text-pink-900',
    boxGradient: 'from-pink-500 to-rose-600',
  },
  {
    number: 7,
    id: 'bellychain',
    name: 'Exquisite Belly Chain',
    icon: '✨',
    category: 'Adornment & Elegance',
    tagline: 'A delicate touch of pure royal beauty',
    mysteryHint: 'A delicate, royal piece of golden jewelry designed for your waist...',
    voucherDescription: 'Official Voucher: 1x Elegant belly chain handcrafted for your charm.',
    salimGuarantee: 'Designed to accentuate your timeless beauty and make you feel like the royal empress you truly are.',
    colorScheme: 'from-yellow-100/90 to-amber-50 border-yellow-300 text-yellow-900',
    boxGradient: 'from-yellow-500 to-amber-600',
  },
  {
    number: 8,
    id: 'rose',
    name: 'Bouquet of Fresh Crimson Roses',
    icon: '🌹',
    category: 'Eternal Love',
    tagline: 'Red roses as vibrant as your grace',
    mysteryHint: 'Timeless crimson petals that blossom just like your smile...',
    voucherDescription: 'Official Voucher: A hand-tied bouquet of fresh velvety red roses + 1 preserved rose.',
    salimGuarantee: 'The fresh roses will bloom with your beauty, and the preserved rose will last forever—just like Salim’s love for you.',
    colorScheme: 'from-rose-100/90 to-red-50 border-red-300 text-red-900',
    boxGradient: 'from-red-500 to-rose-700',
  },
];

export default function SurpriseGiftStation() {
  // Revealed state keeps track of which numbered boxes Sayana has opened
  const [revealedNumbers, setRevealedNumbers] = useState<number[]>([]);

  // Unbox a numbered surprise
  const handleBoxClick = (gift: SurpriseGift, e: React.MouseEvent) => {
    const isAlreadyRevealed = revealedNumbers.includes(gift.number);

    if (!isAlreadyRevealed) {
      // First time clicking this number: reveal with celebration!
      setRevealedNumbers((prev) => [...prev, gift.number]);

      // Sparkle confetti burst for this box
      confetti({
        particleCount: 35,
        spread: 50,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ['#f43f5e', '#ec4899', '#fbbf24', '#a855f7'],
      });
    }
  };

  const revealAllBoxes = () => {
    const allNums = surpriseList.map((g) => g.number);
    setRevealedNumbers(allNums);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24'],
    });
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10" id="surprises">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
          <Gift className="w-3.5 h-3.5 text-rose-500" />
          <span>Sayana&apos;s 21st Birthday Mystery Boxes</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900">
          Pick Your Birthday Surprises 🎁
        </h2>

        <p className="text-gray-600 font-light text-base sm:text-lg">
          Behind each number lies a special birthday surprise prepared by Salim! Click any number to unveil what is hidden inside.
        </p>

        {/* Progress Tracker */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="px-4 py-1.5 rounded-full bg-white/90 shadow-sm border border-rose-200 text-xs font-bold text-rose-600 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Unboxed: {revealedNumbers.length} of {surpriseList.length} Mystery Surprises</span>
          </div>

          {revealedNumbers.length < surpriseList.length && (
            <button
              onClick={revealAllBoxes}
              className="text-xs text-rose-600 hover:text-rose-800 underline font-semibold flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Unveil All</span>
            </button>
          )}
        </div>
      </div>

      {/* Numbered Mystery Boxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {surpriseList.map((gift) => {
          const isRevealed = revealedNumbers.includes(gift.number);

          return (
            <motion.div
              key={gift.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => handleBoxClick(gift, e)}
              className="cursor-pointer rounded-3xl transition-all duration-300 relative select-none"
            >
              <AnimatePresence mode="wait">
                {!isRevealed ? (
                  /* ======================================================== */
                  /* UNREVEALED: MYSTERY NUMBERED GIFT BOX                    */
                  /* ======================================================== */
                  <motion.div
                    key={`mystery-${gift.number}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-3xl p-7 bg-white/95 border-2 border-rose-200/90 shadow-lg hover:shadow-2xl hover:border-rose-400 relative overflow-hidden flex flex-col justify-between min-h-[300px] group"
                  >
                    {/* Decorative gift ribbon background accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-100 to-transparent rounded-bl-full pointer-events-none" />

                    {/* Top row: Number pill + Lock icon */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-extrabold tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                          Surprise #{gift.number}
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 group-hover:scale-110 group-hover:bg-rose-100 transition-all">
                        <Lock className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Center: Big Aesthetic Number Token */}
                    <div className="my-auto text-center space-y-3 relative z-10 py-3">
                      <div className="relative inline-block">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gift.boxGradient} text-white font-serif font-extrabold text-4xl shadow-xl flex items-center justify-center mx-auto transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 ring-4 ring-rose-200/50`}>
                          0{gift.number}
                        </div>
                        <Sparkles className="w-5 h-5 text-amber-400 absolute -top-2 -right-2 animate-bounce" />
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-serif text-lg font-bold text-gray-800">
                          Mystery Box #{gift.number}
                        </h4>
                        <p className="text-xs text-gray-500 italic px-2">
                          &ldquo;{gift.mysteryHint}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-3 border-t border-rose-100/80 flex items-center justify-center gap-2 text-xs font-bold text-rose-600 group-hover:text-rose-700">
                      <Gift className="w-4 h-4 animate-pulse" />
                      <span>Click To Open Box #{gift.number} 🎁</span>
                    </div>
                  </motion.div>
                ) : (
                  /* ======================================================== */
                  /* REVEALED: DETAILED SURPRISE & VOUCHER                     */
                  /* ======================================================== */
                  <motion.div
                    key={`revealed-${gift.number}`}
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={`rounded-3xl p-6 border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[300px] bg-gradient-to-br ${gift.colorScheme} ring-4 ring-rose-400/40 shadow-rose-200/60`}
                  >
                    {/* Header: Icon, Number Badge, Heart */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl border border-black/5">
                          {gift.icon}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-white/80 px-2 py-0.5 rounded-full inline-block shadow-2xs">
                            Box #{gift.number} Unlocked ✨
                          </span>
                          <span className="block text-[11px] font-semibold text-gray-500 mt-0.5">
                            {gift.category}
                          </span>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-rose-500">
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div className="space-y-1 mb-3 text-left">
                      <h3 className="font-serif text-xl font-bold text-gray-900 leading-snug">
                        {gift.name}
                      </h3>
                      <p className="text-xs text-gray-600 font-medium">
                        {gift.tagline}
                      </p>
                    </div>

                    {/* Salim's Guarantee / Voucher */}
                    <div className="p-3.5 rounded-2xl bg-white/90 border border-black/5 space-y-1 text-left text-xs">
                      <div className="font-semibold text-rose-600 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Salim&apos;s Guarantee:</span>
                      </div>
                      <p className="text-gray-700 italic font-serif">
                        &ldquo;{gift.salimGuarantee}&rdquo;
                      </p>
                    </div>

                    {/* Voucher Footer */}
                    <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-[11px] font-semibold text-rose-600">
                      <span>Unboxed with all my love ❤️</span>
                      <span className="text-xs">✨</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
