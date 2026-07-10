'use client';

import { useState } from "react";
import AuthBox from "@/components/AuthBox";
import LoginAndRegister from "@/components/Intro-login-register";
import Link from "next/link";
import News from "@/components/News";
import CurrentSeasonList from "@/components/CurrentSeasonList";
import AnimeColumnList from "@/components/AnimeColumnList";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  

  const recentReleases = [
    {
      id: "1",
      animeTitle: "Dr. Stone: Science Future",
      animeHref: "#",
      groupName: "Erai-raws",
      groupHref: "#",
      releases: [
        {
          episodeNumber: "1",
          episodeHref: "#",
          format: "mkv",
          resolution: "unk",
          languages: ["ja", "en"],
          isNew: true,
        },
        {
          episodeNumber: "2",
          episodeHref: "#",
          format: "mkv",
          resolution: "unk",
          languages: ["ja", "en"],
          isNew: true,
        },
      ]
    },
    {
      id: "2",
      animeTitle: "Chao",
      animeHref: "#",
      groupName: "none/unknown",
      groupHref: "#",
      releases: [
        {
          episodeNumber: "1",
          episodeHref: "#",
          format: "mkv",
          resolution: "unk",
          languages: ["ja", "zh", "fr"],
          isNew: true,
        }
      ]
    },
    {
      id: "3",
      animeTitle: "Jidouhanbaiki ni Umarekawatta Ore wa Meikyuu o Samayou 3rd Season",
      animeHref: "#",
      groupName: "Onalrie",
      groupHref: "#",
      releases: [
        {
          episodeNumber: "3",
          episodeHref: "#",
          format: "mkv",
          resolution: "unk",
          languages: ["ja", "en"],
          isNew: true,
        }
      ]
    },
    {
      id: "4",
      animeTitle: "Jungle Taitei (1997)",
      animeHref: "#",
      groupName: "R-Archive",
      groupHref: "#",
      releases: [
        {
          episodeNumber: "1",
          episodeHref: "#",
          format: "mkv",
          resolution: "unk",
          languages: ["ja", "en"],
          isNew: true,
        }
      ]
    },
    {
      id: "5",
      animeTitle: "Tsue to Tsurugi no Wistoria Season 2",
      animeHref: "#",
      groupName: "DRiFTKiNG",
      groupHref: "#",
      releases: [
        {
          episodeNumber: "2",
          episodeHref: "#",
          format: "mkv",
          resolution: "unk",
          languages: ["de", "ja", "en"],
          isNew: true,
        }
      ]
    }
  ];

  const airingSoon = [
    {
      id: "1",
      date: "17.05.2026",
      title: "Bei Jiazu Paoqi, Wo Juexing Jiu Yi Shuxing Dian",
      titleHref: "#",
      episode: "29",
      episodeHref: "#"
    },
    {
      id: "2",
      date: "17.05.2026",
      title: "Cheng He Titong 2",
      titleHref: "#",
      episode: "19",
      episodeHref: "#"
    },
    {
      id: "3",
      date: "17.05.2026",
      title: "Chibi Maruko-chan (1995)",
      titleHref: "#",
      episode: "1530",
      episodeHref: "#"
    },
    {
      id: "4",
      date: "17.05.2026",
      title: "Dia no Ace: Act II Second Season",
      titleHref: "#",
      episode: "7",
      episodeHref: "#"
    },
    {
      id: "5",
      date: "17.05.2026",
      title: "Digimon Beatbreak",
      titleHref: "#",
      episode: "31",
      episodeHref: "#"
    }
  ];

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
    <div className="w-full min-w-0 pt-2 overflow-x-hidden">
      {/* Tabs Navigation Header */}
      <div className="flex justify-end pr-2 gap-1">
        <Link
          href="/"
          className="bg-[#cfd1d4] border border-[#999999] border-b-[#cfd1d4] px-3 py-1 text-[11px] text-[#1a2536] mb-[-1px] z-10"
        >
          Main
        </Link>
        <Link
          href="/forum"
          className="bg-[#34394d] border border-[#999999] border-b-0 px-3 py-1 text-[11px] text-white hover:bg-[#cfd1d4] hover:text-black ml-[2px]"
        >
          Forum
        </Link>
        <button
          type="button"
          onClick={() => setShowAuth(true)}
          className="bg-[#34394d] border border-[#999999] border-b-0 px-3 py-1 text-[11px] text-white hover:bg-[#cfd1d4] hover:text-black ml-[2px]"
        >
          Outbox
        </button>
      </div>

      <div className="w-full min-w-0 p-3 lg:p-4 lg:ml-2 bg-[#cfd1d4] text-[#1a2536] font-sans flex flex-col gap-2 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] overflow-x-hidden">

        {/* 1. Deep charcoal/navy-blue banner bar */}
        <div className="bg-[#34394d] text-[#ddd] p-3 py-1.5 border border-[#1c2331] font-bold text-[15px] uppercase tracking-wide shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
          Main
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
          <News />
          <LoginAndRegister isInfo={true} />
        </section>

        <CurrentSeasonList />

        {/* 4. Split-Column Layout: Recent Releases & Airing Soon */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-4 mt-2">

          {/* Left Column: Recent Releases */}
          <section className="lg:col-span-3 flex flex-col font-sans overflow-hidden">
            {/* Header Strip */}
            <div className="text-black py-1.5 font-bold text-[13px] flex items-center justify-between border-b border-[#999]">
              <span>Recent Releases</span>
              <a
                href="#"
                className="bg-[#34394d] hover:bg-[#12151f] text-[#ccc] text-[10px] px-2 py-0.5 border border-[#3e455c] flex items-center gap-1 transition-colors font-sans"
              >
                <span>☰ Show More</span>
              </a>
            </div>

            {/* Table Container */}
            <div className="mt-1 border border-[#999] bg-[#bdbfc3] p-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] flex-1 overflow-x-auto">
              <table className="w-full border-collapse min-w-[550px] lg:min-w-0">
                <thead>
                  <tr className="bg-[#34394d] text-white text-[11px] font-bold uppercase tracking-wider">
                    <th className="px-2 py-1.5 text-left border-r border-[#1c2331] font-sans font-bold">Anime</th>
                    <th className="px-2 py-1.5 text-left border-r border-[#1c2331] font-sans font-bold">Group</th>
                    <th className="px-2 py-1.5 text-center border-r border-[#1c2331] font-sans font-bold w-[45px]">Ep</th>
                    <th className="px-2 py-1.5 text-left font-sans font-bold">Info</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReleases.map((item, itemIdx) => {
                    const rowspan = item.releases.length;
                    const isOdd = itemIdx % 2 !== 0;
                    const bgClass = isOdd ? "bg-[#bdbfc3]" : "bg-[#cfd1d4]";

                    return item.releases.map((rel, relIdx) => (
                      <tr
                        key={`${item.id}-${relIdx}`}
                        className={`${bgClass} text-[11.5px] border-b border-[#999]/40 hover:bg-white/30 transition-colors`}
                      >
                        {relIdx === 0 && (
                          <>
                            <td
                              rowSpan={rowspan}
                              className="px-2 py-1.5 border-r border-[#999]/30 text-left align-middle"
                            >
                              <div className="flex items-center gap-1">
                                <span className="inline-flex items-center justify-center bg-[#1f5da1] text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 shrink-0 select-none">i</span>
                                <a href={item.animeHref} className="text-[#1f5da1] font-bold hover:underline">
                                  {item.animeTitle}
                                </a>
                              </div>
                            </td>
                            <td
                              rowSpan={rowspan}
                              className="px-2 py-1.5 border-r border-[#999]/30 text-left align-middle"
                            >
                              <a href={item.groupHref} className="text-[#1f5da1] hover:underline">
                                {item.groupName}
                              </a>
                            </td>
                          </>
                        )}
                        <td className="px-2 py-1.5 border-r border-[#999]/30 text-center align-middle font-mono">
                          <a href={rel.episodeHref} className="text-[#1f5da1] hover:underline font-bold">
                            {rel.episodeNumber}
                          </a>
                        </td>
                        <td className="px-2 py-1.5 text-left align-middle flex flex-wrap items-center gap-1">
                          {/* Format Tag */}
                          <span className="bg-[#1f5da1] text-white text-[8.5px] px-1 font-bold">
                            {rel.format}
                          </span>
                          {/* Resolution Tag */}
                          <span className="bg-[#a13b1f] text-white text-[8.5px] px-1 font-bold">
                            {rel.resolution}
                          </span>
                          {/* Language Flags */}
                          {rel.languages.map((lang) => (
                            <span key={lang} className="bg-gray-700 text-[#eee] text-[8px] px-1 font-bold uppercase font-sans">
                              {lang}
                            </span>
                          ))}
                          {/* New Indicator */}
                          {rel.isNew && (
                            <span className="bg-green-700 text-white text-[8px] px-1 font-bold uppercase font-sans">
                              new
                            </span>
                          )}
                        </td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Right Column: Airing Soon */}
          <section className="lg:col-span-2 flex flex-col font-sans overflow-hidden">
            {/* Header Strip */}
            <div className="text-black py-1.5 font-bold text-[13px] flex items-center justify-between border-b border-[#999]">
              <span>Airing Soon</span>
              <a
                href="#"
                className="bg-[#34394d] hover:bg-[#12151f] text-[#ccc] text-[10px] px-2 py-0.5 border border-[#3e455c] flex items-center gap-1 transition-colors font-sans"
              >
                <span>☰ Show More</span>
              </a>
            </div>

            {/* Table Container */}
            <div className="mt-1 border border-[#999] bg-[#bdbfc3] p-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] flex-1 overflow-x-auto">
              <table className="w-full border-collapse min-w-[400px] lg:min-w-0">
                <thead>
                  <tr className="bg-[#34394d] text-white text-[11px] font-bold uppercase tracking-wider">
                    <th className="px-2 py-1.5 text-center border-r border-[#1c2331] font-sans font-bold w-[75px]">Airdate</th>
                    <th className="px-2 py-1.5 text-left border-r border-[#1c2331] font-sans font-bold">Anime</th>
                    <th className="px-2 py-1.5 text-center font-sans font-bold w-[60px]">Episode</th>
                  </tr>
                </thead>
                <tbody>
                  {airingSoon.map((item, idx) => {
                    const isOdd = idx % 2 !== 0;
                    const bgClass = isOdd ? "bg-[#bdbfc3]" : "bg-[#cfd1d4]";

                    return (
                      <tr
                        key={item.id}
                        className={`${bgClass} text-[11.5px] border-b border-[#999]/40 hover:bg-white/30 transition-colors`}
                      >
                        <td className="px-2 py-1.5 border-r border-[#999]/30 text-center font-mono align-middle">
                          {item.date}
                        </td>
                        <td className="px-2 py-1.5 border-r border-[#999]/30 text-left align-middle">
                          <div className="flex items-center gap-1">
                            <span className="inline-flex items-center justify-center bg-[#1f5da1] text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 shrink-0 select-none">i</span>
                            <a href={item.titleHref} className="text-[#1f5da1] font-bold hover:underline">
                              {item.title}
                            </a>
                          </div>
                        </td>
                        <td className="px-2 py-1.5 text-center font-mono align-middle">
                          <a href={item.episodeHref} className="text-[#1f5da1] hover:underline font-bold">
                            {item.episode}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* 5. 4-Column Horizontal List Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          <AnimeColumnList category="current-popular" title="Current Popular Anime" />
          <AnimeColumnList category="latest" title="Latest Anime" />
          <AnimeColumnList category="popular" title="Popular Anime" />
          <AnimeColumnList category="trending" title="Trending Anime" />
        </div>

      </div>

      {/* Footer component */}
      <footer className="w-full px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-black font-sans border-t border-[#999]/30">
        {/* Left side empty spacer */}
        <div className="hidden md:block flex-1" />

        {/* Center side: Multi-line Metadata */}
        <div className="flex-[2] flex flex-col items-center text-center space-y-0.5 w-full">
          <div className="w-full text-center">
            AniDB is licensed under a{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1f5da1] hover:underline"
            >
              Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
            </a>
            .
          </div>
          <div className="w-full text-center text-black">
            v 2022-04, © 2002-2022 by AniDB; all rights reserved. [0s] - 19.05.2026 18:27:47
          </div>
          <div className="w-full text-center pr-0 md:pr-[12%] text-gray-800 font-sans">
            design by deridiot
          </div>
        </div>

        {/* Right side: Social Icons Matrix */}
        <div className="flex-1 flex justify-center md:justify-end items-center gap-2 text-[#1f5da1] w-full">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            title="Facebook"
          >
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
            </svg>
          </a>
          <span className="text-[#1f5da1]/40 font-light select-none">|</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            title="Instagram"
          >
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <span className="text-[#1f5da1]/40 font-light select-none">|</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current">
              <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
            </svg>
          </a>
          <span className="text-[#1f5da1]/40 font-light select-none">|</span>
          <a
            href="https://twitter.com/AniDBStatus"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            title="X (Twitter)"
          >
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <span className="text-[#1f5da1]/40 font-light select-none">|</span>
          <a
            href="https://www.patreon.com/AniDB"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            title="Patreon"
          >
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current">
              <path d="M0 .05h4.26v23.9H0zm14.73.05a9.14 9.14 0 00-9.14 9.14A9.14 9.14 0 0014.73 19a9.14 9.14 0 009.14-9.14A9.14 9.14 0 0014.73.05z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
