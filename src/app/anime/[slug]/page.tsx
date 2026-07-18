'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { useAnimeStore, AnimeItem } from '@/store/animeStore';
import clsx from 'clsx';

// ─── Dummy / fallback values ──────────────────────────────────────────────────
// Agar DB me koi field null ho to yahan se value aayegi
const DUMMY: Partial<AnimeItem> & {
  descriptionFallback: string;
  typeFallback: string;
  statusFallback: string;
} = {
  image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&q=80',
  descriptionFallback: 'No description available yet.',
  typeFallback: 'Unknown',
  statusFallback: 'Unknown',
};

// ─── Small helper ─────────────────────────────────────────────────────────────
function orDummy<T>(value: T | null | undefined, fallback: T): T {
  return value !== null && value !== undefined ? value : fallback;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default function AnimeDetailsPage({ params }: Props) {
  const router = useRouter();

  // params se slug
  const [animeId, setAnimeId] = React.useState<string>('');

  React.useEffect(() => {
    params.then((p) => setAnimeId(p.slug));
  }, [params]);

  // Store se data + fetch action
  const fetchAnimes = useAnimeStore((s) => s.fetchAnimes);
  const isLoading = useAnimeStore((s) => s.isLoading);
  const hasFetched = useAnimeStore((s) => s.hasFetched);
  const getAnimeById = useAnimeStore((s) => s.getAnimeById);

  // Agar store abhi tak populated nahi to yahan bhi fetch karo
  // (user seedha URL pe aaya ho)
  useEffect(() => {
    if (!hasFetched) {
      fetchAnimes();
    }
  }, [hasFetched, fetchAnimes]);

  // Ek baar fetch ho jaye aur animeId mil jaye to match karo
  useEffect(() => {
    if (!hasFetched || !animeId) return;

    const found = getAnimeById(animeId);
    if (!found) {
      // Wrong / non-existent ID → homepage pe wapas
      router.replace('/');
    }
  }, [hasFetched, animeId, getAnimeById, router]);

  // ─── Rendering state ────────────────────────────────────────────────────────
  if (!animeId || isLoading || !hasFetched) {
    return <LoadingSkeleton />;
  }

  const anime = getAnimeById(animeId);

  // Agar anime nahi mila to bhi kuch mat dikhao (redirect fire ho rahi hai)
  if (!anime) return null;

  // ─── Field values (with fallbacks) ─────────────────────────────────────────
  const title = orDummy(anime.title, 'Untitled Anime');
  const description = orDummy(anime.description, DUMMY.descriptionFallback);
  const type = orDummy(anime.type, DUMMY.typeFallback!);
  const status = orDummy(anime.status, DUMMY.statusFallback!);
  const posterImage = orDummy(anime.image, DUMMY.image!);

  return (
    <article className="flex min-h-screen bg-[#d1d5db] my-2 font-sans text-[#1f2937]">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-4">

          {/* Poster */}
          <div className="bg-white border border-[#a1a1aa] aspect-3/4 shadow-sm overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info box */}
          <p className='px-5 py-1 bg-[#bdbfc3] -mb-5 w-fit'>Info</p>
          <div className="p-2 bg-[#bdbfc3]">
            <div className='flex item-center *:text-xs space-y-1'>
              <span className='inline-block bg-[#34394d] text-[#ddd] px-3 py-2 w-2/5'>Main Title</span>
              <span className='inline-block bg-[#cfd1d4] px-2 py-2 w-3/5'>{title}</span>
            </div>
            <div className='flex item-center *:text-xs space-y-1'>
              <span className='inline-block bg-[#34394d] text-[#ddd] px-3 py-2 w-2/5'>Type</span>
              <span className='inline-block px-2 py-2 w-3/5'>{type}</span>
            </div>
            <div className='flex item-center *:text-xs space-y-1'>
              <span className='inline-block bg-[#34394d] text-[#ddd] px-3 py-2 w-2/5'>Status</span>
              <span className='inline-block bg-[#cfd1d4] px-2 py-2 w-3/5'>{title}</span>
            </div>
            <div className='flex item-center *:text-xs space-y-1'>
              <span className='inline-block bg-[#34394d] text-[#ddd] px-3 py-2 w-2/5'>Release Date</span>
              <span className='inline-block px-2 py-2 w-3/5'>{title}</span>
            </div>
            <div className='flex item-center *:text-xs space-y-1'>
              <span className='inline-block bg-[#34394d] text-[#ddd] px-3 py-2 w-2/5'>Episodes</span>
              <span className='inline-block bg-[#cfd1d4] px-2 py-2 w-3/5'>{title}</span>
            </div>
            <div className='flex item-center *:text-xs space-y-1'>
              <span className='inline-block bg-[#34394d] text-[#ddd] px-3 py-2 w-2/5'>Rating</span>
              <span className='inline-block px-2 py-2 w-3/5'>{title}</span>
            </div>
            <div className='flex item-center *:text-xs space-y-1'>
              <span className='inline-block bg-[#34394d] text-[#ddd] px-3 py-2 w-2/5'>Average</span>
              <span className='inline-block bg-[#cfd1d4] px-2 py-2 w-3/5'>{title}</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col gap-4">

          {/* Description */}
          <div className="bg-[#bdbfc3] border border-[#cbd5e1] p-4 shadow-sm">
            <p className="text-sm leading-relaxed m-0 mb-2.5 text-gray-700">
              {description}
            </p>
            <div className="italic text-xs text-[#64748b]">
              {status === 'Finished' ? 'Series Completed' : `Status: ${status}`}
            </div>
          </div>

          <div className='space-y-5'>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">
              Files 
            </h3>
            <div className="bg-[#bdbfc3] border border-[#cbd5e1] p-3.5 shadow-sm">
              <span className="text-[#64748b] italic text-xs">No tags available yet.</span>
            </div>
          </div>


          {/* Statistics */}
          <div className='space-y-5'>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">
              Statistics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <StatCard label="Views" value={String(anime.viewsCount ?? 0)} />
              <StatCard label="Comments" value={String(anime.popularity ?? 0)} />
              <StatCard label="Likes" value={String(anime.trendingScore ?? 0)} />
            </div>
          </div>

          {/* Discussions placeholder */}
          <div className='space-y-5'>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">
              Newest Discussions
            </h3>
            <div className="bg-[#bdbfc3] border border-[#cbd5e1] p-3.5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 text-sm">
                <div className="flex items-center gap-1.5 font-medium text-gray-800">
                  <MessageSquare size={15} className="text-blue-600" />
                  <span className="text-[#64748b] italic text-xs">No discussions yet.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags placeholder */}
          <div className='space-y-5'>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">
              Tags
            </h3>
            <div className="bg-[#bdbfc3] border border-[#cbd5e1] p-3.5 shadow-sm">
              <span className="text-[#64748b] italic text-xs">No tags available yet.</span>
            </div>
          </div>

          {/* Cast placeholder */}
          <div className='space-y-5'>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">
              Cast
            </h3>
            <div className="bg-[#bdbfc3] border border-[#cbd5e1] p-3.5 shadow-sm">
              <span className="text-[#64748b] italic text-xs">Cast information coming soon.</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

const StatCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="bg-[#bdbfc3] border border-[#cbd5e1] p-3.5 text-center shadow-xs">
      <span className="block text-[11px] font-bold text-[#475569] uppercase">{label}</span>
      <span className="text-base font-bold text-[#1e3a8a]">{value}</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex min-h-screen bg-[#d1d5db] m-8 mx-1 font-sans text-[#1f2937] animate-pulse">
      <main className="flex-1 p-5 pt-8">
        <div className="h-10 bg-[#2d3748]/40 rounded-sm mb-6 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5">
          <div className="flex flex-col gap-4">
            <div className="aspect-[3/4] bg-gray-400 rounded-sm" />
            <div className="h-40 bg-gray-300 rounded-sm" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-24 bg-gray-300 rounded-sm" />
            <div className="h-20 bg-gray-300 rounded-sm" />
          </div>
        </div>
      </main>
    </div>
  );
}