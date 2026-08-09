'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, Pencil, LayoutList } from 'lucide-react';

interface SeasonFormData {
  id: string;
  number: string;
  title: string;
}

interface EditSeasonModalProps {
  isOpen: boolean;
  seasonId: string | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditSeasonModal({ isOpen, seasonId, onClose, onSaved }: EditSeasonModalProps) {
  const [formData, setFormData] = useState<SeasonFormData>({
    id: '',
    number: '1',
    title: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !seasonId) return;

    const fetchSeason = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/season/${seasonId}`);
        if (!res.ok) throw new Error('Failed to fetch season data');
        const data = await res.json();
        setFormData({
          id: data.id,
          number: String(data.number || ''),
          title: data.title || '',
        });
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load season');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeason();
  }, [isOpen, seasonId]);

  const handleChange = (field: keyof SeasonFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seasonId) return;

    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/season/${seasonId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: Number(formData.number),
          title: formData.title || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update season');
      }

      onSaved();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save season');
    } finally {
      setIsSaving(false);
    }
  };

  const resetAndClose = () => {
    setFormData({ id: '', number: '1', title: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#bdbfc3] border-2 border-[#787b80] w-full max-w-md shadow-[4px_4px_0px_rgba(0,0,0,0.6)] flex flex-col">
        {/* Header */}
        <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-4 py-3 text-xs border-b-2 border-[#1a202c] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Pencil size={16} className="text-blue-400" />
            <span>Edit Season</span>
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
              <p className="text-xs font-mono text-gray-700 uppercase tracking-wider">Loading Season Data...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 border-2 border-red-400 text-red-800 px-3 py-2 text-xs font-mono">
                  {error}
                </div>
              )}

              {/* Info */}
              <div className="space-y-3 bg-[#caccce] p-3 border border-[#9fa2a8]">
                <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-1 mb-2 flex items-center gap-2">
                  <LayoutList size={12} />
                  SEASON INFORMATION
                </span>
                <div>
                  <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Season Number<span className="text-red-700">*</span></label>
                  <input
                    required
                    type="number"
                    min={1}
                    value={formData.number}
                    onChange={e => handleChange('number', e.target.value)}
                    className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase mb-1">Title (Optional)</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => handleChange('title', e.target.value)}
                    className="w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1.5 text-[11px] text-black outline-none focus:border-[#2a3243]"
                    placeholder="e.g. Enter: The Gate of Beginning Part 2"
                  />
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
