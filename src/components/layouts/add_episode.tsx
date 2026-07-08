'use client';

import React, { useState, useRef } from 'react';
import { X, PlayCircle, Loader2, FolderOpen, Image as ImageIcon } from 'lucide-react';

interface AddEpisodeProps {
  isOpen: boolean;
  onClose: () => void;
  animeList: Array<{ id: string; title: string }>;
  addLog: (log: string) => void;
}

export default function AddEpisode({ isOpen, onClose, animeList = [], addLog }: AddEpisodeProps) {
  const [animeId, setAnimeId] = useState('');
  const [number, setNumber] = useState('');
  const [title, setTitle] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [description, setDescription] = useState('');
  
  // Image Files & Preview State
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // Hidden File Inputs Refs
  const posterInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Image Uploads & Previews
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'poster' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (type === 'poster') {
      setPosterFile(file);
      setPosterPreview(previewUrl);
    } else {
      setBannerFile(file);
      setBannerPreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animeId || !number || !pdfUrl || !posterFile) return;

    setLoading(true);
    try {
      // NOTE: Chunki images upload ho rahi hain, aapko JSON ki jagah FormData use karna padega back-end ke liye
      const formData = new FormData();
      formData.append('animeId', animeId);
      formData.append('number', number);
      formData.append('title', title || '');
      formData.append('pdfUrl', pdfUrl);
      formData.append('description', description || '');
      formData.append('poster', posterFile);
      if (bannerFile) formData.append('banner', bannerFile);

      const res = await fetch('/api/admin/episodes', {
        method: 'POST',
        body: formData, // Sending multipart form-data
      });

      if (res.ok) {
        addLog(`ADMIN    : Added Episode ${number} with PDF, Poster & Banner.`);
        // Reset Form Fields
        setAnimeId('');
        setNumber('');
        setTitle('');
        setPdfUrl('');
        setDescription('');
        setPosterFile(null);
        setBannerFile(null);
        setPosterPreview(null);
        setBannerPreview(null);
        onClose();
      } else {
        addLog(`SYSTEM   : Failed to add episode.`);
      }
    } catch (err) {
      addLog(`SYSTEM   : Error creating episode.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#bdbfc3] border-2 border-[#34394d] w-full max-w-md shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        
        {/* Banner Title */}
        <div className="bg-[#34394d] text-[#ddd] p-3 py-1.5 font-bold text-[13px] uppercase tracking-wide flex items-center justify-between border-b border-[#1c2331]">
          <div className="flex items-center gap-1.5">
            <PlayCircle size={14} className="text-[#8b6914]" />
            <span>Add New Episode</span>
          </div>
          <button onClick={onClose} className="hover:text-white cursor-pointer transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Hidden File Inputs */}
        <input 
          type="file" 
          ref={posterInputRef} 
          accept="image/*" 
          className="hidden" 
          onChange={(e) => handleFileChange(e, 'poster')} 
        />
        <input 
          type="file" 
          ref={bannerInputRef} 
          accept="image/*" 
          className="hidden" 
          onChange={(e) => handleFileChange(e, 'banner')} 
        />

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-3 space-y-3 text-[#1a2536] text-[12px] font-sans">
          
          {/* Anime Selection */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-[10px] uppercase text-[#34394d] tracking-wide">Select Anime *</label>
            <select
              required
              value={animeId}
              onChange={(e) => setAnimeId(e.target.value)}
              className="bg-[#cfd1d4] border border-[#999] px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#34394d] font-medium w-full"
            >
              <option value="">-- Choose Anime --</option>
              {animeList.map((anime) => (
                <option key={anime.id} value={anime.id}>
                  {anime.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Episode Number */}
            <div className="col-span-1 flex flex-col gap-1">
              <label className="font-bold text-[10px] uppercase text-[#34394d] tracking-wide">Ep Number *</label>
              <input
                required
                type="number"
                step="0.1"
                placeholder="e.g. 1"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="bg-[#cfd1d4] border border-[#999] px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#34394d] font-mono w-full"
              />
            </div>

            {/* Episode Title */}
            <div className="col-span-2 flex flex-col gap-1">
              <label className="font-bold text-[10px] uppercase text-[#34394d] tracking-wide">Ep Title (Optional)</label>
              <input
                type="text"
                placeholder="Episode Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#cfd1d4] border border-[#999] px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#34394d] w-full"
              />
            </div>
          </div>

          {/* PDF URL */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-[10px] uppercase text-[#34394d] tracking-wide">PDF Document URL *</label>
            <input
              required
              type="url"
              placeholder="https://drive.google.com/.../file.pdf"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="bg-[#cfd1d4] border border-[#999] px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#34394d] font-mono w-full"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-[10px] uppercase text-[#34394d] tracking-wide">Description (Optional)</label>
            <textarea
              placeholder="Enter episode notes or details here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="bg-[#cfd1d4] border border-[#999] px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#34394d] resize-none w-full font-sans"
            />
          </div>

          {/* ════ IMAGE UPLOAD GRID BOXES (MATCHES SCHEME IMAGE) ════ */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            
            {/* POSTER IMAGE BOX */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[10px] uppercase text-[#34394d] tracking-wide">Poster Image *</label>
              <div 
                onClick={() => posterInputRef.current?.click()}
                className="border-2 border-dashed border-[#999] bg-[#eef2f7] hover:bg-[#e2e8f0] transition-colors h-20 flex flex-col items-center justify-center gap-1 cursor-pointer select-none relative overflow-hidden"
              >
                {posterPreview ? (
                  <img src={posterPreview} alt="Poster" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <FolderOpen size={16} className="text-[#e2933c]" />
                    <span className="text-[9px] font-bold font-mono tracking-tighter text-[#4a5568]">DRAG / CLICK POSTER</span>
                  </>
                )}
              </div>
            </div>

            {/* BANNER IMAGE BOX */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[10px] uppercase text-[#34394d] tracking-wide">Banner Image</label>
              <div 
                onClick={() => bannerInputRef.current?.click()}
                className="border-2 border-dashed border-[#999] bg-[#eef2f7] hover:bg-[#e2e8f0] transition-colors h-20 flex flex-col items-center justify-center gap-1 cursor-pointer select-none relative overflow-hidden"
              >
                {bannerPreview ? (
                  <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon size={16} className="text-[#48bb78]" />
                    <span className="text-[9px] font-bold font-mono tracking-tighter text-[#4a5568]">DRAG / CLICK BANNER</span>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-1.5 pt-2 border-t border-[#999]/40">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-[#4a4f5d] hover:bg-[#5c6273] text-white font-bold text-[10px] uppercase border border-[#34394d] cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-1 bg-[#1a5c36] hover:bg-[#236b40] text-white font-bold text-[10px] uppercase border border-[#134526] cursor-pointer transition-colors flex items-center gap-1"
            >
              {loading ? (
                <>
                  <Loader2 size={11} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Add Episode</span>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}