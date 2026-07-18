'use client';

import React, { useState, useEffect } from 'react';
import { Film, X, FileText } from 'lucide-react';
import SubtitleUpload from '../admin/uploads/SubtitleUpload';
import { deleteFromCloudinary } from '@/utils/upload';

// ─── Types ───────────────────────────────────────────────────────────
interface MovieEntry {
  animeId: string;
  subtitleUrl: string | null;
  subtitlePublicId: string | null;
  language: string;
  languageName: string;
  format: string;
  isVerified: boolean;
}

const emptyEntry: MovieEntry = {
  animeId: '',
  subtitleUrl: null,
  subtitlePublicId: null,
  language: 'en',
  languageName: 'English',
  format: 'SRT',
  isVerified: false,
};

type Step = 'FORM';

// ─── Component ───────────────────────────────────────────────────────
const AddMovie = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('FORM');
  const [entry, setEntry] = useState<MovieEntry>({ ...emptyEntry });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animeList, setAnimeList] = useState<{ id: string, title: string }[]>([]);

  const updateEntry = (fields: Partial<MovieEntry>) => {
    setEntry(prev => ({ ...prev, ...fields }));
  };

  // Fetch Anime list when modal opens
  useEffect(() => {
    if (isOpen) {
      fetch('/api/admin/anime?select=true&type=Movie')
        .then(res => res.json())
        .then(data => setAnimeList(data))
        .catch(err => console.error("Failed to fetch anime", err));
    }
  }, [isOpen]);

  const handleCommit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.subtitleUrl) {
      alert('Please upload a subtitle file.');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/subtitle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          animeId: entry.animeId,
          fileUrl: entry.subtitleUrl,
          language: entry.language,
          languageName: entry.languageName,
          format: entry.format,
          isVerified: entry.isVerified,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to save subtitle');
      }

      console.log('Movie Subtitle Saved');
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
    if (entry.subtitlePublicId) {
      try {
        await deleteFromCloudinary(entry.subtitlePublicId);
      } catch (error) {
        console.error("Error cleaning up subtitle", error);
      }
    }
    setIsOpen(false);
    resetState();
  };

  const resetState = () => {
    setStep('FORM');
    setEntry({ ...emptyEntry });
  };

  const folderName = entry.animeId && animeList.find(a => a.id === entry.animeId)
    ? animeList.find(a => a.id === entry.animeId)!.title.replace(/[^a-zA-Z0-9]/g, '_')
    : 'Untitled_Movie';

  return (
    <>
      {/* Command Button */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex flex-col items-center justify-center p-1.5 bg-[#5c4a1a] hover:bg-[#6e5a20] text-white border border-[#42360f] transition-colors cursor-pointer rounded-sm group min-h-[58px] w-full"
      >
        <Film size={15} className="mb-0.5 group-hover:scale-110 transition-transform" />
        <span className="text-[8px] font-mono font-bold tracking-tight text-center leading-tight">ADD_MOVIE_SUB</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#bdbfc3] border border-[#787b80] w-[500px] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col">

            {/* Header */}
            <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-3 py-2 text-[11px] border-b border-[#1a202c] flex justify-between items-center shrink-0">
              <span>ADD MOVIE SUBTITLE</span>
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
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">SELECT MOVIE</span>

                    {/* Anime Name */}
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Movie Name<span className="text-red-700">*</span></label>
                      <select
                        required
                        value={entry.animeId}
                        onChange={e => updateEntry({ animeId: e.target.value })}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243]"
                      >
                        <option value="">-- Select Movie --</option>
                        {animeList.map(a => (
                          <option key={a.id} value={a.id}>{a.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subtitle Upload */}
                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">SUBTITLE</span>

                    {!entry.animeId && (
                      <div className="text-[10px] text-red-600 font-bold mb-2">Please select a Movie first to enable uploads.</div>
                    )}

                    <div className={`${!entry.animeId ? 'opacity-50 pointer-events-none' : ''}`}>
                      <SubtitleUpload
                        folderName={folderName}
                        currentUrl={entry.subtitleUrl}
                        currentPublicId={entry.subtitlePublicId}
                        onUpload={(url, id) => updateEntry({ subtitleUrl: url, subtitlePublicId: id })}
                        onRemove={() => updateEntry({ subtitleUrl: null, subtitlePublicId: null })}
                      />
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div>
                          <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Language Code</label>
                          <input type="text" value={entry.language} onChange={e => updateEntry({ language: e.target.value })}
                            className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                            placeholder="en" />
                        </div>
                        <div>
                          <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Language Name</label>
                          <input type="text" value={entry.languageName} onChange={e => updateEntry({ languageName: e.target.value })}
                            className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                            placeholder="English" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div>
                          <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Format</label>
                          <select value={entry.format} onChange={e => updateEntry({ format: e.target.value })}
                            className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]">
                            <option value="SRT">SRT</option>
                            <option value="ASS">ASS</option>
                            <option value="VTT">VTT</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center gap-2 text-[10px] text-[#222735] font-mono font-bold uppercase cursor-pointer">
                            <input type="checkbox" checked={entry.isVerified} onChange={e => updateEntry({ isVerified: e.target.checked })}
                              className="h-4 w-4 text-[#1a5c36] focus:ring-[#1a5c36] border-[#8c8f94] rounded" />
                            Is Verified
                          </label>
                        </div>
                      </div>
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

export default AddMovie;