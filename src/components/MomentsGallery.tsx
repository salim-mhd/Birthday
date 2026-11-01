'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ZoomIn, X, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PhotoMoment {
  id: string;
  src: string;
  title: string;
  dateTag: string;
  salimNote: string;
  rotation: string;
  initialLikes: number;
}

const photos: PhotoMoment[] = [
  {
    id: 'poster',
    src: '/images/sayana-poster.jpg',
    title: 'The 21st Milestone Queen 👑',
    dateTag: 'Turning 21 ✨',
    salimNote: 'A collage of perfection. Every picture tells a story of how effortlessly you make life beautiful just by existing.',
    rotation: '-rotate-2',
    initialLikes: 2121,
  },
  {
    id: 'jhumka',
    src: '/images/sayana-smile-jhumka.jpg',
    title: 'That Jhumka & Sparkling Smile 💫',
    dateTag: 'Pure Innocence 💕',
    salimNote: 'Your earrings might make music when you walk, but your smile is the sweetest melody Salim has ever known.',
    rotation: 'rotate-1',
    initialLikes: 520,
  },
  {
    id: 'gentle',
    src: '/images/sayana-gentle-smile.png',
    title: 'Simply, Effortlessly Beautiful 🌿',
    dateTag: 'Raw & Real 💖',
    salimNote: 'No filters, no pretenses—just pure, gentle grace. Looking at this photo always calms my soul after a long day.',
    rotation: '-rotate-1',
    initialLikes: 777,
  },
  {
    id: 'outdoor',
    src: '/images/sayana-outdoor-radiant.jpg',
    title: 'Sunlit Laughter & Sunshine ☀️',
    dateTag: 'Golden Hour Smile 🌸',
    salimNote: 'Even the golden rays of the sun were jealous of how brightly your smile outshined everything around you.',
    rotation: 'rotate-2',
    initialLikes: 1314,
  },
];

export default function MomentsGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMoment | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    poster: 2121,
    jhumka: 520,
    gentle: 777,
    outdoor: 1314,
  });
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isLiked }));
    setLikes((prev) => ({
      ...prev,
      [id]: isLiked ? prev[id] - 1 : prev[id] + 1,
    }));

    if (!isLiked) {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ['#f43f5e', '#fb7185'],
      });
    }
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto relative z-10" id="moments">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          <span>Moments In Time</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900">
          The Girl With My Favorite Smile
        </h2>
        <p className="text-gray-600 font-light text-base sm:text-lg">
          Every snapshot is a page in my favorite love story. Click any polaroid to see what Salim whispers behind each photo.
        </p>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 items-start">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setSelectedPhoto(photo)}
            className={`cursor-pointer bg-white p-4 pt-5 pb-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-rose-100 flex flex-col justify-between ${photo.rotation} hover:rotate-0`}
          >
            {/* Cute Washi tape effect at top */}
            <div className="w-20 h-4 bg-rose-200/70 mx-auto -mt-6 mb-3 rounded-sm shadow-sm backdrop-blur-sm border-t border-b border-rose-300/40" />

            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-rose-50 mb-4 group">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-3 bg-white/90 rounded-full text-rose-600 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-rose-500 tracking-wider uppercase bg-rose-50 px-2.5 py-0.5 rounded-full">
                  {photo.dateTag}
                </span>
                <button
                  onClick={(e) => handleLike(photo.id, e)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full transition-colors ${
                    likedMap[photo.id]
                      ? 'bg-rose-50 text-rose-600'
                      : 'text-gray-400 hover:text-rose-500'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 transition-transform active:scale-125 ${
                      likedMap[photo.id] ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                  <span>{likes[photo.id]}</span>
                </button>
              </div>

              <h3 className="font-serif font-bold text-gray-800 text-base leading-snug">
                {photo.title}
              </h3>
              <p className="font-cursive text-sm text-gray-600 line-clamp-2">
                &ldquo;{photo.salimNote}&rdquo;
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-xl w-full shadow-2xl border border-rose-100 relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/5] sm:aspect-square w-full bg-rose-50">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                    {selectedPhoto.dateTag}
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-rose-600">
                    <Heart className="w-4 h-4 fill-rose-500" />
                    <span>{likes[selectedPhoto.id]} loves</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  {selectedPhoto.title}
                </h3>

                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
                  <div className="text-xs font-semibold text-rose-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    <span>Salim&apos;s Memory Diary</span>
                  </div>
                  <p className="font-cursive text-lg text-gray-700 leading-relaxed">
                    &ldquo;{selectedPhoto.salimNote}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
