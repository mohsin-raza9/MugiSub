'use client';

import { useState } from "react";
import AuthBox from "@/components/AuthBox";
import LoginAndRegister from "@/components/Intro-login-register";
import Link from "next/link";
import News from "@/components/News";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const currentSeasonAnime = [
    {
      title: "Chuldong! Super Wings 10",
      date: "2nd March",
      type: "TV Series",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&q=80",
    },
    {
      title: "Eiga Entotsu Machi no Poupelle: Yakusoku no Tokeidai",
      date: "27th March",
      type: "Movie, 1 ep",
      studio: "Studio 4C",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&q=80",
    },
    {
      title: "Daikenja Riddle no Jikan Gyakkou",
      date: "1st April",
      type: "TV Series",
      rating: "2.43",
      ratingCount: "11",
      average: "3.59",
      averageCount: "11",
      tag: "short episodes",
      image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=300&q=80",
    },
    {
      title: "Ingoku Danchi",
      date: "6th April",
      type: "TV Series, 12 eps",
      studio: "Elias",
      rating: "1.87",
      ratingCount: "18",
      average: "4.27",
      averageCount: "18",
      tag: "short episodes",
      image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=300&q=80",
    },
    {
      title: "Marriage Toxin",
      date: "7th April",
      type: "TV Series",
      studio: "Bones Film",
      rating: "5.51",
      ratingCount: "44",
      average: "6.27",
      averageCount: "46",
      tag: "trap",
      image: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=300&q=80",
    },
    {
      title: "Re:Zero kara Hajimeru Isekai Seikatsu (2026)",
      date: "8th April",
      type: "TV Series, 19 eps",
      studio: "White Fox",
      rating: "7.92",
      ratingCount: "38",
      average: "7.69",
      averageCount: "38",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=300&q=80",
    },
  ];

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

  const currentPopularAnime = [
    {
      id: "1",
      title: "Tongari Boushi no Atelier",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&q=80",
      type: "TV Series",
      year: "2026",
      episodes: "13 eps",
      rating: "8.07",
      ratingCount: "99",
      average: "7.79",
      averageCount: "103",
      tags: ["coming of age", "fantasy", "high fantasy", "magic", "manga", "seinen"]
    },
    {
      id: "2",
      title: "Re:Zero kara Hajimeru Isekai Seikatsu (2026)",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&q=80",
      type: "TV Series",
      year: "",
      episodes: "19 eps",
      rating: "7.92",
      ratingCount: "38",
      average: "7.69",
      averageCount: "38",
      tags: []
    },
    {
      id: "3",
      title: "Tensei Shitara Slime Datta Ken (2026)",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=150&q=80",
      type: "TV Series",
      year: "",
      episodes: "",
      rating: "6.49",
      ratingCount: "46",
      average: "7.00",
      averageCount: "47",
      tags: ["fantasy", "isekai", "novel", "shounen"]
    },
    {
      id: "4",
      title: "Yomi no Tsugai",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=150&q=80",
      type: "TV Series",
      year: "",
      episodes: "24 eps",
      rating: "7.68",
      ratingCount: "72",
      average: "7.68",
      averageCount: "76",
      tags: []
    },
    {
      id: "5",
      title: "Boku no Hero Academia: More",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=150&q=80",
      type: "TV Special",
      year: "2026",
      episodes: "1 ep",
      rating: "5.28",
      ratingCount: "57",
      average: "6.48",
      averageCount: "58",
      tags: []
    }
  ];

  const latestAnime = [
    {
      id: "1",
      title: "Kidou Keisatsu Patlabor EZY",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=150&q=80",
      type: "Movie",
      year: "2026-2027",
      episodes: "3 eps",
      rating: "N/A",
      ratingCount: "1",
      tags: []
    },
    {
      id: "2",
      title: "Quanzhi Fashi VII",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&q=80",
      type: "Web",
      year: "",
      episodes: "12 eps",
      tags: []
    },
    {
      id: "3",
      title: "Xing Chen Bian Di Qi Ji",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&q=80",
      type: "Web",
      year: "",
      episodes: "12 eps",
      tags: []
    },
    {
      id: "4",
      title: "Fei Ren Zai Di San Ji part 2",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=150&q=80",
      type: "Web",
      year: "",
      episodes: "12 eps",
      tags: []
    },
    {
      id: "5",
      title: "Panlong",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=150&q=80",
      type: "Web",
      year: "",
      episodes: "20 eps",
      tags: []
    }
  ];

  const popularAnime = [
    {
      id: "1",
      title: "Sword Art Online: Unanswered//Butterfly",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=150&q=80",
      type: "Movie",
      year: "2026",
      episodes: "1 ep",
      tags: ["action", "fantasy", "novel", "seinen", "virtual world"]
    },
    {
      id: "2",
      title: "Love Live! Hasu no Sora Jogakuin School Idol Club: Bloom Garden Party",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=150&q=80",
      type: "Movie",
      year: "2026",
      episodes: "1 ep",
      rating: "N/A",
      ratingCount: "2",
      average: "N/A",
      averageCount: "2",
      tags: []
    },
    {
      id: "3",
      title: "Gekijouban Mahouka Koukou no Rettousei: Yotsuba Keishou Hen",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&q=80",
      type: "Movie",
      year: "2026",
      episodes: "1 ep",
      tags: ["fantasy", "magic", "novel", "science fiction", "seinen"]
    },
    {
      id: "4",
      title: "Xuan Jie Zhi Men",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&q=80",
      type: "Web",
      year: "2025-2026",
      episodes: "26 eps",
      rating: "N/A",
      ratingCount: "4",
      average: "N/A",
      averageCount: "4",
      tags: []
    },
    {
      id: "5",
      title: "Boku no Hero Academia: More",
      titleHref: "#",
      image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=150&q=80",
      type: "TV Special",
      year: "2026",
      episodes: "1 ep",
      rating: "5.28",
      ratingCount: "57",
      average: "6.48",
      averageCount: "58",
      tags: []
    }
  ];

  const trendingAnime = [
    {
      id: "1",
      likedTitle: "Ramen Daisuki Koizumi-san",
      likedHref: "#",
      likedImage: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=150&q=80",
      similarTitle: "Wakako-zake",
      similarHref: "#",
      similarImage: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=150&q=80"
    },
    {
      id: "2",
      likedTitle: "Oda Nobuna no Yabou",
      likedHref: "#",
      likedImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=150&q=80",
      similarTitle: "Sengoku Otome: Momoiro Paradox",
      similarHref: "#",
      similarImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&q=80"
    },
    {
      id: "3",
      likedTitle: "Hotori: Tada Saiwai o Koinegau.",
      likedHref: "#",
      likedImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&q=80",
      similarTitle: "Eve no Jikan Gekijouban",
      similarHref: "#",
      similarImage: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=150&q=80"
    },
    {
      id: "4",
      likedTitle: "Sidonia no Kishi",
      likedHref: "#",
      likedImage: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=150&q=80",
      similarTitle: "Muv-Luv Alternative: Total Eclipse",
      similarHref: "#",
      similarImage: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=150&q=80"
    },
    {
      id: "5",
      likedTitle: "A Channel The Animation",
      likedHref: "#",
      likedImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=150&q=80",
      similarTitle: "Ichigo Marshmallow",
      similarHref: "#",
      similarImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&q=80"
    }
  ];

  if (showAuth) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa] p-4">
        <button
          type="button"
          onClick={() => setShowAuth(false)}
          className="mb-4 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          ← Back
        </button>
        <AuthBox />
      </div>
    );
  }

  return (
    <div className="w-full pt-2">
      {/* Tabs Navigation Header */}
      <div className="flex justify-end mr-2 gap-1">
        <Link
          href="/"
          className="bg-[#cfd1d4] border border-[#999999] border-b-[#cfd1d4] px-3 py-1 text-[11px] text-[#1a2536] mb-[-1px] z-10"
        >
          main
        </Link>
        <Link
          href="/forum"
          className="bg-[#34394d] border border-[#999999] border-b-0 px-3 py-1 text-[11px] text-white hover:underline ml-[2px]"
        >
          forum
        </Link>
        <button
          type="button"
          onClick={() => setShowAuth(true)}
          className="bg-[#34394d] border border-[#999999] border-b-0 px-3 py-1 text-[11px] text-white hover:underline ml-[2px]"
        >
          outbox
        </button>
      </div>

      <div className="w-auto p-4 ml-2 bg-[#cfd1d4] text-[#1a2536] font-sans flex flex-col gap-2 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">

        {/* 1. Deep charcoal/navy-blue banner bar */}
        <div className="bg-[#34394d] text-[#ddd] p-3 py-1.5 border border-[#1c2331] font-bold text-[15px] uppercase tracking-wide shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
          Main
        </div>

        <section className="grid grid-cols-2 gap-2 h-full">
          <News />
          <LoginAndRegister isInfo={true} />
        </section>

        {/* 3. Current Season Section */}
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
              {currentSeasonAnime.map((anime, index) => (
                <div
                  key={index}
                  className="bg-[#bdbfc3] border border-[#b0b7c0] p-2 flex flex-col justify-between font-sans shadow-sm"
                >
                  <div className="flex flex-col gap-1.5">
                    {/* sharp poster frame */}
                    <div className="w-full aspect-[3/4] overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={anime.image}
                        alt={anime.title}
                        className="w-full h-full object-cover animate-fade-in"
                      />
                    </div>

                    {/* Title & Info icon */}
                    <div className="text-[13px] leading-snug">
                      <span className="inline-flex items-center justify-center bg-[#1f5da1] text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 shrink-0 select-none mr-1 align-middle">i</span>
                      <a href="#" className="text-[#a11f1f] font-bold hover:underline align-middle">
                        {anime.title}
                      </a>
                    </div>
                  </div>

                  {/* Metadata & rating block */}
                  <div className="text-[10px] text-black">
                    <div>
                      <span className="font-bold text-black text-[12px]">{anime.date}</span>
                    </div>
                    <div className="text-[11px]">
                      <span>{anime.type}</span>
                    </div>
                    {anime.studio && (
                      <div>
                        <a href="#" className="text-[#1f5da1] text-[12px] hover:underline font-sans">{anime.studio}</a>
                      </div>
                    )}
                    {/* @ts-ignore */}
                    {(anime.rating || anime.average) && (
                      <div className="space-y-0.5 text-black text-[12px]">
                        {/* @ts-ignore */}
                        {anime.rating && <div>Rating: {anime.rating} ({anime.ratingCount})</div>}
                        {/* @ts-ignore */}
                        {anime.average && <div>Average: {anime.average} ({anime.averageCount})</div>}
                      </div>
                    )}
                    {/* @ts-ignore */}
                    {anime.tag && (
                      <div className="pt-1">
                        {/* @ts-ignore */}
                        <a href="#" className="text-[#1f5da1] text-[12px] hover:underline font-semibold font-sans">{anime.tag}</a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
            <div className="mt-1 border border-[#999] bg-[#bdbfc3] p-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] flex-1">
              <table className="w-full border-collapse">
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
            <div className="mt-1 border border-[#999] bg-[#bdbfc3] p-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] flex-1">
              <table className="w-full border-collapse">
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
          {/* Column 1: Current Popular Anime */}
          <section className="flex flex-col font-sans overflow-hidden flex-1">
            {/* Header Strip */}
            <div className="text-black py-1.5 px-2 font-bold text-[12px] flex items-center justify-between border-b border-[#999]">
              <span>Current Popular Anime</span>
              <a
                href="#"
                className="bg-[#3b4259] hover:bg-[#12151f] text-[#ddd] text-[10px] px-2 py-0.5 border border-[#4d5675] flex items-center gap-1 transition-colors font-sans"
              >
                <span>☰ Show More</span>
              </a>
            </div>
            {/* List Container */}
            <div className="mt-1 border border-[#999] bg-[#bdbfc3] p-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] flex-1 flex flex-col gap-1">
              {currentPopularAnime.map((item, idx) => {
                const bgClass = idx % 2 !== 0 ? "bg-[#bdbfc3]" : "bg-[#cfd1d4]";

                return (
                  <div key={item.id} className={`${bgClass} flex gap-2 p-1.5 border-b border-[#999]/30 last:border-b-0`}>
                    {/* Left-aligned poster image */}
                    <div className="w-[50px] h-[70px] shrink-0 border border-[#999]/40 bg-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    {/* Data Container */}
                    <div className="flex flex-col justify-between py-0.5 min-w-0">
                      <div>
                        {/* Title block with square info icon */}
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="bg-[#1f5da1] text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center shrink-0 select-none">i</span>
                          <a href={item.titleHref} className="text-[#a11f1f] font-bold hover:underline text-[11px] truncate">
                            {item.title}
                          </a>
                        </div>
                        {/* Metadata line */}
                        <div className="text-[10px] text-gray-800 font-sans mt-0.5">
                          <span>{item.type}</span>
                          {item.year && <span>, {item.year}</span>}
                          {item.episodes && <span>, {item.episodes}</span>}
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
                          {item.tags.map((tag, tagIdx) => (
                            <span key={tag} className="inline">
                              <a href="#" className="text-[#1f5da1] text-[9.5px] hover:underline font-medium">
                                {tag}
                              </a>
                              {tagIdx < item.tags.length - 1 && <span className="text-[9.5px] text-gray-500">, </span>}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Column 2: Latest Anime */}
          <section className="flex flex-col font-sans overflow-hidden flex-1">
            {/* Header Strip */}
            <div className=" text-black py-1.5 px-2 font-bold text-[12px] flex items-center justify-between border-b border-[#999]">
              <span>Latest Anime</span>
              <a
                href="#"
                className="bg-[#3b4259] hover:bg-[#12151f] text-[#ddd] text-[10px] px-2 py-0.5 border border-[#4d5675] flex items-center gap-1 transition-colors font-sans"
              >
                <span>☰ Show More</span>
              </a>
            </div>
            {/* List Container */}
            <div className="mt-1 border border-[#999] bg-[#bdbfc3] p-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] flex-1 flex flex-col gap-1">
              {latestAnime.map((item, idx) => {
                const bgClass = idx % 2 !== 0 ? "bg-[#bdbfc3]" : "bg-[#cfd1d4]";

                return (
                  <div key={item.id} className={`${bgClass} flex gap-2 p-1.5 border-b border-[#999]/30 last:border-b-0`}>
                    {/* Left-aligned poster image */}
                    <div className="w-[50px] h-[70px] shrink-0 border border-[#999]/40 bg-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    {/* Data Container */}
                    <div className="flex flex-col justify-between py-0.5 min-w-0">
                      <div>
                        {/* Title block with square info icon */}
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="bg-[#1f5da1] text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center shrink-0 select-none">i</span>
                          <a href={item.titleHref} className="text-[#a11f1f] font-bold hover:underline text-[11px] truncate">
                            {item.title}
                          </a>
                        </div>
                        {/* Metadata line */}
                        <div className="text-[10px] text-gray-800 font-sans mt-0.5">
                          <span>{item.type}</span>
                          {item.year && <span>, {item.year}</span>}
                          {item.episodes && <span>, {item.episodes}</span>}
                          {item.rating && (
                            <span className="ml-0.5">
                              , {item.rating} ({item.ratingCount})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Column 3: Popular Anime */}
          <section className="flex flex-col font-sans overflow-hidden flex-1">
            {/* Header Strip */}
            <div className="text-black py-1.5 px-2 font-bold text-[12px] flex items-center justify-between border-b border-[#999]">
              <span>Popular Anime</span>
              <a
                href="#"
                className="bg-[#3b4259] hover:bg-[#12151f] text-[#ddd] text-[10px] px-2 py-0.5 border border-[#4d5675] flex items-center gap-1 transition-colors font-sans"
              >
                <span>☰ Show More</span>
              </a>
            </div>
            {/* List Container */}
            <div className="mt-1 border border-[#999] bg-[#bdbfc3] p-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] flex-1 flex flex-col gap-1">
              {popularAnime.map((item, idx) => {
                const bgClass = idx % 2 !== 0 ? "bg-[#bdbfc3]" : "bg-[#cfd1d4]";

                return (
                  <div key={item.id} className={`${bgClass} flex gap-2 p-1.5 border-b border-[#999]/30 last:border-b-0`}>
                    {/* Left-aligned poster image */}
                    <div className="w-[50px] h-[70px] shrink-0 border border-[#999]/40 bg-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    {/* Data Container */}
                    <div className="flex flex-col justify-between py-0.5 min-w-0">
                      <div>
                        {/* Title block with square info icon */}
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="bg-[#1f5da1] text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center shrink-0 select-none">i</span>
                          <a href={item.titleHref} className="text-[#a11f1f] font-bold hover:underline text-[11px] truncate">
                            {item.title}
                          </a>
                        </div>
                        {/* Metadata line */}
                        <div className="text-[10px] text-gray-800 font-sans mt-0.5">
                          <span>{item.type}</span>
                          {item.year && <span>, {item.year}</span>}
                          {item.episodes && <span>, {item.episodes}</span>}
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
                          {item.tags.map((tag, tagIdx) => (
                            <span key={tag} className="inline">
                              <a href="#" className="text-[#1f5da1] text-[9.5px] hover:underline font-medium">
                                {tag}
                              </a>
                              {tagIdx < item.tags.length - 1 && <span className="text-[9.5px] text-gray-500">, </span>}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Column 4: Trending Anime */}
          <section className="flex flex-col font-sans overflow-hidden flex-1">
            {/* Header Strip */}
            <div className="text-black py-1.5 px-2 font-bold text-[12px] flex items-center justify-between border-b border-[#999]">
              <span>Trending Anime</span>
              <a
                href="#"
                className="bg-[#3b4259] hover:bg-[#12151f] text-[#ddd] text-[10px] px-2 py-0.5 border border-[#4d5675] flex items-center gap-1 transition-colors font-sans"
              >
                <span>☰ Show More</span>
              </a>
            </div>
            {/* List Container */}
            <div className="mt-1 border border-[#999] bg-[#bdbfc3] p-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] flex-1 flex flex-col gap-1">
              {trendingAnime.map((item, idx) => {
                const bgClass = idx % 2 !== 0 ? "bg-[#bdbfc3]" : "bg-[#cfd1d4]";

                return (
                  <div key={item.id} className={`${bgClass} flex justify-between items-center gap-2 p-1.5 border-b border-[#999]/30 last:border-b-0`}>
                    {/* Left side: Liked poster image */}
                    <div className="w-[50px] h-[70px] shrink-0 border border-[#999]/40 bg-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.likedImage} alt={item.likedTitle} className="w-full h-full object-cover" />
                    </div>
                    {/* Middle: Text description */}
                    <div className="flex-1 text-[11px] text-gray-900 leading-normal font-sans py-1">
                      <span>If you liked </span>
                      <a href={item.likedHref || "#"} className="text-[#a11f1f] font-bold hover:underline">
                        {item.likedTitle}
                      </a>
                      <span> you might like </span>
                      <a href={item.similarHref || "#"} className="text-[#a11f1f] font-bold hover:underline">
                        {item.similarTitle}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

      </div>

      {/* Footer component */}
      <footer className="w-full px-6 py-4  flex justify-between items-center text-[11px] text-black font-sans border-t border-[#999]/30">
        {/* Left side empty spacer */}
        <div className="flex-1" />

        {/* Center side: Multi-line Metadata */}
        <div className="flex-[2] flex flex-col items-center text-center space-y-0.5">
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
          <div className="w-full text-center pr-[12%] text-gray-800 font-sans">
            design by deridiot
          </div>
        </div>

        {/* Right side: Social Icons Matrix */}
        <div className="flex-1 flex justify-end items-center gap-2 text-[#1f5da1]">
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
