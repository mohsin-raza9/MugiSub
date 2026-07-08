'use client';

import React, { useState, useRef } from 'react';
import { PlusCircle } from "lucide-react";

const AddAnime = () => {
  // ════════ STATE MANAGEMENT ════════
  const [isAddAnime, setIsAddAnime] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  // Form Inputs State
  const [animeTitle, setAnimeTitle] = useState<string>('');
  const [titleEnglish, setTitleEnglish] = useState<string>('');
  const [titleJapanese, setTitleJapanese] = useState<string>('');
  const [animeType, setAnimeType] = useState<string>('TV');
  const [animeStatus, setAnimeStatus] = useState<string>('Upcoming');
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [airDate, setAirDate] = useState<string>('');
  const [nextEpisodeAt, setNextEpisodeAt] = useState<string>('');

  // Image/File States
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [posterName, setPosterName] = useState<string>('');
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [bannerName, setBannerName] = useState<string>('');

  // Refs for file triggers
  const posterInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // ════════ HANDLERS ════════
  const handleFileChange = (file: File, type: 'poster' | 'banner') => {
    const objectUrl = URL.createObjectURL(file);
    if (type === 'poster') {
      setImageUrl(objectUrl);
      setPosterName(file.name);
    } else {
      setBannerUrl(objectUrl);
      setBannerName(file.name);
    }
  };

  const handleAddAnime = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);

    // Basic Client side validation check
    if (!animeTitle.trim()) {
      setFormErrors(['Romaji Title is strictly required.']);
      return;
    }
    if (!imageUrl) {
      setFormErrors(['Poster Image must be loaded.']);
      return;
    }

    try {
      console.log("Submitting to pipeline...", {
        titleRomaji: animeTitle,
        titleEnglish,
        titleJapanese,
        type: animeType,
        status: animeStatus,
        isFeatured,
        airDate,
        nextEpisodeAt,
        imageUrl,
        bannerUrl
      });
      
      // Submit successful hone par state reset aur modal close karein
      setIsAddAnime(false);
      resetForm();
    } catch (err) {
      setFormErrors(['PIPELINE_COMMIT_FAILED: Server database communication interrupted.']);
    }
  };

  const resetForm = () => {
    setAnimeTitle('');
    setTitleEnglish('');
    setTitleJapanese('');
    setAnimeType('TV');
    setAnimeStatus('Upcoming');
    setIsFeatured(false);
    setAirDate('');
    setNextEpisodeAt('');
    setImageUrl(null);
    setPosterName('');
    setBannerUrl(null);
    setBannerName('');
    setFormErrors([]);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsAddAnime(true)}
        type="button"
        className="flex flex-col items-center justify-center p-1.5 bg-[#a11f1f] hover:bg-[#c02222] text-white border border-[#7a1515] transition-colors cursor-pointer rounded-sm group min-h-[58px] w-full"
      >
        <PlusCircle size={15} className="mb-0.5 group-hover:scale-110 transition-transform" />
        <span className="text-[8px] font-mono font-bold tracking-tight text-center leading-tight">ADD_ANIME</span>
      </button>

      {/* Modal Popup */}
      {isAddAnime && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
          <div className="bg-[#bdbfc3] border border-[#787b80] w-[500px] shadow-[2px_2px_10px_rgba(0,0,0,0.5)]">

            {/* Header */}
            <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-3 py-2 text-[11px] border-b border-[#1a202c] flex justify-between items-center">
              <span>{" ADD_NEW_ANIME_RECORD"}</span>
              <button 
                type="button" 
                onClick={() => { setIsAddAnime(false); setFormErrors([]); }} 
                className="hover:text-red-400 font-bold cursor-pointer"
              >
                X
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddAnime} className="p-4 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar text-left">
              {/* Validation Warning Box */}
              {formErrors.length > 0 && (
                <div className="bg-[#a11f1f]/10 border border-[#a11f1f] p-2 text-left space-y-0.5">
                  <span className="text-[9px] font-mono font-bold text-[#a11f1f] block uppercase tracking-wide">
                    ⚠️ PIPELINE_VALIDATION_ERROR:
                  </span>
                  <ul className="list-disc list-inside text-[8.5px] font-mono text-[#a11f1f] font-bold">
                    {formErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Row 1: Titles */}
              <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                <span className="text-[9px] font-mono font-bold text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">// TITLES (LOCALIZATION)</span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Romaji *</label>
                    <input required type="text" value={animeTitle} onChange={e => setAnimeTitle(e.target.value)}
                      className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                      placeholder="e.g. Shingeki no Kyojin" />
                  </div>
                  <div>
                    <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">English</label>
                    <input type="text" value={titleEnglish} onChange={e => setTitleEnglish(e.target.value)}
                      className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                      placeholder="Attack on Titan" />
                  </div>
                  <div>
                    <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Japanese</label>
                    <input type="text" value={titleJapanese} onChange={e => setTitleJapanese(e.target.value)}
                      className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                      placeholder="進撃の巨人" />
                  </div>
                </div>
              </div>

              {/* Row 2: Metadata Dropdowns */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Format Type *</label>
                  <select value={animeType} onChange={e => setAnimeType(e.target.value)}
                    className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243]">
                    <option value="TV">TV Series</option>
                    <option value="Movie">Movie</option>
                    <option value="OVA">OVA</option>
                    <option value="ONA">ONA</option>
                    <option value="Web">Web</option>
                    <option value="Special">Special</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Airing Status *</label>
                  <select value={animeStatus} onChange={e => setAnimeStatus(e.target.value)}
                    className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243]">
                    <option value="Upcoming">Upcoming</option>
                    <option value="Airing">Airing</option>
                    <option value="Finished">Finished</option>
                    <option value="Hiatus">Hiatus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Slider Feature</label>
                  <select value={isFeatured ? "true" : "false"} onChange={e => setIsFeatured(e.target.value === "true")}
                    className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243]">
                    <option value="false">Standard Entry</option>
                    <option value="true">Featured (Slider)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Timings */}
              <div className="grid grid-cols-2 gap-3 bg-[#caccce] p-2 border border-[#9fa2a8]">
                <div>
                  <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Air Date String</label>
                  <input type="text" value={airDate} onChange={e => setAirDate(e.target.value)}
                    className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                    placeholder="e.g. 1st April 2026" />
                </div>
                <div>
                  <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Next Ep Countdown</label>
                  <input type="datetime-local" value={nextEpisodeAt} onChange={e => setNextEpisodeAt(e.target.value)}
                    className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]" />
                </div>
              </div>

              {/* Row 4: Media Assets (Drag & Drop) */}
              <div className="grid grid-cols-2 gap-2">
                {/* POSTER DROP ZONE */}
                <div>
                  <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Poster Image *</label>
                  <input
                    type="file"
                    ref={posterInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0], 'poster')}
                  />
                  <div
                    onClick={() => posterInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.dataTransfer.files?.[0] && handleFileChange(e.dataTransfer.files[0], 'poster');
                    }}
                    className={`border-2 border-dashed h-[60px] flex flex-col items-center justify-center cursor-pointer transition-all p-1 rounded-sm ${imageUrl ? 'border-[#1a5c36] bg-[#d1e7dd]' : 'border-[#8c8f94] bg-[#f0f5ff] hover:bg-[#e2e8f5]'}`}
                  >
                    {imageUrl ? (
                      <div className="text-center w-full px-1">
                        <span className="text-[12px] block">✅</span>
                        <p className="text-[8.5px] font-mono text-[#1a5c36] font-bold truncate">{posterName || "Poster Loaded"}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="text-[12px] block">📁</span>
                        <p className="text-[8.5px] font-mono text-[#555] font-bold">DRAG / CLICK POSTER</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* BANNER DROP ZONE */}
                <div>
                  <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Banner Image</label>
                  <input
                    type="file"
                    ref={bannerInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0], 'banner')}
                  />
                  <div
                    onClick={() => bannerInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.dataTransfer.files?.[0] && handleFileChange(e.dataTransfer.files[0], 'banner');
                    }}
                    className={`border-2 border-dashed h-[60px] flex flex-col items-center justify-center cursor-pointer transition-all p-1 rounded-sm ${bannerUrl ? 'border-[#1a5c36] bg-[#d1e7dd]' : 'border-[#8c8f94] bg-[#f0f5ff] hover:bg-[#e2e8f5]'}`}
                  >
                    {bannerUrl ? (
                      <div className="text-center w-full px-1">
                        <span className="text-[12px] block">✅</span>
                        <p className="text-[8.5px] font-mono text-[#1a5c36] font-bold truncate">{bannerName || "Banner Loaded"}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="text-[12px] block">🖼️</span>
                        <p className="text-[8.5px] font-mono text-[#555] font-bold">DRAG / CLICK BANNER</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* LIVE DATA OBJECT PREVIEW */}
              
              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-[#9fa2a8]">
                <button 
                  type="button" 
                  onClick={() => { setIsAddAnime(false); resetForm(); }}
                  className="flex-1 py-1.5 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-1.5 bg-[#a11f1f] hover:bg-[#c02222] text-white text-[11px] font-mono font-bold border border-[#7a1515] cursor-pointer"
                >
                  COMMIT_RECORD
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAnime;