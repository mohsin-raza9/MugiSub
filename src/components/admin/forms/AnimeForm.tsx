'use client';

import React, { useState, useRef } from 'react';
import {
  Film,
  Tv2,
  UploadCloud,
  ImageIcon,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
  Link2,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type AnimeType = 'Movie' | 'TV Series' | 'OVA' | 'Web' | 'Special';
type AnimeStatus = 'Airing' | 'Finished' | 'Upcoming';
type Step = 'select-type' | 'form' | 'success';

// ─── Helper: Upload a file to Cloudinary via our server proxy ─────────────────
async function uploadToCloudinary(
  file: File,
  resourceType: 'image' | 'video' = 'image'
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('resource_type', resourceType);

  const res = await fetch('/api/cloudinary/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Cloudinary upload failed');
  }

  const data = await res.json();
  return data.secure_url as string;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-3 border-b border-[#1d2433]/70 pb-5">
      <div className="md:w-1/3 pt-1">
        <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">
          {label}
        </span>
        {hint && <p className="text-[10px] text-slate-500 mt-0.5">{hint}</p>}
      </div>
      <div className="md:w-2/3">{children}</div>
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <input
      type="text"
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-purple-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-purple-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// Image upload field with Cloudinary
function ImageUploadField({
  label,
  hint,
  onUploaded,
}: {
  label: string;
  hint?: string;
  onUploaded: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');

  const handleFile = async (f: File) => {
    setFile(f);
    setError('');
    setUploading(true);
    try {
      const url = await uploadToCloudinary(f, 'image');
      setUploadedUrl(url);
      onUploaded(url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Field label={label} hint={hint}>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
      />
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-[#1d2433] hover:border-purple-500/40 bg-[#0d111a] p-4 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-1 min-h-[80px]"
      >
        {uploading ? (
          <>
            <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
            <span className="text-[10px] font-mono text-slate-400">Uploading to Cloudinary…</span>
          </>
        ) : uploadedUrl ? (
          <>
            <ImageIcon className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-400 font-bold">Uploaded ✓</span>
            <span className="text-[9px] text-slate-500 font-mono truncate max-w-full px-2">
              {file?.name}
            </span>
            <span className="text-[9px] text-slate-600 font-mono">Click to change</span>
          </>
        ) : (
          <>
            <UploadCloud className="w-5 h-5 text-slate-500" />
            <span className="text-xs font-mono text-slate-400">Click to upload image</span>
            <span className="text-[9px] text-slate-600 font-mono">JPG, PNG, WEBP supported</span>
          </>
        )}
      </div>
      {error && (
        <p className="mt-1 text-[10px] font-mono text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </Field>
  );
}

// ─── Step 1: Type Selector ────────────────────────────────────────────────────
function TypeSelector({ onSelect }: { onSelect: (type: AnimeType) => void }) {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="text-center">
        <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
          Select content type to continue
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        {/* Movie */}
        <button
          type="button"
          onClick={() => onSelect('Movie')}
          className="group flex flex-col items-center gap-3 p-6 bg-[#0d111a] border border-[#1d2433] hover:border-purple-500/60 hover:bg-purple-500/5 transition-all duration-200 cursor-pointer"
        >
          <div className="w-14 h-14 flex items-center justify-center bg-purple-500/10 border border-purple-500/20 group-hover:border-purple-500/60 group-hover:bg-purple-500/20 transition-all duration-200">
            <Film className="w-7 h-7 text-purple-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold font-mono text-white uppercase tracking-wider">Movie</p>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              Single-file feature film
            </p>
          </div>
          <span className="text-[9px] font-mono text-purple-400/60 uppercase tracking-widest border border-purple-500/20 px-2 py-0.5">
            + video url
          </span>
        </button>

        {/* Web Series */}
        <button
          type="button"
          onClick={() => onSelect('TV Series')}
          className="group flex flex-col items-center gap-3 p-6 bg-[#0d111a] border border-[#1d2433] hover:border-cyan-500/60 hover:bg-cyan-500/5 transition-all duration-200 cursor-pointer"
        >
          <div className="w-14 h-14 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/60 group-hover:bg-cyan-500/20 transition-all duration-200">
            <Tv2 className="w-7 h-7 text-cyan-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold font-mono text-white uppercase tracking-wider">Web Series</p>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              Multi-episode TV / web show
            </p>
          </div>
          <span className="text-[9px] font-mono text-cyan-400/60 uppercase tracking-widest border border-cyan-500/20 px-2 py-0.5">
            → episodes page
          </span>
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Main Form ────────────────────────────────────────────────────────
function AnimeMetaForm({
  animeType,
  onBack,
}: {
  animeType: AnimeType;
  onBack: () => void;
}) {
  const isMovie = animeType === 'Movie';

  // Form state
  const [titleRomaji, setTitleRomaji] = useState('');
  const [titleEnglish, setTitleEnglish] = useState('');
  const [titleJapanese, setTitleJapanese] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<AnimeStatus>('Upcoming');
  const [airDate, setAirDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [episodesCount, setEpisodesCount] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleRomaji.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Create the anime record
      const res = await fetch('/api/anime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleRomaji,
          titleEnglish: titleEnglish || undefined,
          titleJapanese: titleJapanese || undefined,
          description: description || undefined,
          type: animeType,
          status,
          airDate: airDate || undefined,
          endDate: endDate || undefined,
          image: imageUrl || undefined,
          videoUrl: isMovie && videoUrl ? videoUrl : undefined,
          episodesCount: !isMovie && episodesCount ? Number(episodesCount) : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to create anime');
        return;
      }

      const anime = data.data;
      setCreatedId(anime.id);

      // 2. For web series, redirect to episodes page
      if (!isMovie) {
        window.location.href = `/admin/anime/add/episodes?animeId=${anime.id}&title=${encodeURIComponent(titleRomaji)}`;
        return;
      }

      // 3. For movies, optionally save video URL (already included in create)
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/admin';
      }, 1800);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success && createdId) {
    return (
      <div className="py-8 flex flex-col items-center justify-center text-center font-mono gap-4">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Anime Added!</h3>
        <p className="text-xs text-emerald-400 uppercase">
          Record saved successfully — redirecting to dashboard…
        </p>
        <div className="bg-[#0d111a] border border-[#1d2433] px-4 py-2 text-left text-xs text-slate-300 w-full max-w-xs space-y-1">
          <div><span className="text-slate-500">Title:</span> {titleRomaji}</div>
          <div><span className="text-slate-500">Type:</span> {animeType}</div>
          <div><span className="text-slate-500">Status:</span> {status}</div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Back + type badge */}
      <div className="flex items-center gap-3 mb-1">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Change type
        </button>
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest border px-2 py-0.5 ${
            isMovie
              ? 'text-purple-400 border-purple-500/30 bg-purple-500/5'
              : 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5'
          }`}
        >
          {isMovie ? <Film className="w-3 h-3" /> : <Tv2 className="w-3 h-3" />}
          {animeType}
        </span>
      </div>

      {/* ── Title Romaji (required) */}
      <Field label="Title (Romaji)" hint="Primary indexing name — required.">
        <TextInput
          value={titleRomaji}
          onChange={setTitleRomaji}
          placeholder="e.g. Shingeki no Kyojin"
          required
        />
      </Field>

      {/* ── Title English */}
      <Field label="Title (English)" hint="English localized title.">
        <TextInput
          value={titleEnglish}
          onChange={setTitleEnglish}
          placeholder="e.g. Attack on Titan"
        />
      </Field>

      {/* ── Title Japanese */}
      <Field label="Title (Japanese)" hint="Original Japanese title.">
        <TextInput
          value={titleJapanese}
          onChange={setTitleJapanese}
          placeholder="e.g. 進撃の巨人"
        />
      </Field>

      {/* ── Description */}
      <Field label="Description" hint="Short plot summary.">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter anime plot synopsis…"
          rows={4}
          className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-purple-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none resize-none transition-colors"
        />
      </Field>

      {/* ── Status */}
      <Field label="Status" hint="Current airing status.">
        <SelectInput
          value={status}
          onChange={(v) => setStatus(v as AnimeStatus)}
          options={[
            { label: 'Upcoming', value: 'Upcoming' },
            { label: 'Airing', value: 'Airing' },
            { label: 'Finished', value: 'Finished' },
          ]}
        />
      </Field>

      {/* ── Air Date */}
      <Field label="Air Date" hint='e.g. "1st April 2025" or "2025-04-01"'>
        <TextInput value={airDate} onChange={setAirDate} placeholder="Air date" />
      </Field>

      {/* ── End Date (series only) */}
      {!isMovie && (
        <Field label="End Date" hint="Leave blank if still airing.">
          <TextInput value={endDate} onChange={setEndDate} placeholder="End date" />
        </Field>
      )}

      {/* ── Episodes Count (series only) */}
      {!isMovie && (
        <Field label="Episodes Count" hint="Total planned episodes.">
          <input
            type="number"
            min={1}
            value={episodesCount}
            onChange={(e) => setEpisodesCount(e.target.value)}
            placeholder="e.g. 24"
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-purple-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </Field>
      )}

      {/* ── Thumbnail (uploaded to Cloudinary) */}
      <ImageUploadField
        label="Thumbnail / Poster"
        hint="Recommended 3:4 ratio. Uploaded to Cloudinary."
        onUploaded={setImageUrl}
      />

      {/* ── Movie Video URL */}
      {isMovie && (
        <Field
          label="Video URL"
          hint="Paste a Cloudinary video URL or any direct video link."
        >
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-slate-500 shrink-0" />
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://res.cloudinary.com/dwkjorv82/video/upload/…"
              className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-purple-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
            />
          </div>
        </Field>
      )}

      {/* ── Error */}
      {error && (
        <div className="flex items-center gap-2 text-xs font-mono text-red-400 border border-red-500/20 bg-red-500/5 px-3 py-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* ── Submit */}
      <div className="flex items-center justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#7c3aed] text-white hover:bg-[#8b5cf6] font-bold text-xs uppercase py-2.5 px-8 transition-all duration-300 border border-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.35)] hover:shadow-[0_0_20px_rgba(168,85,247,0.55)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-none font-mono flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              {isMovie ? 'Adding Movie…' : 'Adding Series…'}
            </>
          ) : (
            <>
              {isMovie ? <Film className="w-3.5 h-3.5" /> : <Tv2 className="w-3.5 h-3.5" />}
              Add Anime
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────
export default function AnimeForm() {
  const [step, setStep] = useState<Step>('select-type');
  const [selectedType, setSelectedType] = useState<AnimeType | null>(null);

  const handleTypeSelect = (type: AnimeType) => {
    setSelectedType(type);
    setStep('form');
  };

  return (
    <div>
      {step === 'select-type' && <TypeSelector onSelect={handleTypeSelect} />}

      {step === 'form' && selectedType && (
        <AnimeMetaForm
          animeType={selectedType}
          onBack={() => setStep('select-type')}
        />
      )}
    </div>
  );
}
