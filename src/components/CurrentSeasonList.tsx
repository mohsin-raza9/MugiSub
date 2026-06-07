"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CurrentSeasonList() {
  const [animes, setAnimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const res = await fetch('/api/anime?category=current-season');
        const json = await res.json();
        if (res.ok && json.data) {
          setAnimes(json.data);
        } else {
          setAnimes([]);
        }
      } catch (error) {
        setAnimes([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAnime();
  }, []);

  return (
    <section className="w-full flex flex-col font-sans overflow-hidden">
      {/* Section Header Bar */}
      <div className="text-black py-1.5 font-bold text-[13px] flex items-center justify-between border-b border-[#999]">
        <span>Current Season</span>
        <a
          href="#"
          className="bg-[#34394d] hover:bg-[#12151f] text-[#ccc] text-[10px] px-2 py-0.5 border border-[#3e455c] flex items-center gap-1 transition-colors font-sans"
        >
          <span>☰ Show More</span>
        </a>
      </div>

      {/* Dynamic 6-Column Grid Wrapper */}
      <div className="mt-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {loading ? (
            // Skeleton Loaders
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-[#bdbfc3] border border-[#b0b7c0] p-2 flex flex-col shadow-sm animate-pulse"
              >
                <div className="w-full aspect-[3/4] bg-gray-400 mb-2"></div>
                <div className="h-3 bg-gray-400 rounded w-3/4 mb-2"></div>
                <div className="h-2 bg-gray-400 rounded w-1/2 mb-1"></div>
                <div className="h-2 bg-gray-400 rounded w-1/3"></div>
              </div>
            ))
          ) : animes.length > 0 ? (
            animes.map((anime, index) => (
              <div
                key={index}
                className="bg-[#bdbfc3] border border-[#b0b7c0] p-2 flex flex-col justify-between font-sans shadow-sm"
              >
                <div className="flex flex-col gap-1.5">
                  {/* sharp poster frame */}
                  <div className="w-full aspect-[3/4] overflow-hidden relative bg-gray-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={anime.image || "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&q=80"}
                      alt={anime.titleRomaji}
                      className="w-full h-full object-cover animate-fade-in"
                    />
                  </div>

                  {/* Title & Info icon */}
                  <div className="text-[13px] leading-snug">
                    <span className="inline-flex items-center justify-center bg-[#1f5da1] text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 shrink-0 select-none mr-1 align-middle">i</span>
                    <Link href={`/anime/${anime.id}`} className="text-[#a11f1f] font-bold hover:underline align-middle">
                      {anime.titleRomaji}
                    </Link>
                  </div>
                </div>

                {/* Metadata & rating block */}
                <div className="text-[10px] text-black">
                  <div>
                    <span className="font-bold text-black text-[12px]">{anime.airDate || "TBA"}</span>
                  </div>
                  <div className="text-[11px]">
                    <span>{anime.type}</span>
                  </div>
                  {anime.studios && anime.studios.length > 0 && (
                    <div>
                      <a href="#" className="text-[#1f5da1] text-[12px] hover:underline font-sans">{anime.studios[0].studio.name}</a>
                    </div>
                  )}
                  {(anime.rating || anime.average) && (
                    <div className="space-y-0.5 text-black text-[12px]">
                      {anime.rating && <div>Rating: {anime.rating} ({anime.ratingCount})</div>}
                      {anime.average && <div>Average: {anime.average} ({anime.averageCount})</div>}
                    </div>
                  )}
                  {anime.tags && anime.tags.length > 0 && (
                    <div className="pt-1">
                      <a href="#" className="text-[#1f5da1] text-[12px] hover:underline font-semibold font-sans">{anime.tags[0].tag.name}</a>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-6 text-center text-gray-700 italic border border-[#999] bg-[#bdbfc3]">
              No anime found for the current season.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
