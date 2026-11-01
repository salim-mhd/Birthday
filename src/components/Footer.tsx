'use client';

import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-transparent via-rose-100/60 to-rose-200/80 pt-16 pb-12 px-4 text-center border-t border-rose-200/60 z-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 text-rose-500 text-2xl font-cursive">
          <span>Sayana</span>
          <Heart className="w-5 h-5 fill-rose-500 animate-pulse" />
          <span>Salim</span>
        </div>

        <p className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
          Happy 21<sup className="text-rose-500 text-lg">st</sup> Birthday, My Forever Queen!
        </p>

        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Crafted with endless love, midnight thoughts, and eternal devotion by Salim for Sayana&apos;s special day.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white text-rose-600 shadow-md hover:shadow-lg border border-rose-200 hover:scale-110 transition-all"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 border-t border-rose-200/40 text-[11px] text-gray-400 font-mono">
          <span>CHAPTER 21 • MONGODB VAULT PROTECTED • ALL MY HEART RESERVED FOR SAYANA</span>
        </div>
      </div>
    </footer>
  );
}
