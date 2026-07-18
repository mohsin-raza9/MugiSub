'use client';

import React, { useState } from 'react';
import { PlusCircle, Film, MonitorPlay, FilePlay, X, ChevronRight, CheckCircle2 } from "lucide-react";
import ImageUpload from '../admin/uploads/ImageUpload';
import SubtitleUpload from '../admin/uploads/SubtitleUpload';
import { deleteFromCloudinary } from '@/utils/upload';

export interface WizardPayload {
  type: 'movie' | 'season' | 'drama';
  // Anime Info
  title: string;
  description: string;
  status: 'Airing' | 'Finished' | 'Upcoming';
  releaseDate: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  bannerUrl: string | null;
  bannerPublicId: string | null;
  trailerUrl: string | null;
  trailerPublicId: string | null;
  // Movie Subtitle
  movieSubtitleUrl: string | null;
  movieSubtitlePublicId: string | null;
  movieSubtitleLanguage: string;
  movieSubtitleLanguageName: string;
  movieSubtitleFormat: string;
  movieSubtitleIsVerified: boolean;
  // Season Info
  seasonNumber: string;
  seasonTitle: string;
  seasonDescription: string;
  // Episode Info
  episodeNumber: string;
  episodeTitle: string;
  episodeDescription: string;
  episodeAirDate: string;
  episodeSubtitleUrl: string | null;
  episodeSubtitlePublicId: string | null;
  episodeSubtitleLanguage: string;
  episodeSubtitleLanguageName: string;
  episodeSubtitleFormat: string;
  episodeSubtitleIsVerified: boolean;
}

type WizardStep = 'CHOOSE_TYPE' | 'ANIME_INFO' | 'SEASON_INFO' | 'EPISODE_INFO' | 'MOVIE_SUBTITLE';

