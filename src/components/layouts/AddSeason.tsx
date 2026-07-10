'use client';

import React, { useState, useEffect } from 'react';
import { MonitorPlay, X, FileText } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────
interface SeasonEntry {
  animeId: string;
  number: string;
  title: string;
  description: string;
}

const emptyEntry: SeasonEntry = {
  animeId: '',
  number: '',
  title: '',
  description: '',
};

type Step = 'FORM' | 'CONFIRM_NEXT';

// ─── Component ───────────────────────────────────────────────────────
const AddSeason = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('FORM');
  const [entry, setEntry] = useState<SeasonEntry>({ ...emptyEntry });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animeList, setAnimeList] = useState<{id: string, title: string}[]>([]);
  const [newSeasonData, setNewSeasonData] = useState<{id: string, title: string} | null>(null);

  const updateEntry = (fields: Partial<SeasonEntry>) => {
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

  // Listen for custom events from AddAnime
  useEffect(() => {
    const handleOpenAddSeason = (e: any) => {
      setIsOpen(true);
      setStep('FORM');
      updateEntry({ animeId: e.detail.animeId });
    };

    window.addEventListener('open-add-season', handleOpenAddSeason);
    return () => window.removeEventListener('open-add-season', handleOpenAddSeason);
  }, []);

  const handleCommit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/season', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create Season');
      }

      const responseData = await response.json();
      setNewSeasonData({ id: responseData.season.id, title: responseData.season.title || `Season ${responseData.season.number}` });
      setStep('CONFIRM_NEXT');
    } catch (error: any) {
      console.error('API Error:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const finalizeFlow = (navigateYes: boolean) => {
    if (navigateYes && newSeasonData) {
      const selectedAnime = animeList.find(a => a.id === entry.animeId);
      window.dispatchEvent(new CustomEvent('open-add-episode', { 
        detail: { 
          animeId: entry.animeId, 
          animeTitle: selectedAnime?.title || '', 
          seasonId: newSeasonData.id, 
          seasonTitle: newSeasonData.title 
        } 
      }));
    }
    setIsOpen(false);
    resetState();
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetState();
  };

  const resetState = () => {
    setStep('FORM');
    setEntry({ ...emptyEntry });
    setNewSeasonData(null);
  };

  return (
    <>
      {/* Command Button */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex flex-col items-center justify-center p-1.5 bg-[#1a5c36] hover:bg-[#236b40] text-white border border-[#134526] transition-colors cursor-pointer rounded-sm group min-h-[58px] w-full"
      >
        <MonitorPlay size={15} className="mb-0.5 group-hover:scale-110 transition-transform" />
        <span className="text-[8px] font-mono font-bold tracking-tight text-center leading-tight">ADD_SEASON</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#bdbfc3] border border-[#787b80] w-[500px] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col">

            {/* Header */}
            <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-3 py-2 text-[11px] border-b border-[#1a202c] flex justify-between items-center shrink-0">
              <span>{step === 'FORM' ? 'ADD NEW SEASON RECORD' : 'SEASON CREATED'}</span>
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

                    {/* Season Number */}
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5 mt-2">Season Number<span className="text-red-700">*</span></label>
                      <input
                        required
                        type="number"
                        min={1}
                        value={entry.number}
                        onChange={e => updateEntry({ number: e.target.value })}
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
                        placeholder="Season Title..."
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

              {/* STEP 2: CONFIRMATION FOR EPISODE */}
              {step === 'CONFIRM_NEXT' && (
                <div className="space-y-4 text-center py-6">
                  <FileText size={48} className="mx-auto mb-4 text-[#34394d]" />
                  <p className="text-[13px] font-bold text-[#222735] font-mono">Do you want to add an episode?</p>
                  
                  <div className="flex gap-3 justify-center pt-6">
                    <button type="button" onClick={() => finalizeFlow(false)}
                      className="px-6 py-2 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer">
                      NO
                    </button>
                    <button type="button" onClick={() => finalizeFlow(true)}
                      className="px-6 py-2 bg-[#1a5c36] hover:bg-[#236b40] text-white text-[11px] font-mono font-bold border border-[#134526] cursor-pointer">
                      YES
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddSeason;
