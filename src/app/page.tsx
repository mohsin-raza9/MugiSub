'use client';

import { useState, useEffect, Fragment } from "react";
import AuthBox from "@/components/AuthBox";
import LoginAndRegister from "@/components/Intro-login-register";
import Link from "next/link";
import News from "@/components/News";
import CurrentSeasonList from "@/components/CurrentSeasonList";
import AnimeColumnList from "@/components/AnimeColumnList";
import { useAnimeStore } from "@/store/animeStore";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const fetchAnimes = useAnimeStore((s) => s.fetchAnimes);

  // Homepage pe aate hi store populate ho jaye
  useEffect(() => {
    fetchAnimes();
  }, [fetchAnimes]);


  if (showAuth) {
    return (
      <div className="w-full min-h-screen p-4">
        <button
          type="button"
          onClick={() => setShowAuth(false)}
          className="mb-4 inline-flex items-center bg-[#cfd1d4] border border-[#999999] border-b-[#cfd1d4] px-3 py-1 text-[11px] text-[#1a2536] px-4 py-2 font-medium shadow-sm"
        >
          ← Back
        </button>
        <AuthBox />
      </div>
    );
  }

  return (
    <Fragment>

      <article className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
        <News />
        <LoginAndRegister isInfo={true} />
      </article>

      <CurrentSeasonList />

      {/* 5. 4-Column Horizontal List Section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        <AnimeColumnList category="current-popular" title="Current Popular Anime" />
        <AnimeColumnList category="latest" title="Latest Anime" />
        <AnimeColumnList category="popular" title="Popular Anime" />
        <AnimeColumnList category="trending" title="Trending Anime" />
      </div>

    </Fragment >
  );
}
