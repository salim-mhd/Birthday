'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareHeart, Send, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoveNote {
  _id?: string;
  sender: string;
  message: string;
  emoji: string;
  createdAt?: string;
}

const defaultNotes: LoveNote[] = [
  {
    sender: 'Salim ❤️',
    message: 'Happy 21st Birthday my queen! Every day with you is a blessing beyond measure. I love you endlessly!',
    emoji: '💖',
  },
  {
    sender: 'Salim 🏍️',
    message: 'Tonight after your cake, let’s go for our favorite midnight ride and grab double scoop ice creams!',
    emoji: '🍦',
  },
  {
    sender: 'Salim 💍',
    message: 'Remember that YES is the only valid answer today and forever! You belong with me.',
    emoji: '✨',
  },
];

export default function LoveGuestbook() {
  const [notes, setNotes] = useState<LoveNote[]>(defaultNotes);
  const [sender, setSender] = useState('Sayana (The Birthday Girl) 🌸');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💖');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (data.success && data.messages && data.messages.length > 0) {
        setNotes([...data.messages, ...defaultNotes]);
      }
    } catch (err) {
      console.warn('Using default notes', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    const newNote: LoveNote = {
      sender: sender.trim() || 'Sayana ❤️',
      message: message.trim(),
      emoji: selectedEmoji,
    };

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#fb7185', '#a855f7'],
    });

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      });
      const data = await res.json();
      if (data.success) {
        setNotes([newNote, ...notes]);
        setMessage('');
      } else {
        setNotes([newNote, ...notes]);
        setMessage('');
      }
    } catch (err) {
      setNotes([newNote, ...notes]);
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative z-10" id="guestbook">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
          <MessageSquareHeart className="w-3.5 h-3.5 text-pink-500" />
          <span>Our Love Notes Wall</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900">
          Leave A Sweet Note For Us 💌
        </h2>
        <p className="text-gray-600 font-light text-base sm:text-lg">
          A digital wall of wishes, promises, and sweet memories. Sayana, type a note back to Salim or save a birthday memory!
        </p>
      </div>

      {/* Note input form */}
      <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xl mb-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Your name"
              className="flex-1 p-3 rounded-xl border border-rose-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/40"
            />
            {/* Emoji picker */}
            <div className="flex items-center justify-center gap-1.5 p-1 bg-rose-50 rounded-xl border border-rose-200">
              {['💖', '🍫', '🍦', '🌹', '💍', '✨'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`text-lg p-1.5 rounded-lg transition-transform ${
                    selectedEmoji === emoji ? 'bg-white shadow scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your sweet thought, reply to Salim, or birthday wish..."
            rows={3}
            className="w-full p-3.5 rounded-xl border border-rose-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/40 placeholder-gray-400"
          />

          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:opacity-50 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Posting Note...' : 'Pin Message On Our Wall 📌'}</span>
          </button>
        </form>
      </div>

      {/* Sticky Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <motion.div
            key={note._id || index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`p-5 rounded-2xl shadow-md border flex flex-col justify-between ${
              index % 3 === 0
                ? 'bg-rose-50/90 border-rose-200 -rotate-1'
                : index % 3 === 1
                ? 'bg-amber-50/90 border-amber-200 rotate-1'
                : 'bg-purple-50/90 border-purple-200 -rotate-0.5'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-gray-800 text-sm flex items-center gap-1.5">
                  <span className="text-xl">{note.emoji}</span>
                  <span>{note.sender}</span>
                </span>
                <Heart className="w-4 h-4 text-rose-400 fill-rose-300" />
              </div>
              <p className="font-cursive text-base text-gray-700 leading-snug">
                &ldquo;{note.message}&rdquo;
              </p>
            </div>
            <div className="pt-3 border-t border-black/5 text-[10px] text-gray-400 text-right uppercase tracking-wider font-semibold">
              Stamped with love
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

