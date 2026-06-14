'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  FileVideo,
  ImageIcon,
  CheckCircle2,
  Loader2,
  Terminal,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

export default function AnimeForm() {
  // ── Form field state ──────────────────────────────────────────────────────
  const [animeTitle, setAnimeTitle] = useState('');
  const [animeDesc, setAnimeDesc] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // ── Upload flow state ─────────────────────────────────────────────────────
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadLogs, setUploadLogs] = useState<string[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // ── Hidden file input refs ────────────────────────────────────────────────
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // ── Simulated upload progress ─────────────────────────────────────────────
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isUploading) {
      interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUploadSuccess(true);
            return 100;
          }
          const next = Math.min(prev + Math.floor(Math.random() * 15) + 5, 100);

          if (next > 10 && next <= 30 && uploadLogs.length < 1)
            setUploadLogs((l) => [...l, '[SYS]: Connecting to server core... [ESTABLISHED]']);
          else if (next > 30 && next <= 50 && uploadLogs.length < 2)
            setUploadLogs((l) => [...l, '[SYS]: Allocating server cluster buffer... [OK]']);
          else if (next > 50 && next <= 75 && uploadLogs.length < 3)
            setUploadLogs((l) => [...l, `[SYS]: Uploading video stream chunks... ${next}%`]);
          else if (next > 75 && next < 100 && uploadLogs.length < 4)
            setUploadLogs((l) => [...l, '[SYS]: Writing metadata records to Neon DB schema... [OK]']);

          return next;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isUploading, uploadLogs.length]);

  const resetForm = () => {
    setAnimeTitle('');
    setAnimeDesc('');
    setVideoFile(null);
    setThumbnailFile(null);
    setUploadSuccess(false);
    setUploadProgress(0);
    setUploadLogs([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!animeTitle) return;
    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);
    setUploadLogs(['[SYS]: Initializing secure file transport stream...']);
  };

  // ── SUCCESS STATE ─────────────────────────────────────────────────────────
  if (uploadSuccess) {
    return (
      <div className="py-8 flex flex-col items-center justify-center text-center font-mono">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] mb-4 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Upload Completed</h3>
        <p className="text-xs text-emerald-400 mt-1 uppercase max-w-md">
          DATABASE RECORD CREATED SUCCESSFULLY. METADATA FILE WRITTEN.
        </p>

        {/* Summary */}
        <div className="mt-6 bg-[#0d111a] border border-[#1d2433] p-4 text-left text-xs text-slate-300 w-full max-w-md space-y-2">
          <div className="text-purple-400 border-b border-[#1d2433] pb-1 font-bold text-[10px] uppercase">
            Upload Summary
          </div>
          <div><span className="text-slate-500">Title:</span> {animeTitle}</div>
          {videoFile && (
            <div>
              <span className="text-slate-500">Video File:</span> {videoFile.name}{' '}
              ({(videoFile.size / (1024 * 1024)).toFixed(1)} MB)
            </div>
          )}
          {thumbnailFile && (
            <div><span className="text-slate-500">Thumbnail:</span> {thumbnailFile.name}</div>
          )}
          {animeDesc && (
            <div className="line-clamp-2">
              <span className="text-slate-500">Description:</span> {animeDesc}
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={resetForm}
            className="px-5 py-2 bg-[#0d111a] border border-[#1d2433] hover:border-purple-500/40 text-xs font-bold uppercase transition-all cursor-pointer"
          >
            Upload Another
          </button>
          <Link
            href="/admin"
            className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ── MAIN FORM ─────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* ROW 1 — Video File Upload */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            upload anime
          </label>
          <p className="text-[10px] text-slate-500 mt-1">
            Accepts high definition mkv, mp4 source streams.
          </p>
        </div>

        <div className="md:w-2/3">
          <input
            type="file"
            ref={videoInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) setVideoFile(e.target.files[0]);
            }}
            accept="video/*"
            className="hidden"
          />
          <div
            onClick={() => videoInputRef.current?.click()}
            className="border-2 border-dashed border-[#1d2433] hover:border-purple-500/40 bg-[#0d111a] p-5 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2"
          >
            {videoFile ? (
              <>
                <FileVideo className="w-8 h-8 text-purple-400" />
                <div className="text-xs text-white font-mono font-bold truncate max-w-full px-4">
                  {videoFile.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  ({(videoFile.size / (1024 * 1024)).toFixed(1)} MB) — Click to change
                </div>
              </>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-slate-500" />
                <span className="text-xs font-mono text-[#94a3b8]">Click to select video stream</span>
                <span className="text-[9px] text-slate-600 font-mono">DRAG &amp; DROP SUPPORTED</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ROW 2 — Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            Add title
          </label>
          <p className="text-[10px] text-slate-500 mt-1">Main metadata indexing name.</p>
        </div>
        <div className="md:w-2/3">
          <input
            type="text"
            required
            value={animeTitle}
            onChange={(e) => setAnimeTitle(e.target.value)}
            placeholder="Enter series or movie name"
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-purple-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
      </div>

      {/* ROW 3 — Description */}
      <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left pt-1">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            description
          </label>
          <p className="text-[10px] text-slate-500 mt-1">
            Short plot summary, characters, air time notes.
          </p>
        </div>
        <div className="md:w-2/3">
          <textarea
            value={animeDesc}
            onChange={(e) => setAnimeDesc(e.target.value)}
            placeholder="Enter anime plot synopsis..."
            rows={4}
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-purple-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none resize-none transition-colors"
          />
        </div>
      </div>

      {/* ROW 4 — Thumbnail */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
        <div className="md:w-1/3 text-left">
          <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            thumbnail
          </label>
          <p className="text-[10px] text-slate-500 mt-1">
            Anime poster upload. Recommended 3:4 ratio.
          </p>
        </div>
        <div className="md:w-2/3">
          <input
            type="file"
            ref={thumbnailInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) setThumbnailFile(e.target.files[0]);
            }}
            accept="image/*"
            className="hidden"
          />
          <div
            onClick={() => thumbnailInputRef.current?.click()}
            className="border-2 border-dashed border-[#1d2433] hover:border-purple-500/40 bg-[#0d111a] p-4 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-1"
          >
            {thumbnailFile ? (
              <>
                <ImageIcon className="w-6 h-6 text-cyan-400" />
                <div className="text-xs text-white font-mono font-bold truncate max-w-full px-4">
                  {thumbnailFile.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Click to change</div>
              </>
            ) : (
              <>
                <UploadCloud className="w-6 h-6 text-slate-500" />
                <span className="text-xs font-mono text-[#94a3b8]">Upload poster image</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Uploading state panel */}
      {isUploading && (
        <div className="bg-[#0d111a] border border-[#1d2433] p-4 flex flex-col gap-3 font-mono">
          <div className="flex items-center justify-between text-xs font-bold text-purple-400">
            <span className="flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              UPLOADING FILE CHUNKS...
            </span>
            <span>{uploadProgress}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#111622] h-1.5 border border-[#1d2433]">
            <div
              className="bg-gradient-to-r from-purple-600 to-cyan-500 h-full transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.6)]"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>

          {/* Terminal logs */}
          <div className="bg-[#050811] border border-[#1d2433] p-2.5 h-20 overflow-y-auto text-[9px] text-slate-400 flex flex-col gap-1 select-none">
            <div className="text-cyan-500 font-bold border-b border-[#1d2433]/30 pb-0.5 flex items-center gap-1">
              <Terminal className="w-3 h-3" /> STREAM_MONITOR_LOGS
            </div>
            {uploadLogs.map((log, idx) => (
              <div key={idx} className="leading-tight truncate">{log}</div>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center justify-center pt-2">
        <button
          type="submit"
          disabled={isUploading}
          className="bg-[#7c3aed] text-white hover:bg-[#8b5cf6] font-bold text-xs uppercase py-2.5 px-8 transition-all duration-300 border border-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.35)] hover:shadow-[0_0_20px_rgba(168,85,247,0.55)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-none font-mono"
        >
          {isUploading ? 'Processing...' : 'Upload'}
        </button>
      </div>

    </form>
  );
}
