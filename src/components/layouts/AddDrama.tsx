'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, FileText } from "lucide-react";
import ImageUpload from '../admin/uploads/ImageUpload';
import BannerUpload from '../admin/uploads/BannerUpload';
import TrailerUpload from '../admin/uploads/TrailerUpload';
import { deleteFromCloudinary } from '@/utils/upload';

export interface DramaPayload {
  type: 'drama';
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
}

const AddDrama = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState<'FORM' | 'CONFIRM_NEXT'>('FORM');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [payload, setPayload] = useState<DramaPayload>({
    type: 'drama',
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
  });

  const updatePayload = (fields: Partial<DramaPayload>) => {
    setPayload(prev => ({ ...prev, ...fields }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('CONFIRM_NEXT');
  };

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
        throw new Error('Failed to create Drama record');
      }

      console.log(`Drama created successfully. Navigate: ${navigateYes}`);
      
      setIsOpen(false);
      resetState();
    } catch (error) {
      console.error('API Error:', error);
      alert('Failed to save the drama. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (payload.imagePublicId) await deleteFromCloudinary(payload.imagePublicId);
    if (payload.bannerPublicId) await deleteFromCloudinary(payload.bannerPublicId);
    if (payload.trailerPublicId) await deleteFromCloudinary(payload.trailerPublicId);

    setIsOpen(false);
    resetState();
  };

  const resetState = () => {
    setStep('FORM');
    setPayload({
      type: 'drama',
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
    });
  };

  const folderName = payload.title.trim() ? payload.title.trim().replace(/[^a-zA-Z0-9]/g, '_') : 'Untitled';

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex flex-col items-center justify-center p-1.5 bg-[#18538c] hover:bg-[#1f6bab] text-white border border-[#123e69] transition-colors cursor-pointer rounded-sm group min-h-[58px] w-full"
      >
        <ImageIcon size={15} className="mb-0.5 group-hover:scale-110 transition-transform" />
        <span className="text-[8px] font-mono font-bold tracking-tight text-center leading-tight">ADD_DRAMA</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#bdbfc3] border border-[#787b80] w-[500px] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col">
            
            <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-3 py-2 text-[11px] border-b border-[#1a202c] flex justify-between items-center shrink-0">
              <span>ADD NEW DRAMA</span>
              <button type="button" onClick={handleCancel} className="hover:text-red-400 font-bold cursor-pointer">X</button>
            </div>

            <div className="p-4 space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar text-left flex-1 min-h-0">
              
              {step === 'FORM' && (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[9px] font-mono font-bold text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">// DETAILS</span>
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Title *</label>
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
                    <span className="text-[9px] font-mono font-bold text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">// STATUS</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Airing Status *</label>
                        <select value={payload.status} onChange={e => updatePayload({ status: e.target.value as any })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243]">
                          <option value="Upcoming">Upcoming</option>
                          <option value="Finished">Finished</option>
                          <option value="Airing">Airing</option>
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
                    <span className="text-[9px] font-mono font-bold text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">// MEDIA RESOURCES (UPLOADS TO: {folderName})</span>
                    
                    {!payload.title.trim() && (
                      <div className="text-[10px] text-red-600 font-bold mb-2">Please enter a Title first to enable uploads.</div>
                    )}
                    
                    <div className={`grid grid-cols-2 gap-3 ${!payload.title.trim() ? 'opacity-50 pointer-events-none' : ''}`}>
                      <ImageUpload folderName={folderName} currentUrl={payload.imageUrl} currentPublicId={payload.imagePublicId} onUpload={(url, id) => updatePayload({ imageUrl: url, imagePublicId: id })} onRemove={() => updatePayload({ imageUrl: null, imagePublicId: null })} />
                      <BannerUpload folderName={folderName} currentUrl={payload.bannerUrl} currentPublicId={payload.bannerPublicId} onUpload={(url, id) => updatePayload({ bannerUrl: url, bannerPublicId: id })} onRemove={() => updatePayload({ bannerUrl: null, bannerPublicId: null })} />
                      <TrailerUpload folderName={folderName} currentUrl={payload.trailerUrl} currentPublicId={payload.trailerPublicId} onUpload={(url, id) => updatePayload({ trailerUrl: url, trailerPublicId: id })} onRemove={() => updatePayload({ trailerUrl: null, trailerPublicId: null })} />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-[#9fa2a8]">
                    <button type="button" onClick={handleCancel} className="flex-1 py-1.5 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer">CANCEL</button>
                    <button type="submit" className="flex-1 py-1.5 bg-[#a11f1f] hover:bg-[#c02222] text-white text-[11px] font-mono font-bold border border-[#7a1515] cursor-pointer">NEXT</button>
                  </div>
                </form>
              )}

              {step === 'CONFIRM_NEXT' && (
                <div className="space-y-4 text-center py-6">
                  <FileText size={48} className="mx-auto mb-4 text-[#34394d]" />
                  <p className="text-[13px] font-bold text-[#222735] font-mono">Do you want to upload episodes for this drama?</p>
                  
                  <div className="flex gap-3 justify-center pt-6">
                    <button type="button" onClick={() => finalizeFlow(false)} disabled={isSubmitting} className="px-6 py-2 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50">NO</button>
                    <button type="button" onClick={() => finalizeFlow(true)} disabled={isSubmitting} className="px-6 py-2 bg-[#a11f1f] hover:bg-[#c02222] text-white text-[11px] font-mono font-bold border border-[#7a1515] cursor-pointer disabled:opacity-50">{isSubmitting ? 'SAVING...' : 'YES'}</button>
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

export default AddDrama;
