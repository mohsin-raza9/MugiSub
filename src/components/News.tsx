"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        const json = await res.json();
        if (res.ok && json.data) {
          setNews(json.data);
        } else {
          setNews(null);
        }
      } catch (error) {
        setNews(null);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="w-full font-sans text-[11px] flex flex-col h-full">
      {/* ── Sub-header bar ── */}
      <div className="text-black py-1.5 flex items-center justify-between border-b border-[#999]">
        <h2 className="font-bold text-[15px] m-0">News</h2>
        <a
          href="#"
          className="bg-[#34394d] hover:bg-[#12151f] shadow-[0_1px_2px_0_rgba(0,0,0,0.3)] text-[#ccc] text-[10px] px-2 py-0.5 border border-[#3e455c] flex items-center gap-1 transition-colors font-sans"
        >
          <span>☰ Show Post</span>
        </a>
      </div>
 
      {/* ── Body panel — flex-1 so it fills remaining height like MugiSub ── */}
      <div className="flex-1 mt-1.5 p-4 rounded-sm text-black text-[11px] leading-relaxed space-y-3 border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
        {loading ? (
          <p className="text-center text-gray-600 italic mt-4">Loading news...</p>
        ) : news ? (
          <>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 border-b border-gray-400/40 pb-1.5 mb-2">
              <span className="text-[#a11f1f] text-[12px] font-bold leading-tight">
                {news.title}
              </span>
              <span className="text-[10px] text-gray-700 italic shrink-0">
                posted on {new Date(news.createdAt).toLocaleDateString()} by {news.author?.name || "Unknown"}
              </span>
            </div>
            
            <h3 className="text-[12px] font-bold text-black m-0 font-sans">
              {news.title}
            </h3>
            
            <div className="text-[11px] text-gray-900 font-sans space-y-2 whitespace-pre-wrap">
              {news.content}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 italic mt-4">No news available at the moment.</p>
        )}
      </div>
    </div>
  );
}