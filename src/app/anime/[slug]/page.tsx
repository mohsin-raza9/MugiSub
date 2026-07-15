'use client';

import React, { useState } from 'react';
import { 
  Edit3, Plus, MessageSquare 
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function AnimeDetailsPage({ params }: Props) {
  const [slug, setSlug] = React.useState<string>('');

  React.useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  const animeTitle = slug 
    ? decodeURIComponent(slug).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : "Kimi ga Shinu made Koi o Shitai";

  return (
    <div className="flex min-h-screen bg-[#d1d5db] m-8 mx-1 font-sans text-[#1f2937]">
      
      {/* Main Content - Aur Thoda Neeche Kiya Hai */}
      <main className="flex-1 p-5 pt-8 overflow-y-auto">   {/* ← Increased top padding */}
        
        <div className="bg-[#2d3748] text-white px-4 py-2.5 mb-6 rounded-sm shadow-sm">
          <h2 className="m-0 text-lg font-semibold">Anime: {animeTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5">
                    <div className="flex flex-col gap-4">
           

            <div className="bg-white border border-[#a1a1aa] aspect-[3/4] flex items-center justify-center rounded-sm shadow-sm overflow-hidden group">
              <span className="text-[#71717a] text-sm group-hover:scale-105 transition-transform duration-200">Anime Poster Image</span>
            </div>

            <div className="bg-white border border-[#94a3b8] rounded-sm shadow-sm overflow-hidden">
              <div className="bg-[#e2e8f0] px-3 py-1.5 text-xs font-bold border-b border-[#94a3b8]">Info</div>
              <div className="flex flex-col">
                <div className="flex justify-between px-3 py-2 text-xs border-b border-[#e2e8f0] hover:bg-slate-50">
                  <span className="font-bold text-[#4b5563]">Main Title</span>
                  <span>{animeTitle}</span>
                </div>
                <div className="flex justify-between px-3 py-2 text-xs border-b border-[#e2e8f0] hover:bg-slate-50">
                  <span className="font-bold text-[#4b5563]">Type</span>
                  <span>TV Series</span>
                </div>
                <div className="flex justify-between px-3 py-2 text-xs border-b border-[#e2e8f0] hover:bg-slate-50">
                  <span className="font-bold text-[#4b5563]">Season</span>
                  <span>Summer 2026</span>
                </div>
                <div className="flex justify-between px-3 py-2 text-xs hover:bg-slate-50">
                  <span className="font-bold text-[#4b5563]">Year</span>
                  <span>21.06.2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-4 rounded-sm shadow-sm">
              <p className="text-sm leading-relaxed m-0 mb-2.5 text-gray-700">
                Death lurks behind a mysterious orphanage where children train to become magical weapons of war. 
                Among them is Sheena, who longs to stop the fighting and end the conflict. The mysterious girl turns out to be a secret weapon—an immortal child soldier named Mimi.
              </p>
              <div className="italic text-xs text-[#64748b]">Source: Kodansha</div>
            </div>

            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="bg-[#e2e8f0] border border-[#cbd5e1] p-3.5 text-center rounded-sm shadow-xs">
                <span className="block text-[11px] font-bold text-[#475569] uppercase">Score/Rank By</span>
                <span className="text-base font-bold text-[#1e3a8a]">#9076</span>
              </div>
              <div className="bg-[#e2e8f0] border border-[#cbd5e1] p-3.5 text-center rounded-sm shadow-xs">
                <span className="block text-[11px] font-bold text-[#475569] uppercase">Favourites</span>
                <span className="text-base font-bold text-[#1e3a8a]">#9119</span>
              </div>
              <div className="bg-[#e2e8f0] border border-[#cbd5e1] p-3.5 text-center rounded-sm shadow-xs">
                <span className="block text-[11px] font-bold text-[#475569] uppercase">Running Time</span>
                <span className="text-base font-bold text-[#1e3a8a]">approx. 1h 40m</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">Newest Discussions</h3>
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-3.5 rounded-sm shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 text-sm">
                <div className="flex items-center gap-1.5 font-medium text-gray-800">
                  <MessageSquare size={15} className="text-blue-600" /> Comments
                  <span className="text-[#b91c1c] font-bold ml-1">by dorainam</span>
                </div>
                <div className="text-xs text-[#64748b]">Replies: 3 | Views: 201</div>
              </div>
            </div>

            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">Tags</h3>
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-3.5 rounded-sm shadow-sm">
              <div className="flex gap-2 flex-wrap">
                <span className="bg-[#eff6ff] border border-[#bfdbfe] px-2.5 py-1 rounded-md text-xs font-semibold text-blue-800">shoujo ai</span>
                <span className="bg-[#eff6ff] border border-[#bfdbfe] px-2.5 py-1 rounded-md text-xs font-semibold text-blue-800">magic school</span>
                <span className="bg-[#eff6ff] border border-[#bfdbfe] px-2.5 py-1 rounded-md text-xs font-semibold text-blue-800">fantasy</span>
                <span className="bg-[#eff6ff] border border-[#bfdbfe] px-2.5 py-1 rounded-md text-xs font-semibold text-blue-800">speculative fiction</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">Cast</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white border border-[#cbd5e1] p-3 flex gap-3 items-center rounded-sm shadow-xs hover:border-blue-400 transition-colors">
                <div className="w-10 h-10 bg-[#cbd5e1] rounded-full flex items-center justify-center text-[10px] text-gray-600 shrink-0">Mimi</div>
                <div>
                  <div className="font-bold text-sm text-[#1e40af]">Kagari Mimi</div>
                  <div className="text-[11px] text-[#64748b]">Main Character - Voiced by Hidaka Rina</div>
                </div>
              </div>
              <div className="bg-white border border-[#cbd5e1] p-3 flex gap-3 items-center rounded-sm shadow-xs hover:border-blue-400 transition-colors">
                <div className="w-10 h-10 bg-[#cbd5e1] rounded-full flex items-center justify-center text-[10px] text-gray-600 shrink-0">Sheena</div>
                <div>
                  <div className="font-bold text-sm text-[#1e40af]">Totsuki Sheena</div>
                  <div className="text-[11px] text-[#64748b]">Main Character - Voiced by Takahashi Rie</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}