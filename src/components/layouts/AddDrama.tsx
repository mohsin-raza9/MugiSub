'use client';

import React, { useState, useEffect } from 'react';
import { FilePlay, X, FileText } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────
interface DramaEpisodeEntry {
  animeId: string;
  episodeNumber: string;
  title: string;
  description: string;
  airDate: string;
}

const emptyEntry: DramaEpisodeEntry = {
  animeId: '',
  episodeNumber: '',
  title: '',
  description: '',
  airDate: '',
};

type Step = 'FORM';

// ─── Component ───────────────────────────────────────────────────────
const AddDrama = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('FORM');
  const [entry, setEntry] = useState<DramaEpisodeEntry>({ ...emptyEntry });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animeList, setAnimeList] = useState<{ id: string, title: string }[]>([]);

  const updateEntry = (fields: Partial<DramaEpisodeEntry>) => {
    setEntry(prev => ({ ...prev, ...fields }));
  };

  // Fetch Anime list when modal opens
  useEffect(() => {
    if (isOpen) {
      fetch('/api/admin/anime?select=true')
        .then(res => res.json())
        .then(data => setAnimeList(data))
        .catch(err => console.error("Failed to fetch anime", err));
    }
  }, [isOpen]);

  // Listen for custom events
  useEffect(() => {
    const handleOpenDrama = (e: any) => {
      setIsOpen(true);
      setStep('FORM');
      if (e.detail?.animeId) {
        updateEntry({ animeId: e.detail.animeId });
      }
    };

    window.addEventListener('open-add-episode', handleOpenDrama);
    return () => window.removeEventListener('open-add-episode', handleOpenDrama);
  }, []);

  const handleCommit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/episode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...entry,
          seasonId: '', // Drama episodes don't have a season
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create Episode');
      }

      console.log('Drama Episode Created');
      setIsOpen(false);
      resetState();
    } catch (error: any) {
      console.error('API Error:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetState();
  };

  const resetState = () => {
    setStep('FORM');
    setEntry({ ...emptyEntry });
  };

  return (
    <>
      {/* Command Button */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex flex-col items-center justify-center p-1.5 bg-[#5c4a1a] hover:bg-[#6e5a20] text-white border border-[#42360f] transition-colors cursor-pointer rounded-sm group min-h-[58px] w-full"
      >
        <FilePlay size={15} className="mb-0.5 group-hover:scale-110 transition-transform" />
        <span className="text-[8px] font-mono font-bold tracking-tight text-center leading-tight">ADD_DRAMA</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#bdbfc3] border border-[#787b80] w-[500px] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col">

            {/* Header */}
            <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-3 py-2 text-[11px] border-b border-[#1a202c] flex justify-between items-center shrink-0">
              <span>ADD DRAMA EPISODE</span>
              <button type="button" onClick={handleCancel} disabled={isSubmitting} className="hover:text-red-400 font-bold cursor-pointer disabled:opacity-50">
                <X />
              </button>
            </div>

            {/* Content */}
            <div className="p-3 space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar text-left flex-1 min-h-0">

              {step === 'FORM' && (
                <form onSubmit={handleCommit} className="space-y-2">

                  {/* DETAILS Section */}
                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">DETAILS</span>

                    {/* Anime Name */}
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Anime Name<span className="text-red-700">*</span></label>
                      <select
                        required
                        value={entry.animeId}
                        onChange={e => updateEntry({ animeId: e.target.value })}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243]"
                      >
                        <option value="">-- Select Anime --</option>
                        {animeList.map(a => (
                          <option key={a.id} value={a.id}>{a.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* Episode Number */}
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5 mt-2">Episode Number<span className="text-red-700">*</span></label>
                      <input
                        required
                        type="number"
                        min={1}
                        value={entry.episodeNumber}
                        onChange={e => updateEntry({ episodeNumber: e.target.value })}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243] font-mono"
                        placeholder="e.g. 1"
                      />
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5 mt-2">Title</label>
                      <input
                        type="text"
                        value={entry.title}
                        onChange={e => updateEntry({ title: e.target.value })}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                        placeholder="Episode Title..."
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5 mt-2">Description</label>
                      <textarea
                        value={entry.description}
                        onChange={e => updateEntry({ description: e.target.value })}
                        rows={3}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243] resize-none"
                        placeholder="Description..."
                      />
                    </div>

                    {/* Air Date */}
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5 mt-2">Air Date</label>
                      <input
                        type="date"
                        value={entry.airDate}
                        onChange={e => updateEntry({ airDate: e.target.value })}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                      />
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-2 pt-2 border-t border-[#9fa2a8]">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="flex-1 py-1.5 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-1.5 bg-[#1a5c36] hover:bg-[#236b40] text-white text-[11px] font-mono font-bold border border-[#134526] cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? 'SAVING...' : 'COMMIT_RECORD'}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddDrama;