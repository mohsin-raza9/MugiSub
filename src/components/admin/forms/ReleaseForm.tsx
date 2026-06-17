'use client';

import React, { useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ReleaseForm() {
  const [episodeId, setEpisodeId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [format, setFormat] = useState('mkv');
  const [resolution, setResolution] = useState('1080p');
  const [languages, setLanguages] = useState('ja, en');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isNew, setIsNew] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!episodeId || !groupId) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setEpisodeId('');
    setGroupId('');
    setFormat('mkv');
    setResolution('1080p');
    setLanguages('ja, en');
    setDownloadUrl('');
    setIsNew(true);
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="py-8 flex flex-col items-center justify-center text-center font-mono">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] mb-4 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Release Added</h3>
        <p className="text-xs text-emerald-400 mt-1 uppercase max-w-md">
          RECORD CREATED SUCCESSFULLY.
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={resetForm}
            className="px-5 py-2 bg-[#0d111a] border border-[#1d2433] hover:border-amber-500/40 text-xs font-bold uppercase transition-all cursor-pointer"
          >
            Add Another
          </button>
          <Link
            href="/admin"
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Episode ID */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Episode ID</label>
          <p className="text-[10px] text-slate-500 mt-1">UUID of the target episode.</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            required
            value={episodeId}
            onChange={(e) => setEpisodeId(e.target.value)}
            placeholder="e.g. 123e4567-e89b..."
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-amber-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      {/* Group ID */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Fansub Group</label>
          <p className="text-[10px] text-slate-500 mt-1">Group ID or Search by Name.</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            required
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            placeholder="e.g. SubsPlease"
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-amber-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      {/* Format & Resolution (Side by Side on desktop) */}
      <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left mt-2">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">File Details</label>
          <p className="text-[10px] text-slate-500 mt-1">Format and resolution specs.</p>
        </div>
        <div className="md:w-2/3 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-amber-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors appearance-none cursor-pointer"
            >
              <option value="mkv">MKV</option>
              <option value="mp4">MP4</option>
              <option value="avi">AVI</option>
              <option value="other">Other</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>
          <div className="flex-1 relative">
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-amber-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors appearance-none cursor-pointer"
            >
              <option value="2160p">2160p (4K)</option>
              <option value="1080p">1080p (FHD)</option>
              <option value="720p">720p (HD)</option>
              <option value="480p">480p (SD)</option>
              <option value="unk">Unknown</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Languages</label>
          <p className="text-[10px] text-slate-500 mt-1">Comma-separated (e.g. ja, en)</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="ja, en"
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-amber-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      {/* Download URL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Download URL</label>
          <p className="text-[10px] text-slate-500 mt-1">Direct link or magnet.</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            value={downloadUrl}
            onChange={(e) => setDownloadUrl(e.target.value)}
            placeholder="https://..."
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-amber-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      {/* Is New Checkbox */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Status</label>
        </div>
        <div className="md:w-2/3 flex items-center gap-3">
          <input
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
            className="w-4 h-4 bg-[#0d111a] border-[#1d2433] text-amber-500 rounded-none focus:ring-amber-500/50"
          />
          <span className="text-xs font-mono text-slate-400">Mark as New Release</span>
        </div>
      </div>

      <div className="flex items-center justify-center pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#d97706] text-white hover:bg-[#f59e0b] font-bold text-xs uppercase py-2.5 px-8 transition-all duration-300 border border-[#fbbf24] shadow-[0_0_15px_rgba(251,191,36,0.35)] hover:shadow-[0_0_20px_rgba(251,191,36,0.55)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-none font-mono flex items-center gap-2"
        >
          {isSubmitting ? 'Processing...' : <><Download className="w-4 h-4" /> Add Release</>}
        </button>
      </div>
    </form>
  );
}
