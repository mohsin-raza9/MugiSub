'use client';

import React, { useState } from 'react';
import { User, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CharacterForm() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('unknown');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setName('');
    setGender('unknown');
    setDescription('');
    setImage('');
    setRating('');
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="py-8 flex flex-col items-center justify-center text-center font-mono">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] mb-4 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Character Added</h3>
        <p className="text-xs text-emerald-400 mt-1 uppercase max-w-md">
          RECORD CREATED SUCCESSFULLY.
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={resetForm}
            className="px-5 py-2 bg-[#0d111a] border border-[#1d2433] hover:border-emerald-500/40 text-xs font-bold uppercase transition-all cursor-pointer"
          >
            Add Another
          </button>
          <Link
            href="/admin"
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase shadow-[0_0_10px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Character Name</label>
          <p className="text-[10px] text-slate-500 mt-1">Full name of the character.</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Asuka Langley Soryu"
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-emerald-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      {/* Gender */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Gender</label>
          <p className="text-[10px] text-slate-500 mt-1">Select the character's gender.</p>
        </div>
        <div className="md:w-2/3 relative">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-emerald-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors appearance-none cursor-pointer"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="unknown">Unknown</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left mt-2">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Description / Bio</label>
          <p className="text-[10px] text-slate-500 mt-1">Character biography and personality details.</p>
        </div>
        <div className="md:w-2/3">
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter character biography..."
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-emerald-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors resize-y"
          />
        </div>
      </div>

      {/* Image URL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Image URL</label>
          <p className="text-[10px] text-slate-500 mt-1">Link to character portrait.</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-emerald-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      {/* Initial Rating */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Initial Rating</label>
          <p className="text-[10px] text-slate-500 mt-1">Base score (0 to 10).</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="e.g. 8.5"
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-emerald-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center justify-center pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#059669] text-white hover:bg-[#10b981] font-bold text-xs uppercase py-2.5 px-8 transition-all duration-300 border border-[#34d399] shadow-[0_0_15px_rgba(52,211,153,0.35)] hover:shadow-[0_0_20px_rgba(52,211,153,0.55)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-none font-mono flex items-center gap-2"
        >
          {isSubmitting ? 'Processing...' : <><User className="w-4 h-4" /> Add Character</>}
        </button>
      </div>
    </form>
  );
}
