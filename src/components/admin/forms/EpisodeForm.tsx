'use client';

import React, { useState } from 'react';
import { Play, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function EpisodeForm() {
  const [animeId, setAnimeId] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [title, setTitle] = useState('');
  const [lengthMinutes, setLengthMinutes] = useState('');
  const [airDate, setAirDate] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!animeId || !episodeNumber) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setAnimeId('');
    setEpisodeNumber('');
    setTitle('');
    setLengthMinutes('');
    setAirDate('');
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="py-8 flex flex-col items-center justify-center text-center font-mono">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] mb-4 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Episode Added</h3>
        <p className="text-xs text-emerald-400 mt-1 uppercase max-w-md">
          RECORD CREATED SUCCESSFULLY.
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={resetForm}
            className="px-5 py-2 bg-[#0d111a] border border-[#1d2433] hover:border-cyan-500/40 text-xs font-bold uppercase transition-all cursor-pointer"
          >
            Add Another
          </button>
          <Link
            href="/admin"
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase shadow-[0_0_10px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Anime ID */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Anime ID</label>
          <p className="text-[10px] text-slate-500 mt-1">UUID of the parent anime series.</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            required
            value={animeId}
            onChange={(e) => setAnimeId(e.target.value)}
            placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000"
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-cyan-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      {/* Episode Number */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Episode Number</label>
          <p className="text-[10px] text-slate-500 mt-1">Absolute episode number.</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="number"
            required
            min="0"
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(e.target.value)}
            placeholder="e.g. 1"
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-cyan-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Episode Title</label>
          <p className="text-[10px] text-slate-500 mt-1">Optional title for the episode.</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. The Beginning"
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-cyan-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      {/* Duration */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Duration</label>
          <p className="text-[10px] text-slate-500 mt-1">Length in minutes.</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="number"
            min="0"
            value={lengthMinutes}
            onChange={(e) => setLengthMinutes(e.target.value)}
            placeholder="e.g. 24"
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-cyan-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      {/* Air Date */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Air Date</label>
          <p className="text-[10px] text-slate-500 mt-1">Original broadcast date.</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            value={airDate}
            onChange={(e) => setAirDate(e.target.value)}
            placeholder="e.g. 2026-04-01"
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-cyan-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center justify-center pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#0891b2] text-white hover:bg-[#06b6d4] font-bold text-xs uppercase py-2.5 px-8 transition-all duration-300 border border-[#22d3ee] shadow-[0_0_15px_rgba(34,211,238,0.35)] hover:shadow-[0_0_20px_rgba(34,211,238,0.55)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-none font-mono flex items-center gap-2"
        >
          {isSubmitting ? 'Processing...' : <><Play className="w-4 h-4" /> Add Episode</>}
        </button>
      </div>
    </form>
  );
}
