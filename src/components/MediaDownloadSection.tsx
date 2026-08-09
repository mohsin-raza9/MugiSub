'use client';

import { useState } from 'react';
import {
  Download,
  Film,
  ArrowDownToLine,
} from 'lucide-react';

// ─── TypeScript Interfaces ────────────────────────────────────────────────────
export interface DownloadFile {
  id: string;
  format: string;       
  fileUrl: string;
  subtitleLang?: string;   
}

/** Movie: single title with one or more file variants */
export interface MovieData {
  title: string;
  year?: number;
  duration?: string;        // "2h 4min"
  files: DownloadFile[];
  downloadsCount?: number;
}

/** Episode within a drama or season */
export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  airingDate?: string;
  files: DownloadFile[];
  downloadsCount?: number;
}

/** Season containing episodes */
export interface SeasonData {
  id: string;
  number: number;
  title?: string | null;
  episodes: Episode[];
}

/** Discriminated union for all content types */
export type MediaDownloadProps =
  | {
      contentType: 'movie';
      data: MovieData;
    }
  | {
      contentType: 'drama';
      episodes: Episode[];
    }
  | {
      contentType: 'series';
      seasons: SeasonData[];
    };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDownloads(count: number): string {
  if (count >= 10_000) return `${(count / 1000).toFixed(0)}k+`;
  if (count >= 1_000) return `${(count / 1000).toFixed(1)}k`;
  return count.toLocaleString();
}

const DEFAULT_DOWNLOADS = 1_248;

