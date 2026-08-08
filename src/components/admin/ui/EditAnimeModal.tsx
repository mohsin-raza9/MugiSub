'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, Pencil } from 'lucide-react';
import ImageUpload from '@/components/admin/uploads/ImageUpload';

interface AnimeFormData {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  imageUrl: string | null;
  imagePublicId: string | null;
  episodesCount: string;
  releaseDate: string;
  ratingCount: string;
  popularityScore: string;
  trendingScore: string;
  viewsCount: string;
  likesCount: string;
}

interface EditAnimeModalProps {
  isOpen: boolean;
  animeId: string | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditAnimeModal({ isOpen, animeId, onClose, onSaved }: EditAnimeModalProps) {
  const [formData, setFormData] = useState<AnimeFormData>({
    id: '',
    title: '',
    description: '',
    type: 'TV',
    status: 'Upcoming',
    imageUrl: null,
    imagePublicId: null,
    episodesCount: '',
    releaseDate: '',
    ratingCount: '0',
    popularityScore: '0',
    trendingScore: '0',
    viewsCount: '0',
    likesCount: '0',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const folderName = formData.title ? formData.title.replace(/[^a-zA-Z0-9]/g, '_') : 'Untitled_Anime';

  useEffect(() => {
    if (!isOpen || !animeId) return;

    const fetchAnime = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/anime/${animeId}`);
        if (!res.ok) throw new Error('Failed to fetch anime data');
        const data = await res.json();
        console.log('fetched anime:', data);
        setFormData({
          id: data.id,
          title: data.title || '',
          description: data.description || '',
          type: data.type || 'TV',
          status: data.status || 'Upcoming',
          imageUrl: data.image || null,
          imagePublicId: null,
          episodesCount: data.episodesCount != null ? String(data.episodesCount) : '',
          releaseDate: data.releaseDate ? new Date(data.releaseDate).toISOString().split('T')[0] : '',
          ratingCount: String(data.ratingCount ?? 0),
          popularityScore: String(data.popularityScore ?? 0),
          trendingScore: String(data.trendingScore ?? 0),
          viewsCount: String(data.viewsCount ?? 0),
          likesCount: String(data.likesCount ?? 0),
        });
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load anime');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnime();
  }, [isOpen, animeId]);

  const handleChange = (field: keyof AnimeFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animeId) return;

    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/anime/${animeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          type: formData.type,
          status: formData.status,
          imageUrl: formData.imageUrl,
          episodesCount: formData.episodesCount ? Number(formData.episodesCount) : null,
          releaseDate: formData.releaseDate || null,
          ratingCount: Number(formData.ratingCount),
          popularityScore: Number(formData.popularityScore),
          trendingScore: Number(formData.trendingScore),
          viewsCount: Number(formData.viewsCount),
          likesCount: Number(formData.likesCount),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update anime');
      }

      onSaved();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save anime');
    } finally {
      setIsSaving(false);
    }
  };

  const resetAndClose = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      type: 'TV',
      status: 'Upcoming',
      imageUrl: null,
      imagePublicId: null,
      episodesCount: '',
      releaseDate: '',
      ratingCount: '0',
      popularityScore: '0',
      trendingScore: '0',
      viewsCount: '0',
      likesCount: '0',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#bdbfc3] border-2 border-[#787b80] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.6)] flex flex-col">
        {/* Header */}
        <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-4 py-3 text-xs border-b-2 border-[#1a202c] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Pencil size={16} className="text-blue-400" />
            <span>Edit Anime</span>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            disabled={isSaving}
            className="hover:text-red-400 font-bold cursor-pointer disabled:opacity-50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto custom-scrollbar flex-1 min-h-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 size={28} className="text-gray-600 animate-spin mb-2" />
              <p className="text-xs font-mono text-gray-700 uppercase tracking-wider">Loading Anime Data...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 border-2 border-red-400 text-red-800 px-3 py-2 text-xs font-mono">
                  {error}
                </div>
              )}

              {/* Basic Info */}
              <div className="space-y-3 bg-[#caccce] p-3 border border-[#9fa2a8]">
                <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-1 mb-2">BASIC INFORMATION</span>
                <div>
                  <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Title<span className="text-red-700">*</span></label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={e => handleChange('title', e.target.value)}
                    className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => handleChange('description', e.target.value)}
                    rows={3}
                    className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243] resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Type<span className="text-red-700">*</span></label>
                    <select
                      value={formData.type}
                      onChange={e => handleChange('type', e.target.value)}
                      className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243]"
                    >
                      <option value="TV">TV</option>
                      <option value="Movie">Movie</option>
                      <option value="OVA">OVA</option>
                      <option value="ONA">ONA</option>
                      <option value="Special">Special</option>
                      <option value="Drama">Drama</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Status<span className="text-red-700">*</span></label>
                    <select
                      value={formData.status}
                      onChange={e => handleChange('status', e.target.value)}
                      className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none cursor-pointer focus:border-[#2a3243]"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Airing">Airing</option>
                      <option value="Finished">Finished</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Episodes Count</label>
                    <input
                      type="number"
                      value={formData.episodesCount}
                      onChange={e => handleChange('episodesCount', e.target.value)}
                      className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243]"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Release Date</label>
                    <input
                      type="date"
                      value={formData.releaseDate}
                      onChange={e => handleChange('releaseDate', e.target.value)}
                      className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243]"
                    />
                  </div>
                </div>
              </div>

              {/* Poster */}
              <div className="space-y-2 bg-[#caccce] p-3 border border-[#9fa2a8]">
                <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-1 mb-2">POSTER IMAGE</span>
                <ImageUpload
                  folderName={folderName}
                  currentUrl={formData.imageUrl}
                  currentPublicId={formData.imagePublicId}
                  onUpload={(url, id) => handleChange('imageUrl', url)}
                  onRemove={() => handleChange('imageUrl', null)}
                />
              </div>

              {/* Stats */}
              <div className="space-y-2 bg-[#caccce] p-3 border border-[#9fa2a8]">
                <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-1 mb-2">STATISTICS</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Rating Count</label>
                    <input type="number" value={formData.ratingCount} onChange={e => handleChange('ratingCount', e.target.value)}
                      className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]" />
                  </div>
                  <div>
                    <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Popularity</label>
                    <input type="number" step="any" value={formData.popularityScore} onChange={e => handleChange('popularityScore', e.target.value)}
                      className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]" />
                  </div>
                  <div>
                    <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Trending</label>
                    <input type="number" step="any" value={formData.trendingScore} onChange={e => handleChange('trendingScore', e.target.value)}
                      className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]" />
                  </div>
                  <div>
                    <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Views</label>
                    <input type="number" value={formData.viewsCount} onChange={e => handleChange('viewsCount', e.target.value)}
                      className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]" />
                  </div>
                  <div>
                    <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Likes</label>
                    <input type="number" value={formData.likesCount} onChange={e => handleChange('likesCount', e.target.value)}
                      className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-[#9fa2a8]">
                <button
                  type="button"
                  onClick={resetAndClose}
                  disabled={isSaving}
                  className="flex-1 py-2 border-2 border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-xs font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50 transition-colors shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isLoading}
                  className="flex-1 py-2 bg-[#1a5c36] hover:bg-[#236b40] text-white text-xs font-mono font-bold border-2 border-[#134526] cursor-pointer disabled:opacity-50 transition-colors shadow-[2px_2px_0px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2"
                >
                  {isSaving && <Loader2 size={12} className="animate-spin" />}
                  {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
