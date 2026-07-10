'use client';

import React, { useState, useEffect } from 'react';
import { PlayCircle, FileText, Layers, X } from 'lucide-react';
import SubtitleUpload from '../admin/uploads/SubtitleUpload';
import { deleteFromCloudinary } from '@/utils/upload';

// ─── Types ───────────────────────────────────────────────────────────
type Mode = 'single' | 'bulk';
type Step = 'CHOOSE_MODE' | 'FORM';

interface EpisodeEntry {
  episodeNumber: string;
  title: string;
  description: string;
  airDate: string;
  animeId: string;
  seasonId: string;
  subtitleUrl: string | null;
  subtitlePublicId: string | null;
}

const emptyEntry: EpisodeEntry = {
  episodeNumber: '',
  title: '',
  description: '',
  airDate: '',
  animeId: '',
  seasonId: '',
  subtitleUrl: null,
  subtitlePublicId: null,
};

// ─── Component ───────────────────────────────────────────────────────
const AddEpisode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('CHOOSE_MODE');
  const [mode, setMode] = useState<Mode>('single');

  // Current form entry
  const [entry, setEntry] = useState<EpisodeEntry>({ ...emptyEntry });

  // Bulk: accumulated entries
  const [bulkEntries, setBulkEntries] = useState<EpisodeEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Data
  const [animeList, setAnimeList] = useState<{id: string, title: string}[]>([]);
  const [seasonList, setSeasonList] = useState<{id: string, title: string, number: number}[]>([]);

  const updateEntry = (fields: Partial<EpisodeEntry>) => {
    setEntry(prev => ({ ...prev, ...fields }));
  };

  // Listen for custom events to open
  useEffect(() => {
    const handleOpenAddEpisode = (e: any) => {
      setIsOpen(true);
      setStep('CHOOSE_MODE'); // Still let them choose single/bulk
      
      const newFields: Partial<EpisodeEntry> = {};
      if (e.detail?.animeId) newFields.animeId = e.detail.animeId;
      if (e.detail?.seasonId) newFields.seasonId = e.detail.seasonId;
      
      updateEntry(newFields);
    };

    window.addEventListener('open-add-episode', handleOpenAddEpisode);
    return () => window.removeEventListener('open-add-episode', handleOpenAddEpisode);
  }, []);

  // Fetch Anime list when modal opens
  useEffect(() => {
    if (isOpen) {
      fetch('/api/admin/anime?select=true')
        .then(res => res.json())
        .then(data => setAnimeList(data))
        .catch(err => console.error("Failed to fetch anime", err));
    }
  }, [isOpen]);

  // Fetch Seasons when animeId changes
  useEffect(() => {
    if (entry.animeId) {
      fetch(`/api/admin/season?select=true&animeId=${entry.animeId}`)
        .then(res => res.json())
        .then(data => setSeasonList(data))
        .catch(err => console.error("Failed to fetch seasons", err));
    } else {
      setSeasonList([]);
    }
  }, [entry.animeId]);

  const handleChooseMode = (m: Mode) => {
    setMode(m);
    setStep('FORM');
  };

  // ─── Single Mode Submit ──────────────────────────────────────────
  const handleSingleCommit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/episode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create Episode');
      }

      console.log('Single Episode Created');
      setIsOpen(false);
      resetState();
    } catch (error: any) {
      console.error('API Error:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Bulk Mode: Add Another ──────────────────────────────────────
  const handleAddAnother = (e: React.FormEvent) => {
    e.preventDefault();
    setBulkEntries(prev => [...prev, { ...entry }]);
    // Reset fields except for relations to make data entry faster
    setEntry({
      ...emptyEntry,
      animeId: entry.animeId,
      seasonId: entry.seasonId,
      // Automatically increment episode number if possible
      episodeNumber: entry.episodeNumber && !isNaN(Number(entry.episodeNumber)) 
        ? (Number(entry.episodeNumber) + 1).toString() 
        : '',
    });
  };

  // ─── Bulk Mode: Final Commit ─────────────────────────────────────
  const handleBulkCommit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add current entry to the array + commit all
    const finalPayload = [...bulkEntries, { ...entry }];
    
    try {
      const response = await fetch('/api/admin/episode/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to create Bulk Episodes');
      }

      console.log('Bulk Episodes Created');
      setIsOpen(false);
      resetState();
    } catch (error: any) {
      console.error('API Error:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    setIsSubmitting(true);
    try {
      // Delete uncommitted subtitle files from Cloudinary
      if (entry.subtitlePublicId) {
        await deleteFromCloudinary(entry.subtitlePublicId);
      }
      for (const bulkEntry of bulkEntries) {
        if (bulkEntry.subtitlePublicId) {
          await deleteFromCloudinary(bulkEntry.subtitlePublicId);
        }
      }
    } catch (error) {
      console.error("Error deleting subtitles on cancel", error);
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
      resetState();
    }
  };

  const resetState = () => {
    setStep('CHOOSE_MODE');
    setMode('single');
    setEntry({ ...emptyEntry });
    setBulkEntries([]);
  };

  // Helper: get display name for anime id
  const getAnimeName = (id: string) => animeList.find(a => a.id === id)?.title || '';
  const folderName = entry.animeId && getAnimeName(entry.animeId) 
    ? getAnimeName(entry.animeId).replace(/[^a-zA-Z0-9]/g, '_') 
    : 'Untitled_Episode';

  return (
    <>
      {/* Command Button */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex flex-col items-center justify-center p-1.5 bg-[#1f3e70] hover:bg-[#254d8c] text-white border border-[#15305a] transition-colors cursor-pointer rounded-sm group min-h-[58px] w-full"
      >
        <PlayCircle size={15} className="mb-0.5 group-hover:scale-110 transition-transform" />
        <span className="text-[8px] font-mono font-bold tracking-tight text-center leading-tight">ADD_EPISODE</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#bdbfc3] border border-[#787b80] w-[500px] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col">

            {/* Header */}
            <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-3 py-2 text-[11px] border-b border-[#1a202c] flex justify-between items-center shrink-0">
              <span>
                {step === 'CHOOSE_MODE'
                  ? 'CHOOSE YOUR OPTION'
                  : `ADD EPISODE — ${mode.toUpperCase()} MODE`}
              </span>
              <button type="button" onClick={handleCancel} disabled={isSubmitting} className="hover:text-red-400 font-bold cursor-pointer disabled:opacity-50">
                <X />
              </button>
            </div>

            {/* Content */}
            <div className="p-3 space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar text-left flex-1 min-h-0">

              {/* ═══ STEP 1: MODE CHOICE ═══ */}
              {step === 'CHOOSE_MODE' && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleChooseMode('single')}
                    className="flex flex-col items-center justify-center h-24 bg-[#34394d] hover:bg-[#4a4f5d] text-white border border-[#1c2331] cursor-pointer transition-colors group"
                  >
                    <FileText size={24} className="mb-2 group-hover:scale-110 transition-transform text-[#60a5fa]" />
                    <span className="text-[11px] font-bold font-mono">SINGLE</span>
                  </button>
                  <button
                    onClick={() => handleChooseMode('bulk')}
                    className="flex flex-col items-center justify-center h-24 bg-[#34394d] hover:bg-[#4a4f5d] text-white border border-[#1c2331] cursor-pointer transition-colors group"
                  >
                    <Layers size={24} className="mb-2 group-hover:scale-110 transition-transform text-[#48bb78]" />
                    <span className="text-[11px] font-bold font-mono">BULK</span>
                  </button>
                </div>
              )}

              {/* ═══ STEP 2: FORM ═══ */}
              {step === 'FORM' && (
                <form
                  onSubmit={
                    mode === 'single'
                      ? handleSingleCommit
                      : bulkEntries.length === 0
                        ? handleAddAnother
                        : handleBulkCommit
                  }
                  className="space-y-2"
                >
                  {/* Bulk badge: how many saved so far */}
                  {mode === 'bulk' && bulkEntries.length > 0 && (
                    <div className="flex items-center gap-2 bg-[#1f3e70]/10 border border-[#1f3e70]/30 px-2 py-1">
                      <Layers size={12} className="text-[#1f3e70]" />
                      <span className="text-[10px] font-mono font-bold text-[#1f3e70]">
                        {bulkEntries.length} episode{bulkEntries.length > 1 ? 's' : ''} queued
                      </span>
                    </div>
                  )}

                  {/* DETAILS Section */}
                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">DETAILS</span>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Episode Number */}
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Episode Number<span className="text-red-700">*</span></label>
                        <input
                          required
                          type="number"
                          min={1}
                          step="0.1"
                          value={entry.episodeNumber}
                          onChange={e => updateEntry({ episodeNumber: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243] font-mono"
                          placeholder="e.g. 1"
                        />
                      </div>

                      {/* Title */}
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Title</label>
                        <input
                          type="text"
                          value={entry.title}
                          onChange={e => updateEntry({ title: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                          placeholder="Episode Title..."
                        />
                      </div>
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

                  {/* RELATIONS Section */}
                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">RELATIONS</span>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Anime Name */}
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Anime Name<span className="text-red-700">*</span></label>
                        <select
                          required
                          value={entry.animeId}
                          onChange={e => updateEntry({ animeId: e.target.value, seasonId: '' })} // Reset season on anime change
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243]"
                        >
                          <option value="">-- Select Anime --</option>
                          {animeList.map(a => (
                            <option key={a.id} value={a.id}>{a.title}</option>
                          ))}
                        </select>
                      </div>

                      {/* Season */}
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Season</label>
                        <select
                          value={entry.seasonId}
                          onChange={e => updateEntry({ seasonId: e.target.value })}
                          disabled={!entry.animeId}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">-- Select Season --</option>
                          {seasonList.map(s => (
                            <option key={s.id} value={s.id}>{s.title || `Season ${s.number}`}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* SUBTITLES Section */}
                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">// MOVIE SUBTITLE (OPTIONAL)</span>
                    
                    {!entry.animeId ? (
                      <div className="text-[10px] text-red-600 font-bold mb-2">Please select an Anime first to enable uploads.</div>
                    ) : null}

                    <div className={`${!entry.animeId ? 'opacity-50 pointer-events-none' : ''}`}>
                      <SubtitleUpload
                        folderName={folderName}
                        currentUrl={entry.subtitleUrl}
                        currentPublicId={entry.subtitlePublicId}
                        onUpload={(url, id) => updateEntry({ subtitleUrl: url, subtitlePublicId: id })}
                        onRemove={() => updateEntry({ subtitleUrl: null, subtitlePublicId: null })}
                      />
                    </div>
                  </div>

                  {/* ═══ ACTION BUTTONS ═══ */}
                  <div className="flex gap-2 pt-2 border-t border-[#9fa2a8]">
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="flex-1 py-1.5 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? 'CANCELLING...' : 'CANCEL'}
                    </button>

                    {/* ── SINGLE MODE: just COMMIT_RECORD ── */}
                    {mode === 'single' && (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-1.5 bg-[#1a5c36] hover:bg-[#236b40] text-white text-[11px] font-mono font-bold border border-[#134526] cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? 'SAVING...' : 'COMMIT_RECORD'}
                      </button>
                    )}

                    {/* ── BULK MODE: first fill → ADD ANOTHER only ── */}
                    {mode === 'bulk' && bulkEntries.length === 0 && (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-1.5 bg-[#1f3e70] hover:bg-[#254d8c] text-white text-[11px] font-mono font-bold border border-[#15305a] cursor-pointer disabled:opacity-50"
                      >
                        ADD ANOTHER
                      </button>
                    )}

                    {/* ── BULK MODE: subsequent fills → ADD ANOTHER + COMMIT_RECORD ── */}
                    {mode === 'bulk' && bulkEntries.length > 0 && (
                      <>
                        <button
                          type="button"
                          onClick={handleAddAnother}
                          disabled={isSubmitting}
                          className="flex-1 py-1.5 bg-[#1f3e70] hover:bg-[#254d8c] text-white text-[11px] font-mono font-bold border border-[#15305a] cursor-pointer disabled:opacity-50"
                        >
                          ADD ANOTHER
                        </button>
                        <button
                          type="button" // Important: change to type="button" to prevent default form submission triggering handleAddAnother on "enter"
                          onClick={handleBulkCommit}
                          disabled={isSubmitting}
                          className="flex-1 py-1.5 bg-[#1a5c36] hover:bg-[#236b40] text-white text-[11px] font-mono font-bold border border-[#134526] cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? 'SAVING...' : 'COMMIT_RECORD'}
                        </button>
                      </>
                    )}
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

export default AddEpisode;