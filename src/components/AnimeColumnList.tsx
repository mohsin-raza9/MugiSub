"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface AnimeColumnListProps {
  title: string;
  category: string;
}

export default function AnimeColumnList({ title, category }: AnimeColumnListProps) {
  const [animes, setAnimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const res = await fetch(`/api/anime?category=${category}`);
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
  }, [category]);

  return (
    <section className="flex flex-col font-sans overflow-hidden flex-1">
      {/* Header Strip */}
      <div className="text-black py-1.5 px-2 font-bold text-[12px] flex items-center justify-between border-b border-[#999]">
        <span>{title}</span>
        <a
          href="#"
          className="bg-[#3b4259] hover:bg-[#12151f] text-[#ddd] text-[10px] px-2 py-0.5 border border-[#4d5675] flex items-center gap-1 transition-colors font-sans"
        >
          <span>☰ Show More</span>
        </a>
      </div>
      
      {/* List Container */}
      <div className="mt-1 border border-[#999] bg-[#bdbfc3] p-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] flex-1 flex flex-col gap-1 min-h-[420px]">
        {loading ? (
          // Skeleton Loaders
          Array.from({ length: 5 }).map((_, idx) => {
            const bgClass = idx % 2 !== 0 ? "bg-[#bdbfc3]" : "bg-[#cfd1d4]";
            return (
              <div key={idx} className={`${bgClass} flex gap-2 p-1.5 border-b border-[#999]/30 last:border-b-0 animate-pulse`}>
                <div className="w-[50px] h-[70px] shrink-0 bg-gray-400"></div>
                <div className="flex flex-col py-0.5 w-full gap-2">
                  <div className="h-3 bg-gray-400 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-400 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-400 rounded w-full mt-auto"></div>
                </div>
              </div>
            );
          })
        ) : animes.length > 0 ? (
          animes.map((item, idx) => {
            const bgClass = idx % 2 !== 0 ? "bg-[#bdbfc3]" : "bg-[#cfd1d4]";

            return (
              <div key={item.id} className={`${bgClass} flex gap-2 p-1.5 border-b border-[#999]/30 last:border-b-0`}>
                {/* Left-aligned poster image */}
                <div className="w-[50px] h-[70px] shrink-0 border border-[#999]/40 bg-gray-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image || "https://images.unsplash.com/photo-1541562232579-512a21360020?w=150&q=80"} alt={item.titleRomaji} className="w-full h-full object-cover" />
                </div>
                {/* Data Container */}
                <div className="flex flex-col justify-between py-0.5 min-w-0">
                  <div>
                    {/* Title block with square info icon */}
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="bg-[#1f5da1] text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center shrink-0 select-none">i</span>
                      <Link href={`/anime/${item.id}`} className="text-[#a11f1f] font-bold hover:underline text-[11px] truncate block max-w-full">
                        {item.titleRomaji}
                      </Link>
                    </div>
                    {/* Metadata line */}
                    <div className="text-[10px] text-gray-800 font-sans mt-0.5">
                      <span>{item.type}</span>
                      {item.airDate && <span>, {item.airDate}</span>}
                      {item.episodesCount && <span>, {item.episodesCount} eps</span>}
                      {item.rating && (
                        <span className="ml-0.5">
                          , {item.rating} ({item.ratingCount})
                        </span>
                      )}
                      {item.average && (
                        <span className="ml-0.5">
                          , {item.average} ({item.averageCount})
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-x-1 mt-0.5 text-gray-500">
                      {item.tags.slice(0, 3).map((tagRel: any, tagIdx: number) => (
                        <span key={tagRel.tag.id} className="inline">
                          <a href="#" className="text-[#1f5da1] text-[9.5px] hover:underline font-medium">
                            {tagRel.tag.name}
                          </a>
                          {tagIdx < Math.min(item.tags.length, 3) - 1 && <span className="text-[9.5px] text-gray-500">, </span>}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-700 italic p-4 text-center">
            No data available.
          </div>
        )}
      </div>
    </section>
  );
}
