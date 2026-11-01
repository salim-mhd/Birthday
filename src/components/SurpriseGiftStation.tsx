'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Check, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurpriseGift {
  id: string;
  name: string;
  icon: string;
  category: string;
  tagline: string;
  voucherDescription: string;
  salimGuarantee: string;
  colorScheme: string;
}

const surpriseList: SurpriseGift[] = [
  {
    id: 'anklet',
    name: 'Delicate Anklet (Payal)',
    icon: '💫',
    category: 'Jewelry & Grace',
    tagline: 'Chiming melody for every graceful step',
    voucherDescription: 'Official Voucher: 1x Handcrafted silver/gold payal chosen with love.',
    salimGuarantee: 'Salim guarantees to kneel and fasten this payal around your ankle himself. Every chime will remind you of how much you are cherished.',
    colorScheme: 'from-amber-100/80 to-yellow-50 border-amber-300 text-amber-900',
  },
  {
    id: 'kiss',
    name: 'Gentle Forehead & Sweet Kisses',
    icon: '💋',
    category: 'Affection & Warmth',
    tagline: 'Pure romance, infinite refills',
    voucherDescription: 'Official Voucher: Unlimited sweet kisses on demand, anytime, anywhere.',
    salimGuarantee: 'Valid on bad days, good days, sleepy mornings, and celebratory moments. Lifetime guarantee, non-transferable, exclusive only to Sayana.',
    colorScheme: 'from-rose-100/80 to-pink-50 border-rose-300 text-rose-900',
  },
  {
    id: 'hug',
    name: 'Tight 5-Minute Bear Hug',
    icon: '🫂',
    category: 'Comfort & Peace',
    tagline: 'The safest place in the entire world',
    voucherDescription: 'Official Voucher: The tightest, coziest embrace until your heart feels warm.',
    salimGuarantee: 'When the world gets loud, bury your face into my shoulder. Salim’s arms are your permanent home.',
    colorScheme: 'from-purple-100/80 to-indigo-50 border-purple-300 text-purple-900',
  },
  {
    id: 'chocolate',
    name: 'Silky Chocolate Hamper',
    icon: '🍫',
    category: 'Sweet Cravings',
    tagline: 'Because life is sweeter with you',
    voucherDescription: 'Official Voucher: A rich collection of Sayana’s favorite dark and milk chocolates.',
    salimGuarantee: 'Guaranteed to replenish your secret snack drawer so you never run out of sweetness!',
    colorScheme: 'from-orange-100/80 to-amber-50 border-orange-300 text-orange-950',
  },
  {
    id: 'icecream',
    name: 'Midnight Ice Cream Date',
    icon: '🍦',
    category: 'Late Night Treats',
    tagline: 'Double scoops under the starry sky',
    voucherDescription: 'Official Voucher: 1x Midnight drive to the best ice cream parlor.',
    salimGuarantee: 'Pick whatever flavor you want, double scoop with toppings. Even at 1 AM, if Sayana wants ice cream, Salim drives!',
    colorScheme: 'from-pink-100/80 to-red-50 border-pink-300 text-pink-900',
  },
  {
    id: 'bellychain',
    name: 'Exquisite Belly Chain',
    icon: '✨',
    category: 'Adornment & Elegance',
    tagline: 'A delicate touch of pure royal beauty',
    voucherDescription: 'Official Voucher: 1x Elegant belly chain handcrafted for your charm.',
    salimGuarantee: 'Designed to accentuate your timeless beauty and make you feel like the royal empress you truly are.',
    colorScheme: 'from-yellow-100/80 to-amber-50 border-yellow-300 text-yellow-900',
  },
  {
    id: 'rose',
    name: 'Bouquet of Fresh Crimson Roses',
    icon: '🌹',
    category: 'Eternal Love',
    tagline: 'Red roses as vibrant as your grace',
    voucherDescription: 'Official Voucher: A hand-tied bouquet of fresh velvety red roses + 1 preserved rose.',
    salimGuarantee: 'The fresh roses will bloom with your beauty, and the preserved rose will last forever—just like Salim’s love for you.',
    colorScheme: 'from-rose-100/80 to-red-50 border-red-300 text-red-900',
  },
];

export default function SurpriseGiftStation() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['anklet', 'kiss', 'rose']);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customRequest, setCustomRequest] = useState('');

  const toggleGift = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClaim = async () => {
    if (selectedIds.length === 0) return;

    setIsSubmitting(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#a855f7'],
    });

    try {
      await fetch('/api/gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedGifts: selectedIds,
          notes: customRequest,
          recipient: 'Sayana',
        }),
      });
      setIsClaimed(true);
    } catch (err) {
      console.warn('Network fallback', err);
      setIsClaimed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10" id="surprises">
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
          <Gift className="w-3.5 h-3.5 text-rose-500" />
          <span>Sayana&apos;s 21st Birthday Surprise Station</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900">
          Pick Your Birthday Surprises 🎁
        </h2>
        <p className="text-gray-600 font-light text-base sm:text-lg">
          You don&apos;t have to settle for just one! Select all the treats, gifts, and romantic promises you want Salim to fulfill for your 21st birthday.
        </p>
      </div>

      {/* Gift Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {surpriseList.map((gift) => {
          const isSelected = selectedIds.includes(gift.id);
          return (
            <motion.div
              key={gift.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleGift(gift.id)}
              className={`cursor-pointer rounded-3xl p-6 border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-md ${
                isSelected
                  ? `bg-gradient-to-br ${gift.colorScheme} ring-4 ring-rose-400/40 shadow-xl`
                  : 'bg-white/80 border-gray-200/80 hover:border-rose-200'
              }`}
            >
              {/* Selected Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl border border-black/5">
                  {gift.icon}
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'border-2 border-gray-300 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              </div>

              {/* Title & Category */}
              <div className="space-y-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full inline-block">
                  {gift.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-gray-900 leading-snug">
                  {gift.name}
                </h3>
                <p className="text-xs text-gray-600 font-medium">
                  {gift.tagline}
                </p>
              </div>

              {/* Voucher Preview */}
              <div className="p-3.5 rounded-2xl bg-white/90 border border-black/5 space-y-1.5 text-left text-xs">
                <div className="font-semibold text-rose-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Salim&apos;s Promise:</span>
                </div>
                <p className="text-gray-700 italic font-serif">
                  &ldquo;{gift.salimGuarantee}&rdquo;
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Claim Bar & Summary */}
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xl text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <HeartHandshake className="w-5 h-5 text-rose-500" />
          <h4 className="font-serif text-lg font-bold text-gray-800">
            {selectedIds.length} Surprise{selectedIds.length !== 1 ? 's' : ''} Selected For Sayana
          </h4>
        </div>

        <p className="text-xs sm:text-sm text-gray-500">
          Click below to send your chosen wishlist directly into Salim&apos;s database vault so he can prepare your gifts!
        </p>

        {/* Custom optional note */}
        <input
          type="text"
          value={customRequest}
          onChange={(e) => setCustomRequest(e.target.value)}
          placeholder="Any specific design or special color request for Salim?"
          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/40 text-gray-800"
        />

        <button
          onClick={handleClaim}
          disabled={selectedIds.length === 0 || isSubmitting}
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 text-white font-bold text-base shadow-lg shadow-rose-300/60 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <Gift className="w-5 h-5" />
          <span>{isSubmitting ? 'Claiming Surprises...' : 'Claim My Birthday Surprises! 🎁'}</span>
        </button>

        <AnimatePresence>
          {isClaimed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Surprise list confirmed! Salim has been notified and your surprises are officially locked in! 👑🥰</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