const AddAnime = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState<WizardStep>('CHOOSE_TYPE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [payload, setPayload] = useState<WizardPayload>({
    type: 'movie',
    title: '', description: '', status: 'Upcoming', releaseDate: '',
    imageUrl: null, imagePublicId: null, bannerUrl: null, bannerPublicId: null,
    trailerUrl: null, trailerPublicId: null,
    movieSubtitleUrl: null, movieSubtitlePublicId: null,
    movieSubtitleLanguage: 'en',
    movieSubtitleLanguageName: 'English',
    movieSubtitleFormat: 'SRT',
    movieSubtitleIsVerified: false,
    seasonNumber: '1', seasonTitle: '', seasonDescription: '',
    episodeNumber: '1', episodeTitle: '', episodeDescription: '', episodeAirDate: '',
    episodeSubtitleUrl: null, episodeSubtitlePublicId: null,
    episodeSubtitleLanguage: 'en',
    episodeSubtitleLanguageName: 'English',
    episodeSubtitleFormat: 'SRT',
    episodeSubtitleIsVerified: false,
  });

  const updatePayload = (fields: Partial<WizardPayload>) => {
    setPayload(prev => ({ ...prev, ...fields }));
    setErrorMsg('');
  };

  const handleChooseType = (type: 'movie' | 'season' | 'drama') => {
    updatePayload({ type });
    setStep('ANIME_INFO');
  };

  const nextFromAnimeInfo = () => {
    if (!payload.title.trim() || !payload.imageUrl) {
      setErrorMsg('Title and Poster Image are required.');
      return;
    }
    if (payload.type === 'movie') setStep('MOVIE_SUBTITLE');
    else if (payload.type === 'season') setStep('SEASON_INFO');
    else if (payload.type === 'drama') setStep('EPISODE_INFO');
  };

  const nextFromSeasonInfo = () => {
    if (!payload.seasonNumber) {
      setErrorMsg('Season Number is required.');
      return;
    }
    setStep('EPISODE_INFO');
  };

  const handleFinalSubmit = async () => {
    if (payload.type !== 'movie' && !payload.episodeNumber) {
      setErrorMsg('Episode Number is required.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Create Anime
      const animeRes = await fetch('/api/admin/anime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: payload.type,
          title: payload.title,
          description: payload.description,
          status: payload.status,
          releaseDate: payload.releaseDate,
          imageUrl: payload.imageUrl,
          bannerUrl: payload.bannerUrl,
          trailerUrl: payload.trailerUrl,
          subtitleUrl: payload.type === 'movie' ? payload.movieSubtitleUrl : undefined,
          subtitleLanguage: payload.movieSubtitleLanguage,
          subtitleLanguageName: payload.movieSubtitleLanguageName,
          subtitleFormat: payload.movieSubtitleFormat,
          subtitleIsVerified: payload.movieSubtitleIsVerified,
        }),
      });

      if (!animeRes.ok) {
        const err = await animeRes.json();
        throw new Error(err.error || 'Failed to create anime');
      }

      const { anime } = await animeRes.json();
      let seasonId = null;

      // 2. Create Season if applicable
      if (payload.type === 'season') {
        const seasonRes = await fetch('/api/admin/season', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            animeId: anime.id,
            number: payload.seasonNumber,
            title: payload.seasonTitle,
            description: payload.seasonDescription,
          }),
        });
        if (!seasonRes.ok) {
          const err = await seasonRes.json();
          throw new Error(err.error || 'Failed to create season');
        }
        const { season } = await seasonRes.json();
        seasonId = season.id;
      }

      // 3. Create Episode if applicable
      if (payload.type === 'season' || payload.type === 'drama') {
        const episodeRes = await fetch('/api/admin/episode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            animeId: anime.id,
            seasonId: seasonId,
            episodeNumber: payload.episodeNumber,
            title: payload.episodeTitle,
            description: payload.episodeDescription,
            airDate: payload.episodeAirDate,
            subtitleUrl: payload.episodeSubtitleUrl,
            subtitleLanguage: payload.episodeSubtitleLanguage,
            subtitleLanguageName: payload.episodeSubtitleLanguageName,
            subtitleFormat: payload.episodeSubtitleFormat,
            subtitleIsVerified: payload.episodeSubtitleIsVerified,
          }),
        });
        if (!episodeRes.ok) {
          const err = await episodeRes.json();
          throw new Error(err.error || 'Failed to create episode');
        }
      }

      console.log('Wizard Flow Completed Successfully!');
      setIsOpen(false);
      resetState();

      // Optionally trigger a refresh or re-fetch of the list in the parent
      window.location.reload();

    } catch (error: any) {
      console.error('API Error:', error);
      setErrorMsg(error.message || 'An error occurred during creation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    setIsSubmitting(true);
    // Delete resources if uploaded
    if (payload.imagePublicId) await deleteFromCloudinary(payload.imagePublicId);
    if (payload.bannerPublicId) await deleteFromCloudinary(payload.bannerPublicId);
    if (payload.trailerPublicId) await deleteFromCloudinary(payload.trailerPublicId);
    if (payload.movieSubtitlePublicId) await deleteFromCloudinary(payload.movieSubtitlePublicId);
    if (payload.episodeSubtitlePublicId) await deleteFromCloudinary(payload.episodeSubtitlePublicId);

    setIsSubmitting(false);
    setIsOpen(false);
    resetState();
  };

  const resetState = () => {
    setStep('CHOOSE_TYPE');
    setErrorMsg('');
    setPayload({
      type: 'movie',
      title: '', description: '', status: 'Upcoming', releaseDate: '',
      imageUrl: null, imagePublicId: null, bannerUrl: null, bannerPublicId: null,
      trailerUrl: null, trailerPublicId: null,
      movieSubtitleUrl: null, movieSubtitlePublicId: null,
      movieSubtitleLanguage: 'en',
      movieSubtitleLanguageName: 'English',
      movieSubtitleFormat: 'SRT',
      movieSubtitleIsVerified: false,
      seasonNumber: '1', seasonTitle: '', seasonDescription: '',
      episodeNumber: '1', episodeTitle: '', episodeDescription: '', episodeAirDate: '',
      episodeSubtitleUrl: null, episodeSubtitlePublicId: null,
      episodeSubtitleLanguage: 'en',
      episodeSubtitleLanguageName: 'English',
      episodeSubtitleFormat: 'SRT',
      episodeSubtitleIsVerified: false,
    });
  };

  const folderName = payload.title.trim() ? payload.title.trim().replace(/[^a-zA-Z0-9]/g, '_') : 'Untitled';

  const getStepProgress = () => {
    if (step === 'CHOOSE_TYPE') return 0;
    if (step === 'ANIME_INFO') return 25;
    if (step === 'SEASON_INFO') return 50;
    if (step === 'EPISODE_INFO' || step === 'MOVIE_SUBTITLE') return 75;
    return 100;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex flex-col items-center justify-center gap-1 p-1.5 bg-orange-800 hover:bg-orange-700 text-white border border-[#122442] transition-colors cursor-pointer rounded-sm group min-h-[58px] w-full"
      >
        <PlusCircle size={15} className="mb-0.5 group-hover:scale-110 transition-transform" />
        <span className="text-[8px] font-mono font-bold tracking-tight text-center leading-tight">ADD ANIME</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#bdbfc3] border border-[#787b80] w-[600px] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col">

            {/* Header */}
            <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-3 py-2 text-[11px] border-b border-[#1a202c] flex justify-between items-center shrink-0">
              <span className="flex items-center gap-2">
                <span>{step === 'CHOOSE_TYPE' ? 'SELECT CONTENT TYPE' : `ADD ${payload.type.toUpperCase()} WIZARD`}</span>
                {step !== 'CHOOSE_TYPE' && (
                  <span className="text-[#9fa2a8] text-[9px] lowercase opacity-80 border border-[#9fa2a8] px-1.5 rounded-full ml-2">
                    {step.replace('_', ' ')}
                  </span>
                )}
              </span>
              <button type="button" onClick={handleCancel} disabled={isSubmitting} className="hover:text-red-400 font-bold cursor-pointer disabled:opacity-50">
                <X size={16} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-[#9fa2a8] w-full">
              <div
                className="h-full bg-[#1a5c36] transition-all duration-300"
                style={{ width: `${getStepProgress()}%` }}
              />
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="bg-[#c02222] text-white text-[10px] font-mono font-bold px-3 py-1.5 text-center">
                ERROR: {errorMsg}
              </div>
            )}

            {/* Content Area */}
            <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar text-left flex-1 min-h-0">

              {/* STEP 1: CHOOSE OPTION */}
              {step === 'CHOOSE_TYPE' && (
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <button onClick={() => handleChooseType('movie')} className="flex flex-col items-center justify-center h-28 bg-[#34394d] hover:bg-[#4a4f5d] text-white border border-[#1c2331] cursor-pointer transition-colors group">
                    <Film size={28} className="mb-2 group-hover:scale-110 transition-transform text-[#e2933c]" />
                    <span className="text-[12px] font-bold font-mono">MOVIE</span>
                    <span className="text-[9px] text-[#9fa2a8] mt-1 text-center px-2">Single feature-length film</span>
                  </button>
                  <button onClick={() => handleChooseType('season')} className="flex flex-col items-center justify-center h-28 bg-[#34394d] hover:bg-[#4a4f5d] text-white border border-[#1c2331] cursor-pointer transition-colors group">
                    <MonitorPlay size={28} className="mb-2 group-hover:scale-110 transition-transform text-[#48bb78]" />
                    <span className="text-[12px] font-bold font-mono">SEASON / TV</span>
                    <span className="text-[9px] text-[#9fa2a8] mt-1 text-center px-2">Multi-episode series with seasons</span>
                  </button>
                  <button onClick={() => handleChooseType('drama')} className="flex flex-col items-center justify-center h-28 bg-[#34394d] hover:bg-[#4a4f5d] text-white border border-[#1c2331] cursor-pointer transition-colors group">
                    <FilePlay size={28} className="mb-2 group-hover:scale-110 transition-transform text-[#60a5fa]" />
                    <span className="text-[12px] font-bold font-mono">DRAMA</span>
                    <span className="text-[9px] text-[#9fa2a8] mt-1 text-center px-2">Series without strict seasons</span>
                  </button>
                </div>
              )}

              {/* STEP 2: ANIME INFO */}
              {step === 'ANIME_INFO' && (
                <div className="space-y-3">
                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">BASIC DETAILS</span>
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Title<span className="text-red-700">*</span></label>
                      <input required type="text" value={payload.title} onChange={e => updatePayload({ title: e.target.value })}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243]"
                        placeholder="e.g. Solo Leveling" />
                    </div>
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5 mt-2">Description</label>
                      <textarea value={payload.description} onChange={e => updatePayload({ description: e.target.value })}
                        rows={3}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243] resize-none"
                        placeholder="Synopsis..." />
                    </div>
                  </div>

                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">STATUS & RELEASE DATE</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Airing Status<span className="text-red-700">*</span></label>
                        <select value={payload.status} onChange={e => updatePayload({ status: e.target.value as any })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243]">
                          <option value="Upcoming">Upcoming</option>
                          <option value="Finished">Finished</option>
                          <option value="Airing">Airing</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Release Date</label>
                        <input type="date" value={payload.releaseDate} onChange={e => updatePayload({ releaseDate: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243]" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">MEDIA RESOURCES (UPLOADS TO: {folderName})</span>
                    {!payload.title.trim() && (
                      <div className="text-[10px] text-red-600 font-bold mb-2">Enter Title to enable uploads.</div>
                    )}
                    <div className={`grid grid-cols-1 gap-3 ${!payload.title.trim() ? 'opacity-50 pointer-events-none' : ''}`}>
                      <ImageUpload folderName={folderName} currentUrl={payload.imageUrl} currentPublicId={payload.imagePublicId} onUpload={(url, id) => updatePayload({ imageUrl: url, imagePublicId: id })} onRemove={() => updatePayload({ imageUrl: null, imagePublicId: null })} />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3A: SEASON INFO (For TV/Season) */}
              {step === 'SEASON_INFO' && (
                <div className="space-y-3">
                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">SEASON DETAILS</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Season Number<span className="text-red-700">*</span></label>
                        <input required type="number" min={1} value={payload.seasonNumber} onChange={e => updatePayload({ seasonNumber: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243] font-mono" placeholder="1" />
                      </div>
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Season Title</label>
                        <input type="text" value={payload.seasonTitle} onChange={e => updatePayload({ seasonTitle: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243]" placeholder="e.g. Part 2" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5 mt-2">Season Description</label>
                      <textarea value={payload.seasonDescription} onChange={e => updatePayload({ seasonDescription: e.target.value })} rows={2}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243] resize-none" placeholder="Optional season synopsis..." />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3B/4: EPISODE INFO (For TV/Season & Drama) */}
              {step === 'EPISODE_INFO' && (
                <div className="space-y-3">
                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">INITIAL EPISODE DETAILS</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Episode Number<span className="text-red-700">*</span></label>
                        <input required type="number" min={1} step="0.1" value={payload.episodeNumber} onChange={e => updatePayload({ episodeNumber: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243] font-mono" placeholder="1" />
                      </div>
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Air Date</label>
                        <input type="date" value={payload.episodeAirDate} onChange={e => updatePayload({ episodeAirDate: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5 mt-2">Episode Title</label>
                      <input type="text" value={payload.episodeTitle} onChange={e => updatePayload({ episodeTitle: e.target.value })}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243]" placeholder="Title..." />
                    </div>
                    <div>
                      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5 mt-2">Description</label>
                      <textarea value={payload.episodeDescription} onChange={e => updatePayload({ episodeDescription: e.target.value })} rows={2}
                        className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243] resize-none" placeholder="Synopsis..." />
                    </div>
                  </div>

                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">EPISODE SUBTITLE</span>
                    <SubtitleUpload folderName={folderName} currentUrl={payload.episodeSubtitleUrl} currentPublicId={payload.episodeSubtitlePublicId}
                      onUpload={(url, id) => updatePayload({ episodeSubtitleUrl: url, episodeSubtitlePublicId: id })}
                      onRemove={() => updatePayload({ episodeSubtitleUrl: null, episodeSubtitlePublicId: null })} />
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Language Code</label>
                        <input type="text" value={payload.episodeSubtitleLanguage} onChange={e => updatePayload({ episodeSubtitleLanguage: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                          placeholder="en" />
                      </div>
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Language Name</label>
                        <input type="text" value={payload.episodeSubtitleLanguageName} onChange={e => updatePayload({ episodeSubtitleLanguageName: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                          placeholder="English" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Format</label>
                        <select value={payload.episodeSubtitleFormat} onChange={e => updatePayload({ episodeSubtitleFormat: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]">
                          <option value="SRT">SRT</option>
                          <option value="ASS">ASS</option>
                          <option value="VTT">VTT</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <label className="flex items-center gap-2 text-[10px] text-[#222735] font-mono font-bold uppercase cursor-pointer">
                          <input type="checkbox" checked={payload.episodeSubtitleIsVerified} onChange={e => updatePayload({ episodeSubtitleIsVerified: e.target.checked })}
                            className="h-4 w-4 text-[#1a5c36] focus:ring-[#1a5c36] border-[#8c8f94] rounded" />
                          Is Verified
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3C: MOVIE SUBTITLE */}
              {step === 'MOVIE_SUBTITLE' && (
                <div className="space-y-3">
                  <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
                    <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">MOVIE SUBTITLE</span>
                    <SubtitleUpload folderName={folderName} currentUrl={payload.movieSubtitleUrl} currentPublicId={payload.movieSubtitlePublicId}
                      onUpload={(url, id) => updatePayload({ movieSubtitleUrl: url, movieSubtitlePublicId: id })}
                      onRemove={() => updatePayload({ movieSubtitleUrl: null, movieSubtitlePublicId: null })} />
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Language Code</label>
                        <input type="text" value={payload.movieSubtitleLanguage} onChange={e => updatePayload({ movieSubtitleLanguage: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                          placeholder="en" />
                      </div>
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Language Name</label>
                        <input type="text" value={payload.movieSubtitleLanguageName} onChange={e => updatePayload({ movieSubtitleLanguageName: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]"
                          placeholder="English" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5">Format</label>
                        <select value={payload.movieSubtitleFormat} onChange={e => updatePayload({ movieSubtitleFormat: e.target.value })}
                          className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]">
                          <option value="SRT">SRT</option>
                          <option value="ASS">ASS</option>
                          <option value="VTT">VTT</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <label className="flex items-center gap-2 text-[10px] text-[#222735] font-mono font-bold uppercase cursor-pointer">
                          <input type="checkbox" checked={payload.movieSubtitleIsVerified} onChange={e => updatePayload({ movieSubtitleIsVerified: e.target.checked })}
                            className="h-4 w-4 text-[#1a5c36] focus:ring-[#1a5c36] border-[#8c8f94] rounded" />
                          Is Verified
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="flex gap-2 p-3 bg-[#2a3243] border-t border-[#1a202c]">
              {/* <button type="button" onClick={handleCancel} disabled={isSubmitting}
                className="py-1.5 px-4 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50">
                CANCEL
              </button> */}

              <div className="flex-1 flex justify-end gap-2">
                {step !== 'CHOOSE_TYPE' && step !== 'ANIME_INFO' && (
                  <button type="button" disabled={isSubmitting}
                    onClick={() => {
                      if (step === 'MOVIE_SUBTITLE') setStep('ANIME_INFO');
                      else if (step === 'SEASON_INFO') setStep('ANIME_INFO');
                      else if (step === 'EPISODE_INFO' && payload.type === 'season') setStep('SEASON_INFO');
                      else if (step === 'EPISODE_INFO' && payload.type === 'drama') setStep('ANIME_INFO');
                    }}
                    className="py-1.5 px-4 border border-[#8c8f94] bg-[#34394d] hover:bg-[#4a4f5d] text-[11px] font-mono font-bold text-white cursor-pointer disabled:opacity-50">
                    BACK
                  </button>
                )}

                {step === 'ANIME_INFO' && (
                  <button type="button" onClick={nextFromAnimeInfo} disabled={isSubmitting}
                    className="flex items-center gap-1 py-1.5 px-4 bg-[#1f3e70] hover:bg-[#254d8c] text-white text-[11px] font-mono font-bold border border-[#15305a] cursor-pointer disabled:opacity-50">
                    NEXT <ChevronRight size={14} />
                  </button>
                )}

                {step === 'SEASON_INFO' && (
                  <button type="button" onClick={nextFromSeasonInfo} disabled={isSubmitting}
                    className="flex items-center gap-1 py-1.5 px-4 bg-[#1f3e70] hover:bg-[#254d8c] text-white text-[11px] font-mono font-bold border border-[#15305a] cursor-pointer disabled:opacity-50">
                    NEXT <ChevronRight size={14} />
                  </button>
                )}

                {(step === 'MOVIE_SUBTITLE' || step === 'EPISODE_INFO') && (
                  <button type="button" onClick={handleFinalSubmit} disabled={isSubmitting}
                    className="flex items-center gap-1 py-1.5 px-4 bg-[#1a5c36] hover:bg-[#236b40] text-white text-[11px] font-mono font-bold border border-[#134526] cursor-pointer disabled:opacity-50">
                    {isSubmitting ? 'PROCESSING...' : (
                      <><CheckCircle2 size={14} /> COMMIT TO DB</>
                    )}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default AddAnime;