// ─── Download Button ──────────────────────────────────────────────────────────
function DownloadButton({
  href,
  label = 'Download',
  variant = 'default',
  onClick,
}: {
  href: string;
  label?: string;
  variant?: 'default' | 'primary' | 'compact';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  if (variant === 'primary') {
    return (
      <a
        href={href}
        download
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="
          inline-flex items-center justify-center gap-2 px-6 py-2.5
          bg-linear-to-r from-[#2c3e6b] to-[#34394d]
          hover:from-[#3b5998] hover:to-[#475569]
          text-white text-xs font-bold uppercase tracking-wider
          transition-all duration-200 rounded-sm
          shadow-md hover:shadow-lg hover:-translate-y-px
          active:translate-y-0 active:shadow-sm
        "
      >
        <Download size={15} className="shrink-0" />
        <span>{label}</span>
      </a>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href={href}
        download
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="
          inline-flex items-center gap-1 px-2.5 py-1
          bg-[#34394d] hover:bg-[#2c3e6b]
          text-white text-[9px] font-bold font-mono uppercase tracking-wider
          transition-all duration-150 rounded-sm
          hover:shadow-md active:scale-[0.97]
          shrink-0
        "
      >
        <Download size={10} />
        <span>DL</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      download
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="
        inline-flex items-center gap-1.5 px-3.5 py-1.5
        bg-[#34394d] hover:bg-[#2c3e6b]
        text-white text-[10px] font-bold uppercase tracking-wider
        transition-all duration-150 rounded-sm
        hover:shadow-md active:scale-[0.98]
        shrink-0
      "
    >
      <Download size={12} className="shrink-0" />
      <span>{label}</span>
    </a>
  );
}

// ─── Downloads Counter Tag ────────────────────────────────────────────────────
function DownloadsTag({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[9px] text-[#64748b] font-mono">
      <ArrowDownToLine size={9} className="opacity-60" />
      {formatDownloads(count)} downloads
    </span>
  );
}

// ─── File Row (for multi-file movies or inline file listings) ─────────────────
function FileRow({
  file,
  onDownloadClick,
}: {
  file: DownloadFile;
  onDownloadClick?: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 py-2 px-3 bg-[#c8cbd0] hover:bg-[#bfc2c8] transition-colors group border-b border-[#b0b3b8] last:border-b-0">
      {/* Format Badge */}
      <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 bg-[#475569] text-[#e2e8f0] rounded-sm tracking-wider shrink-0">
        {file.format}
      </span>
      {file.subtitleLang && (
        <span className="hidden sm:inline text-[8px] text-[#64748b] font-mono truncate">
          💬 {file.subtitleLang}
        </span>
      )}

      {/* Spacer */}
      <span className="flex-1" />

      {/* Download */}
      <DownloadButton
        href={`/api/subtitles/download?subtitleId=${file.id}`}
        variant="compact"
        onClick={() => onDownloadClick?.(file.id)}
      />
    </div>
  );
}

// ─── Movie Layout ─────────────────────────────────────────────────────────────
function MovieLayout({
  data,
  onDownloadClick,
  downloadsState,
}: {
  data: MovieData;
  onDownloadClick?: (id: string) => void;
  downloadsState: Record<string, number>;
}) {
  if (data.files.length === 0) {
    return (
      <div className="bg-[#bdbfc3] border border-[#cbd5e1] p-3.5 shadow-sm">
        <span className="text-[#64748b] italic text-xs">
          No files available yet.
        </span>
      </div>
    );
  }

  if (data.files.length === 1) {
    const file = data.files[0];
    const downloadsCount = downloadsState[file.id] ?? data.downloadsCount ?? DEFAULT_DOWNLOADS;
    return (
      <div className="space-y-3">
        {/* Movie Header Card */}
        <div className="bg-[#bdbfc3] px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Film size={15} className="shrink-0" />
            <span className="text-[12px] font-bold truncate flex-1">
              {data.title}
            </span>
            {data.year && (
              <span className="text-[10px] text-[#8b92a8] font-mono shrink-0">
                ({data.year})
              </span>
            )}
          </div>
        </div>

        {/* Download Button + Counter */}
        <div className="flex flex-col items-center gap-2 py-2">
          <DownloadButton
            href={`/api/subtitles/download?subtitleId=${file.id}`}
            label="Download Movie"
            variant="primary"
            onClick={() => onDownloadClick?.(file.id)}
          />
          <DownloadsTag count={downloadsCount} />
        </div>
      </div>
    );
  }

  // Multiple file variants
  const totalDownloads = data.files.reduce(
    (acc, f) => acc + (downloadsState[f.id] ?? data.downloadsCount ?? DEFAULT_DOWNLOADS),
    0
  );

  return (
    <div className="space-y-2">
      {/* Movie Header */}
      <div className="flex items-center gap-2 bg-[#34394d] px-3 py-2.5 shadow-sm">
        <Film size={14} className="text-[#8b92a8] shrink-0" />
        <span className="text-[11px] font-bold text-[#e2e8f0] truncate flex-1">
          {data.title}
          {data.year && <span className="text-[#8b92a8] font-normal ml-1.5">({data.year})</span>}
        </span>
        <span className="text-[8px] font-mono text-[#8b92a8] uppercase shrink-0">
          {data.files.length} variants
        </span>
      </div>

      {/* File Rows */}
      <div className="bg-[#bdbfc3] border border-[#a8abb1] shadow-sm overflow-hidden">
        {data.files.map((file) => (
          <FileRow key={file.id} file={file} onDownloadClick={onDownloadClick} />
        ))}
      </div>

      {/* Downloads Counter */}
      <div className="flex justify-end">
        <DownloadsTag count={totalDownloads} />
      </div>
    </div>
  );
}

// ─── Episode Card (shared by Drama & Series layouts) ──────────────────────────
function EpisodeCard({
  episode,
  onDownloadClick,
  downloadsState,
}: {
  episode: Episode;
  onDownloadClick?: (id: string) => void;
  downloadsState: Record<string, number>;
}) {
  const hasFiles = episode.files.length > 0;
  const file = hasFiles ? episode.files[0] : null;
  const fileUrl = file ? `/api/subtitles/download?subtitleId=${file.id}` : '#';
  const fileId = file ? file.id : '';
  const downloadsCount = fileId
    ? (downloadsState[fileId] ?? episode.downloadsCount ?? 0)
    : 0;

  return (
    <div className="bg-[#bdbfc3] border border-[#a8abb1] shadow-sm overflow-hidden flex items-center justify-between px-4 py-3">
      {/* Left Part: Episode Number + Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className="flex items-center justify-center w-8 h-8 bg-[#34394d] text-[#ddd] text-[11px] font-bold font-mono rounded-sm shrink-0">
          {String(episode.episodeNumber).padStart(2, '0')}
        </span>
        <span className="text-[12px] font-bold text-[#1a2536] truncate">
          {episode.title}
        </span>
      </div>

      {/* Right Part: Download Button + Counter stacked vertically */}
      {hasFiles ? (
        <div className="flex flex-col items-center gap-1 shrink-0">
          <a
            href={fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (fileId) onDownloadClick?.(fileId);
            }}
            className="
              inline-flex items-center justify-center gap-1.5 px-4 py-1.5
              bg-[#34394d] hover:bg-[#2c3e6b]
              text-white text-[10px] font-bold uppercase tracking-wider
              transition-all duration-150 rounded-sm hover:shadow-md active:scale-[0.98]
            "
          >
            <Download size={12} className="shrink-0" />
            <span>Download</span>
          </a>
          <span className="text-[9px] font-mono text-[#64748b]">
            {formatDownloads(downloadsCount)} downloads
          </span>
        </div>
      ) : (
        <span className="text-[10px] font-mono text-[#94a3b8] italic shrink-0">
          Coming soon
        </span>
      )}
    </div>
  );
}

// ─── Drama Layout ─────────────────────────────────────────────────────────────
function DramaLayout({
  episodes,
  onDownloadClick,
  downloadsState,
}: {
  episodes: Episode[];
  onDownloadClick?: (id: string) => void;
  downloadsState: Record<string, number>;
}) {
  if (episodes.length === 0) {
    return (
      <div className="bg-[#bdbfc3] border border-[#cbd5e1] p-3.5 shadow-sm">
        <span className="text-[#64748b] italic text-xs">
          No episode files available yet.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {[...episodes]
        .sort((a, b) => a.episodeNumber - b.episodeNumber)
        .map((ep) => (
          <EpisodeCard
            key={ep.id}
            episode={ep}
            onDownloadClick={onDownloadClick}
            downloadsState={downloadsState}
          />
        ))}
    </div>
  );
}

// ─── Series Layout (Tabbed Seasons) ───────────────────────────────────────────
function SeriesLayout({
  seasons,
  onDownloadClick,
  downloadsState,
}: {
  seasons: SeasonData[];
  onDownloadClick?: (id: string) => void;
  downloadsState: Record<string, number>;
}) {
  const sortedSeasons = [...seasons].sort((a, b) => a.number - b.number);
  const [activeSeason, setActiveSeason] = useState(
    sortedSeasons[0]?.id || ''
  );

  if (sortedSeasons.length === 0) {
    return (
      <div className="bg-[#bdbfc3] border border-[#cbd5e1] p-3.5 shadow-sm">
        <span className="text-[#64748b] italic text-xs">
          No season data available yet.
        </span>
      </div>
    );
  }

  const currentSeason = sortedSeasons.find((s) => s.id === activeSeason);

  return (
    <div className="space-y-2.5">
      {/* Season Tab Bar */}
      <div className="flex items-center overflow-x-auto scrollbar-none -mb-px">
        {sortedSeasons.map((season) => {
          const isActive = activeSeason === season.id;
          return (
            <button
              key={season.id}
              type="button"
              onClick={() => setActiveSeason(season.id)}
              className={`
                px-5 py-2 text-[10px] font-bold font-mono uppercase tracking-wider
                transition-colors duration-150 whitespace-nowrap shrink-0 border-t border-x border-[#a8abb1] -mb-px
                ${isActive
                  ? 'bg-[#bdbfc3] text-[#1a2536] border-b-[#bdbfc3] z-10'
                  : 'bg-[#34394d] text-[#ddd] hover:bg-[#2c3e6b] border-transparent border-b-[#a8abb1] cursor-pointer'
                }
              `}
            >
              {season.title || `Season ${season.number}`}
            </button>
          );
        })}
      </div>

      {/* Episode List for Active Season */}
      {currentSeason && (
        <DramaLayout
          episodes={currentSeason.episodes}
          onDownloadClick={onDownloadClick}
          downloadsState={downloadsState}
        />
      )}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function MediaDownloadSection(props: MediaDownloadProps) {
  const [downloadsState, setDownloadsState] = useState<Record<string, number>>({});

  const handleDownloadClick = async (subtitleId: string) => {
    try {
      const res = await fetch('/api/subtitles/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subtitleId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setDownloadsState((prev) => ({
            ...prev,
            [subtitleId]: data.downloads,
          }));
        }
      }
    } catch (err) {
      console.error('Failed to increment download count:', err);
    }
  };

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">
        Files
      </h3>

      {props.contentType === 'movie' && (
        <MovieLayout
          data={props.data}
          onDownloadClick={handleDownloadClick}
          downloadsState={downloadsState}
        />
      )}
      {props.contentType === 'drama' && (
        <DramaLayout
          episodes={props.episodes}
          onDownloadClick={handleDownloadClick}
          downloadsState={downloadsState}
        />
      )}
      {props.contentType === 'series' && (
        <SeriesLayout
          seasons={props.seasons}
          onDownloadClick={handleDownloadClick}
          downloadsState={downloadsState}
        />
      )}
    </div>
  );
}