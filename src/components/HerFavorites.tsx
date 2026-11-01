'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, Moon, IceCream, Heart, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FavoriteItem {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  funFact: string;
  salimNote: string;
  bgGradient: string;
  borderCol: string;
}

const favorites: FavoriteItem[] = [
  {
    id: 'chocolates',
    emoji: '🍫',
    title: 'Silk & Chocolates',
    subtitle: 'The Instant Mood Lifter',
    funFact: 'Scientifically proven: 99.9% of Sayana’s pout vanishes after exactly two bites of chocolate.',
    salimNote: 'Whenever you get mad at me, my cheat code is always hiding a chocolate bar in my pocket. Works 10/10 times! 😂',
    bgGradient: 'from-amber-50 to-orange-50',
    borderCol: 'border-amber-200',
  },
  {
    id: 'icecream',
    emoji: '🍦',
    title: 'Late Night Ice Cream',
    subtitle: 'Cold Scoops, Warm Heart',
    funFact: 'Doesn’t matter if it’s 2:00 AM or freezing cold; "Let’s get ice cream" is always accepted.',
    salimNote: 'Stealing a spoonful of your ice cream just to watch you give me that dramatic angry-cute glare is my favorite hobby!',
    bgGradient: 'from-pink-50 to-rose-50',
    borderCol: 'border-pink-200',
  },
  {
    id: 'nightrides',
    emoji: '🏍️🌌',
    title: 'Midnight Rides',
    subtitle: 'Cold Breeze & Warm Hugs',
    funFact: 'Empty roads + cool wind + your favorite playlist playing on low volume = pure therapy.',
    salimNote: 'Feeling your hands tight around my waist while the whole city sleeps is where I feel most at peace. Just us two against the world.',
    bgGradient: 'from-indigo-50 to-purple-50',
    borderCol: 'border-indigo-200',
  },
  {
    id: 'biriyani',
    emoji: '🍲',
    title: 'Aromatic Biriyani',
    subtitle: 'The Ultimate True Love',
    funFact: 'Salim is handsome, but biriyani is biriyani. Salim accepts taking second place to chicken/mutton biriyani.',
    salimNote: 'Watching your face light up when the hot biriyani pot opens is the purest joy. I promise to feed you the best biriyani forever!',
    bgGradient: 'from-red-50 to-amber-50',
    borderCol: 'border-rose-200',
  },
];

export default function HerFavorites() {
  const [happinessScore, setHappinessScore] = useState(21);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const boostHappiness = (id: string, e: React.MouseEvent) => {
    setActiveItem(id);
    setHappinessScore((prev) => Math.min(prev + 20, 100));

    confetti({
      particleCount: 20,
      spread: 45,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ['#fb7185', '#fbbf24', '#c084fc'],
    });
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10" id="favorites">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>The Cheat Sheet To Sayana&apos;s Heart</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900">
          The Things That Make You Smile Most
        </h2>
        <p className="text-gray-600 font-light text-base sm:text-lg">
          I studied every single smile of yours. Here are the sacred four elements guaranteed to melt Sayana&apos;s heart!
        </p>

        {/* Happiness Meter */}
        <div className="max-w-md mx-auto pt-4">
          <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-1.5">
            <span className="flex items-center gap-1 text-rose-600">
              <Smile className="w-4 h-4" /> Sayana&apos;s Birthday Happiness Meter
            </span>
            <span className="text-rose-600 font-mono text-sm">{happinessScore}%</span>
          </div>
          <div className="w-full bg-rose-100 h-3 rounded-full overflow-hidden p-0.5 border border-rose-200">
            <motion.div
              className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${happinessScore}%` }}
            />
          </div>
          <div className="text-[11px] text-gray-400 mt-1 italic">
            Tap the cards below to fuel her happiness to 100%!
          </div>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((item, index) => {
          const isSelected = activeItem === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={(e) => boostHappiness(item.id, e)}
              className={`cursor-pointer rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${item.bgGradient} border ${item.borderCol} shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
            >
              {/* Subtle background icon */}
              <div className="absolute -right-4 -bottom-4 text-7xl opacity-15 select-none pointer-events-none group-hover:scale-125 transition-transform duration-500">
                {item.emoji}
              </div>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-3xl border border-white/60 group-hover:rotate-6 transition-transform">
                  {item.emoji}
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 text-gray-700 shadow-sm border border-gray-100">
                  {item.subtitle}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>

              <div className="space-y-3">
                <p className="text-sm text-gray-700 font-medium">
                  {item.funFact}
                </p>

                <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-white shadow-xs text-xs text-rose-950 font-serif italic">
                  <span className="font-bold text-rose-600 block not-italic uppercase text-[10px] tracking-wider mb-0.5">
                    Salim&apos;s Confession 💌
                  </span>
                  &ldquo;{item.salimNote}&rdquo;
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs text-rose-600 font-semibold">
                <span>Click to trigger a smile ✨</span>
                <Heart className="w-4 h-4 fill-rose-500 group-hover:scale-125 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
