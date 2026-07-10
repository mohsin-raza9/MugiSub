'use client';

import React, { useState } from 'react';
import { PlusCircle, FileText, MonitorPlay, Film, Image as ImageIcon, X, FilePlay } from "lucide-react";
import ImageUpload from '../admin/uploads/ImageUpload';
import BannerUpload from '../admin/uploads/BannerUpload';
import TrailerUpload from '../admin/uploads/TrailerUpload';
import SubtitleUpload from '../admin/uploads/SubtitleUpload';
import { deleteFromCloudinary } from '@/utils/upload';

export interface AnimePayload {
  type: 'movie' | 'season' | 'drama';
  title: string;
  description: string;
  status: 'Airing' | 'Finished' | 'Upcoming';
  upcomingDate?: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  bannerUrl: string | null;
  bannerPublicId: string | null;
  trailerUrl: string | null;
  trailerPublicId: string | null;
  subtitleUrl?: string | null;
  subtitlePublicId?: string | null;
}

const AddAnime = () => {
  const [isAddAnime, setIsAddAnime] = useState<boolean>(false);
  const [step, setStep] = useState<'CHOOSE_TYPE' | 'FORM' | 'SUBTITLE' | 'CONFIRM_NEXT'>('CHOOSE_TYPE');
  const [confirmMessage, setConfirmMessage] = useState<string>('');

  const [payload, setPayload] = useState<AnimePayload>({
    type: 'movie',
    title: '',
    description: '',
    status: 'Upcoming',
    upcomingDate: '',
    imageUrl: null,
    imagePublicId: null,
    bannerUrl: null,
    bannerPublicId: null,
    trailerUrl: null,
    trailerPublicId: null,
    subtitleUrl: null,
    subtitlePublicId: null,
  });

  const updatePayload = (fields: Partial<AnimePayload>) => {
    setPayload(prev => ({ ...prev, ...fields }));
  };

  const handleChooseType = (type: 'movie' | 'season' | 'drama') => {
    updatePayload({ type });
    setStep('FORM');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (payload.type === 'movie') {
      setStep('SUBTITLE');
    } else if (payload.type === 'season') {
      setConfirmMessage('Do you want to create season yes or not?');
      setStep('CONFIRM_NEXT');
    } else if (payload.type === 'drama') {
      setConfirmMessage('Do you want to upload episodes Yes or not?');
      setStep('CONFIRM_NEXT');
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalizeFlow = async (navigateYes: boolean) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/anime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create Anime record');
      }

      const responseData = await response.json();
      const newAnimeId = responseData.anime.id;
      const newAnimeTitle = responseData.anime.title;

      console.log(`Anime created successfully. Navigate: ${navigateYes}`);
      
      // Reset and close
      setIsAddAnime(false);
      resetState();

      // Trigger other modals if requested
      if (navigateYes) {
        if (payload.type === 'season') {
           window.dispatchEvent(new CustomEvent('open-add-season', { detail: { animeId: newAnimeId, animeTitle: newAnimeTitle } }));
        } else if (payload.type === 'drama') {
           window.dispatchEvent(new CustomEvent('open-add-episode', { detail: { animeId: newAnimeId, animeTitle: newAnimeTitle } }));
        }
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Failed to save the anime. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    // Delete resources if uploaded
    if (payload.imagePublicId) await deleteFromCloudinary(payload.imagePublicId);
    if (payload.bannerPublicId) await deleteFromCloudinary(payload.bannerPublicId);
    if (payload.trailerPublicId) await deleteFromCloudinary(payload.trailerPublicId);
    if (payload.subtitlePublicId) await deleteFromCloudinary(payload.subtitlePublicId);

    setIsAddAnime(false);
    resetState();
  };

  const resetState = () => {
    setStep('CHOOSE_TYPE');
    setPayload({
      type: 'movie',
      title: '',
      description: '',
      status: 'Upcoming',
      upcomingDate: '',
      imageUrl: null,
      imagePublicId: null,
      bannerUrl: null,
      bannerPublicId: null,
      trailerUrl: null,
      trailerPublicId: null,
      subtitleUrl: null,
      subtitlePublicId: null,
    });
  };

  // Folder name derived from title
  const folderName = payload.title.trim() ? payload.title.trim().replace(/[^a-zA-Z0-9]/g, '_') : 'Untitled';

  return (
    <>
      <button
        onClick={() => setIsAddAnime(true)}
        type="button"
        className="flex flex-col items-center justify-center p-1.5 bg-[#a11f1f] hover:bg-[#c02222] text-white border border-[#7a1515] transition-colors cursor-pointer rounded-sm group min-h-[58px] w-full"
      >
        <PlusCircle size={15} className="mb-0.5 group-hover:scale-110 transition-transform" />
        <span className="text-[8px] font-mono font-bold tracking-tight text-center leading-tight">ADD ANIME</span>
      </button>

      {isAddAnime && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#bdbfc3] border border-[#787b80] w-[500px] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col">
            
            {/* Header */}
            <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-3 py-2 text-[11px] border-b border-[#1a202c] flex justify-between items-center shrink-0">
              <span>{step === 'CHOOSE_TYPE' ? 'CHOOSE YOUR OPTION' : `ADD NEW ${payload.type.toUpperCase()} RECORD`}</span>
              <button 
                type="button" 
                onClick={handleCancel} 
                className="hover:text-red-400 font-bold cursor-pointer"
              >
                <X />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-3 space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar text-left flex-1 min-h-0">
              
              {/* STEP 1: CHOOSE OPTION */}
              {step === 'CHOOSE_TYPE' && (
                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => handleChooseType('movie')} className="flex flex-col items-center justify-center h-24 bg-[#34394d] hover:bg-[#4a4f5d] text-white border border-[#1c2331] cursor-pointer transition-colors group">
                    <Film size={24} className="mb-2 group-hover:scale-110 transition-transform text-[#e2933c]" />
                    <span className="text-[11px] font-bold font-mono">MOVIE</span>
                  </button>
                  <button onClick={() => handleChooseType('season')} className="flex flex-col items-center justify-center h-24 bg-[#34394d] hover:bg-[#4a4f5d] text-white border border-[#1c2331] cursor-pointer transition-colors group">
                    <MonitorPlay size={24} className="mb-2 group-hover:scale-110 transition-transform text-[#48bb78]" />
                    <span className="text-[11px] font-bold font-mono">SEASON</span>
                  </button>
                  <button onClick={() => handleChooseType('drama')} className="flex flex-col items-center justify-center h-24 bg-[#34394d] hover:bg-[#4a4f5d] text-white border border-[#1c2331] cursor-pointer transition-colors group">
                    <FilePlay size={24} className="mb-2 group-hover:scale-110 transition-transform text-[#60a5fa]" />
                    <span className="text-[11px] font-bold font-mono">DRAMA</span>
                  </button>
                </div>
              )}

              {/* STEP 2: FORM */}
              {step === 'FORM' && (
                <form onSubmit={handleFormSubmit} className="space-y-2">
                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">DETAILS</span>
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Title<span className="text-red-700">*</span></label>
                      <input required type="text" value={payload.title} onChange={e => updatePayload({ title: e.target.value })}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                        placeholder="Title..." />
                    </div>
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5 mt-2">Description</label>
                      <textarea value={payload.description} onChange={e => updatePayload({ description: e.target.value })}
                        rows={3}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243] resize-none"
                        placeholder="Description..." />
                    </div>
                  </div>

                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">STATUS</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Airing Status<span className="text-red-700">*</span></label>
                        <select value={payload.status} onChange={e => updatePayload({ status: e.target.value as any })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243]">
                          <option value="Upcoming">Upcoming</option>
                          <option value="Finished">Finished</option>
                          <option value="Airing" disabled className="text-gray-400">Airing (Disabled)</option>
                        </select>
                      </div>
                      
                      {payload.status === 'Upcoming' && (
                        <div>
                          <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Upcoming Date</label>
                          <input type="date" value={payload.upcomingDate} onChange={e => updatePayload({ upcomingDate: e.target.value })}
                            className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">MEDIA RESOURCES (UPLOADS TO: {folderName})</span>
                    
                    {!payload.title.trim() && (
                      <div className="text-[10px] text-red-600 font-bold mb-2">Please enter a Title first to enable uploads.</div>
                    )}
                    
                    <div className={`grid grid-cols-2 gap-3 ${!payload.title.trim() ? 'opacity-50 pointer-events-none' : ''}`}>
                      <ImageUpload 
                        folderName={folderName}
                        currentUrl={payload.imageUrl} currentPublicId={payload.imagePublicId}
                        onUpload={(url, id) => updatePayload({ imageUrl: url, imagePublicId: id })} 
                        onRemove={() => updatePayload({ imageUrl: null, imagePublicId: null })}
                      />
                      <BannerUpload 
                        folderName={folderName}
                        currentUrl={payload.bannerUrl} currentPublicId={payload.bannerPublicId}
                        onUpload={(url, id) => updatePayload({ bannerUrl: url, bannerPublicId: id })} 
                        onRemove={() => updatePayload({ bannerUrl: null, bannerPublicId: null })}
                      />
                      <TrailerUpload 
                        folderName={folderName}
                        currentUrl={payload.trailerUrl} currentPublicId={payload.trailerPublicId}
                        onUpload={(url, id) => updatePayload({ trailerUrl: url, trailerPublicId: id })} 
                        onRemove={() => updatePayload({ trailerUrl: null, trailerPublicId: null })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-[#9fa2a8]">
                    <button type="button" onClick={handleCancel}
                      className="flex-1 py-1.5 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer">
                      CANCEL
                    </button>
                    <button type="submit"
                      className="flex-1 py-1.5 bg-[#a11f1f] hover:bg-[#c02222] text-white text-[11px] font-mono font-bold border border-[#7a1515] cursor-pointer">
                      NEXT
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: MOVIE SUBTITLE (ONLY FOR MOVIE) */}
              {step === 'SUBTITLE' && (
                <div className="space-y-4">
                   <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[9px] font-mono font-bold text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">// MOVIE SUBTITLE (OPTIONAL)</span>
                    <SubtitleUpload 
                        folderName={folderName}
                        currentUrl={payload.subtitleUrl} currentPublicId={payload.subtitlePublicId}
                        onUpload={(url, id) => updatePayload({ subtitleUrl: url, subtitlePublicId: id })} 
                        onRemove={() => updatePayload({ subtitleUrl: null, subtitlePublicId: null })}
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-2 border-t border-[#9fa2a8]">
                    <button type="button" onClick={() => setStep('FORM')} disabled={isSubmitting}
                      className="flex-1 py-1.5 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50">
                      BACK
                    </button>
                    <button type="button" onClick={() => finalizeFlow(true)} disabled={isSubmitting}
                      className="flex-1 py-1.5 bg-[#1a5c36] hover:bg-[#236b40] text-white text-[11px] font-mono font-bold border border-[#134526] cursor-pointer disabled:opacity-50">
                      {isSubmitting ? 'SAVING...' : 'COMMIT_RECORD'}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: CONFIRMATION FOR SEASON/DRAMA */}
              {step === 'CONFIRM_NEXT' && (
                <div className="space-y-4 text-center py-6">
                  <FileText size={48} className="mx-auto mb-4 text-[#34394d]" />
                  <p className="text-[13px] font-bold text-[#222735] font-mono">{confirmMessage}</p>
                  
                  <div className="flex gap-3 justify-center pt-6">
                    <button type="button" onClick={() => finalizeFlow(false)} disabled={isSubmitting}
                      className="px-6 py-2 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50">
                      NO
                    </button>
                    <button type="button" onClick={() => finalizeFlow(true)} disabled={isSubmitting}
                      className="px-6 py-2 bg-[#a11f1f] hover:bg-[#c02222] text-white text-[11px] font-mono font-bold border border-[#7a1515] cursor-pointer disabled:opacity-50">
                      {isSubmitting ? 'SAVING...' : 'YES'}
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

export default AddAnime;