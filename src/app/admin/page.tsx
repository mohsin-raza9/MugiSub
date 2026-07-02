'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Menu,
  Search,
  Bell,
  Settings,
  Tv,
  BookOpen,
  Users,
  Zap,
  PlayCircle,
  PlusCircle,
  RefreshCw,
  History,
  Clock,
  Loader2,
  ChevronDown,
  ExternalLink,
  Shield,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  Terminal,
  Activity,
  ArrowRight,
  TrendingUp,
  Sliders,
  Sparkles
} from 'lucide-react';
import UsersTable from '@/components/admin/tables/UsersTable';

// Initial Mock Content
const INITIAL_ANIME = [
  { id: 'AN-992', title: 'Solo Leveling Vol. 2', type: 'TV Series', status: 'SYNCED' },
  { id: 'AN-881', title: 'Bleach: TYBW Part 3', type: 'TV Series', status: 'INDEXING' },
  { id: 'AN-102', title: 'Demon Slayer: Hashira Training Arc', type: 'TV Series', status: 'SYNCED' },
  { id: 'AN-103', title: 'Jujutsu Kaisen Season 2', type: 'TV Series', status: 'SYNCED' }
];

const INITIAL_NOVELS = [
  { id: 'LN-042', title: 'Overlord: The Holy Kingdom', author: 'Kugane Maruyama', status: 'SYNCED' },
  { id: 'LN-011', title: 'Re:Zero Arc 8', author: 'Tappei Nagatsuki', status: 'SYNCED' },
  { id: 'LN-105', title: 'Classroom of the Elite Vol. 11', author: 'Shogo Kinugasa', status: 'SYNCED' }
];

export default function CyberpunkAdminDashboard() {
  // Navigation & Tabs state
  const [activeTab, setActiveTab] = useState<'DATABASE' | 'TERMINAL' | 'USERS' | 'CONTENT'>('DATABASE');
  
  // Data states
  const [animeList, setAnimeList] = useState(INITIAL_ANIME);
  const [novelsList, setNovelsList] = useState(INITIAL_NOVELS);
  const [episodesCount, setEpisodesCount] = useState(412);
  
  // Terminal Logs state (History System)
  const [logs, setLogs] = useState<string[]>([
    "[18:22:01] SYSTEM: MugiSub OS v2.0.4 initialized successfully.",
    "[18:22:05] DB_PROC: Kysely client established connection to Neon PostgreSQL.",
    "[18:22:15] AUTH_REQ: Super Admin session extended for user Tariq Hasan.",
    "[18:22:18] CDN_DIST: Edge nodes synchronized: Tokyo, Frankfurt, London.",
    "[18:22:45] SYNC_EVT: Scraped metadata for Solo Leveling Vol. 2.",
    "[18:23:01] STATUS: System status verified - ALL NODES OPERATIONAL."
  ]);
  
  // Interactive Modals state
  const [isAddAnimeOpen, setIsAddAnimeOpen] = useState(false);
  const [isAddNovelOpen, setIsAddNovelOpen] = useState(false);
  const [isAddEpisodeOpen, setIsAddEpisodeOpen] = useState(false);
  
  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [syncSuccess, setSyncSuccess] = useState(false);

  // Form inputs
  const [animeTitle, setAnimeTitle] = useState('');
  const [animeType, setAnimeType] = useState('TV Series');
  
  const [novelTitle, setNovelTitle] = useState('');
  const [novelAuthor, setNovelAuthor] = useState('');
  
  const [episodeAnime, setEpisodeAnime] = useState('AN-992');
  const [episodeNum, setEpisodeNum] = useState(1);
  const [episodeTitle, setEpisodeTitle] = useState('');

  // Helper to add history log
  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [...prev, `[${time}] ${message}`]);
  };

  // Add Anime handler
  const handleAddAnime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!animeTitle.trim()) return;
    
    const newId = `AN-${Math.floor(100 + Math.random() * 900)}`;
    const newEntry = { id: newId, title: animeTitle, type: animeType, status: 'INDEXING' };
    setAnimeList([newEntry, ...animeList]);
    addLog(`ADMIN: Indexing new Anime - ${animeTitle} (${newId})`);
    
    // Reset & Close
    setAnimeTitle('');
    setIsAddAnimeOpen(false);
  };

  // Add Novel handler
  const handleAddNovel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novelTitle.trim() || !novelAuthor.trim()) return;
    
    const newId = `LN-${Math.floor(100 + Math.random() * 900)}`;
    const newEntry = { id: newId, title: novelTitle, author: novelAuthor, status: 'SYNCED' };
    setNovelsList([newEntry, ...novelsList]);
    addLog(`ADMIN: Synced new Novel - ${novelTitle} by ${novelAuthor} (${newId})`);
    
    // Reset & Close
    setNovelTitle('');
    setNovelAuthor('');
    setIsAddNovelOpen(false);
  };

  // Add Episode handler
  const handleAddEpisode = (e: React.FormEvent) => {
    e.preventDefault();
    
    setEpisodesCount(prev => prev + 1);
    const selectedAnime = animeList.find(a => a.id === episodeAnime);
    addLog(`ADMIN: Uploaded Episode #${episodeNum} for Anime ${selectedAnime?.title || episodeAnime}`);
    
    // Reset & Close
    setEpisodeNum(prev => prev + 1);
    setEpisodeTitle('');
    setIsAddEpisodeOpen(false);
  };

  // Trigger System Sync Flow
  const triggerSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    setSyncSuccess(false);
    setSyncLogs(["Initializing system core diagnostics...", "Verifying DB schemas..."]);
  };

  // Simulate System Sync Progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSyncing) {
      interval = setInterval(() => {
        setSyncProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsSyncing(false);
            setSyncSuccess(true);
            addLog("SYSTEM: Manual system synchronize sequence COMPLETED.");
            return 100;
          }
          const next = prev + Math.floor(Math.random() * 20) + 10;
          const capped = Math.min(next, 100);

          if (capped > 20 && capped <= 50 && syncLogs.length < 3) {
            setSyncLogs(prevLogs => [...prevLogs, "[Neon DB]: Synchronizing cache entries... [OK]"]);
          } else if (capped > 50 && capped <= 80 && syncLogs.length < 4) {
            setSyncLogs(prevLogs => [...prevLogs, "[CDN]: Invalidating outdated route headers... [OK]"]);
          } else if (capped > 80 && capped < 100 && syncLogs.length < 5) {
            setSyncLogs(prevLogs => [...prevLogs, "[SYSTEM]: Verifying metadata hashes... [OK]"]);
          }

          return capped;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isSyncing, syncLogs.length]);

  return (
    <div className="min-h-screen bg-[#0a0f18] text-[#dee2f0] font-sans antialiased pb-16 relative">
      
      {/* Dynamic Style Tags for Cyberpunk theme */}
      <style>{`
        .glass-surface {
          background: rgba(17, 22, 34, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(192, 38, 211, 0.15);
        }
        .neon-purple-glow:hover {
          box-shadow: 0 0 15px rgba(192, 38, 211, 0.4);
        }
        .neon-cyan-glow:hover {
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.4);
        }
        .neon-green-glow:hover {
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
        }
        .terminal-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .terminal-scroll::-webkit-scrollbar-track {
          background: rgba(15, 19, 29, 0.5);
        }
        .terminal-scroll::-webkit-scrollbar-thumb {
          background: #10b981;
        }
      `}</style>

      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      {/* Top Header Navigation Bar */}
      <header className="fixed top-0 w-full z-40 bg-[#0f131d]/60 backdrop-blur-xl border-b border-[#c026d3]/20">
        <nav className="flex justify-between items-center px-8 h-16 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8">
            <span className="font-mono text-xl font-extrabold tracking-tighter text-[#fda9ff]">MUGISUB_ADMIN</span>
            <div className="hidden md:flex gap-6">
              {(['DATABASE', 'TERMINAL', 'USERS', 'CONTENT'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-mono text-xs tracking-wider pb-1 transition-all border-b-2 font-bold cursor-pointer ${
                    activeTab === tab
                      ? 'text-[#fda9ff] border-[#fda9ff]'
                      : 'text-[#d7c0d3] border-transparent hover:text-[#5de6ff]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                <Search className="w-4 h-4 text-[#d7c0d3]" />
              </span>
              <input
                className="bg-[#171c25] border-b border-[#fda9ff]/30 text-[#dee2f0] font-mono text-xs pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-[#5de6ff] transition-all rounded-none"
                placeholder="QUERY_SYSTEM..."
                type="text"
              />
            </div>
            
            <div className="flex gap-4">
              <button className="text-[#d7c0d3] hover:text-[#fda9ff] transition-colors relative cursor-pointer">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-600 rounded-full border border-[#0a0f18] animate-pulse"></span>
              </button>
              <button className="text-[#d7c0d3] hover:text-[#fda9ff] transition-colors cursor-pointer">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            
            {/* Admin Avatar */}
            <div className="h-8 w-8 bg-[#fda9ff]/20 border border-[#fda9ff]/40 flex items-center justify-center overflow-hidden rounded-none shadow-[0_0_8px_rgba(253,169,255,0.3)]">
              <img
                className="w-full h-full object-cover"
                alt="Admin Avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-AbkpzlPZhDIXVHvw8ZAg04AYlbeDDAZy3B_WWW_zC96nXDNdLV5VdLAu1-3fG_Gtdd2phyIhSDiYqozGV0BbbjvE8VnjIQO23EurNHudyfD-dLx6BfM1BiXvFlnt7JPhD60wMPsnhAas4rDNTreNbEkJmAAz5q4CSQ1cSCPVi8s9VyHCEO2_9JzXpICReFeDl5fC_TjjFYjk2GH6E5S_aata9bcdRndFgdIyiw2bVtbt_BEHuajMC66OxNfxyll0MX5EyzHYu3Q"
              />
            </div>
          </div>
        </nav>
      </header>

      {/* Main Container */}
      <main className="pt-24 pb-12 px-8 max-w-[1440px] mx-auto relative z-10">
        
        {/* VIEW 1: DATABASE VIEW (Main Dashboard) */}
        {activeTab === 'DATABASE' && (
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* LEFT SECTION (75% width) */}
            <div className="w-full lg:w-3/4 space-y-6">
              
              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Anime Card */}
                <div className="glass-surface p-6 flex flex-col justify-between h-32 relative overflow-hidden group rounded-none">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs text-[#d7c0d3] uppercase">Total Anime</span>
                    <Tv className="text-[#fda9ff] w-5 h-5" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-white">
                      {animeList.length + 12838}
                    </span>
                    <span className="text-[#4edea3] font-mono text-[10px] font-bold">+4.2%</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#fda9ff]/20">
                    <div className="h-full bg-[#fda9ff] w-2/3 shadow-[0_0_8px_#c026d3]"></div>
                  </div>
                </div>

                {/* Novels Card */}
                <div className="glass-surface p-6 flex flex-col justify-between h-32 relative overflow-hidden group rounded-none">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs text-[#d7c0d3] uppercase">Total Novels</span>
                    <BookOpen className="text-[#5de6ff] w-5 h-5" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-white">
                      {novelsList.length + 8100}
                    </span>
                    <span className="text-[#4edea3] font-mono text-[10px] font-bold">+1.8%</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#5de6ff]/20">
                    <div className="h-full bg-[#5de6ff] w-1/2 shadow-[0_0_8px_#22d3ee]"></div>
                  </div>
                </div>

                {/* Users Card */}
                <div className="glass-surface p-6 flex flex-col justify-between h-32 relative overflow-hidden group rounded-none">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs text-[#d7c0d3] uppercase">Total Users</span>
                    <Users className="text-[#4edea3] w-5 h-5" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-white">245,991</span>
                    <span className="text-[#4edea3] font-mono text-[10px] font-bold">+12.5%</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#4edea3]/20">
                    <div className="h-full bg-[#4edea3] w-4/5 shadow-[0_0_8px_#10b981]"></div>
                  </div>
                </div>

                {/* Releases Card */}
                <div className="glass-surface p-6 flex flex-col justify-between h-32 relative overflow-hidden group rounded-none">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs text-[#d7c0d3] uppercase">Releases</span>
                    <Zap className="text-[#ffb4ab] w-5 h-5 animate-pulse" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-white">{episodesCount}</span>
                    <span className="text-[#ffb4ab] font-mono text-[10px] font-bold">LIVE</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ffb4ab]/20">
                    <div className="h-full bg-[#ffb4ab] w-1/3 shadow-[0_0_8px_#ffb4ab]"></div>
                  </div>
                </div>

              </div>

              {/* Chart Section */}
              <section className="glass-surface p-8 relative min-h-[400px] rounded-none">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                      <span className="w-1.5 h-6 bg-[#5de6ff] block"></span>
                      User Activity & Registrations
                    </h2>
                    <p className="font-mono text-xs text-[#d7c0d3] mt-1">30_DAY_CYCLES_ANALYSIS</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-[#252a34] px-4 py-1 text-xs font-mono border border-[#5de6ff]/30 text-[#5de6ff] rounded-none hover:bg-[#5de6ff]/10 transition-colors">
                      FILTER_MONTH
                    </button>
                    <button className="bg-[#252a34] px-4 py-1 text-xs font-mono border border-slate-700 text-[#d7c0d3] rounded-none hover:bg-white/5 transition-colors">
                      EXPORT_LOG
                    </button>
                  </div>
                </div>

                {/* SVG glowing graph */}
                <div className="w-full h-64 relative flex items-end justify-between px-4">
                  <svg className="w-full h-full absolute inset-0 pointer-events-none overflow-visible">
                    <path
                      d="M 0 180 Q 150 160 300 200 T 600 120 T 900 160 T 1200 60 L 1200 240 L 0 240 Z"
                      fill="url(#cyanChartGrad)"
                      fillOpacity="0.1"
                    />
                    <path
                      className="drop-shadow-[0_0_8px_#22d3ee]"
                      d="M 0 180 Q 150 160 300 200 T 600 120 T 900 160 T 1200 60"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="2.5"
                    />
                    <defs>
                      <linearGradient id="cyanChartGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Grid lines */}
                  <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between opacity-10 pointer-events-none select-none">
                    <div className="border-t border-slate-400 w-full"></div>
                    <div className="border-t border-slate-400 w-full"></div>
                    <div className="border-t border-slate-400 w-full"></div>
                    <div className="border-t border-slate-400 w-full"></div>
                  </div>

                  {/* Chart Axis Markers */}
                  <div className="flex w-full justify-between mt-auto pt-4 border-t border-slate-800">
                    <span className="font-mono text-[9px] text-[#d7c0d3]">JUN_01</span>
                    <span className="font-mono text-[9px] text-[#d7c0d3]">JUN_07</span>
                    <span className="font-mono text-[9px] text-[#d7c0d3]">JUN_14</span>
                    <span className="font-mono text-[9px] text-[#d7c0d3]">JUN_21</span>
                    <span className="font-mono text-[9px] text-[#d7c0d3]">JUN_30</span>
                  </div>
                </div>
              </section>

              {/* Side-by-side Tables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Table 1: Latest Added Content */}
                <div className="glass-surface p-6 rounded-none">
                  <h3 className="font-mono text-xs text-[#fda9ff] font-bold uppercase mb-4 flex items-center justify-between">
                    Latest Added Content
                    <History className="w-4 h-4 text-[#fda9ff]" />
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="text-left border-b border-[#fda9ff]/20">
                          <th className="pb-3 font-mono text-[10px] text-[#d7c0d3] uppercase">Entry_ID</th>
                          <th className="pb-3 font-mono text-[10px] text-[#d7c0d3] uppercase">Title</th>
                          <th className="pb-3 font-mono text-[10px] text-[#d7c0d3] uppercase text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-xs">
                        {animeList.slice(0, 2).map((item) => (
                          <tr key={item.id} className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                            <td className="py-3 text-[#5de6ff]">{item.id}</td>
                            <td className="py-3 text-white">{item.title}</td>
                            <td className="py-3 text-right">
                              <span className="bg-[#4edea3]/10 text-[#4edea3] px-2 py-0.5 border border-[#4edea3]/20 text-[10px] font-bold">
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {novelsList.slice(0, 2).map((item) => (
                          <tr key={item.id} className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                            <td className="py-3 text-[#5de6ff]">{item.id}</td>
                            <td className="py-3 text-white">{item.title}</td>
                            <td className="py-3 text-right">
                              <span className="bg-[#4edea3]/10 text-[#4edea3] px-2 py-0.5 border border-[#4edea3]/20 text-[10px] font-bold">
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 2: Pending Approvals */}
                <div className="glass-surface p-6 rounded-none">
                  <h3 className="font-mono text-xs text-[#5de6ff] font-bold uppercase mb-4 flex items-center justify-between">
                    Pending Approvals
                    <Clock className="w-4 h-4 text-[#5de6ff]" />
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="text-left border-b border-[#5de6ff]/20">
                          <th className="pb-3 font-mono text-[10px] text-[#d7c0d3] uppercase">Type</th>
                          <th className="pb-3 font-mono text-[10px] text-[#d7c0d3] uppercase">Contributor</th>
                          <th className="pb-3 font-mono text-[10px] text-[#d7c0d3] uppercase text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-xs">
                        <tr className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                          <td className="py-3 text-[#5de6ff]">EP_RECAP</td>
                          <td className="py-3 text-white">U_Nightcore</td>
                          <td className="py-3 text-right">
                            <button className="text-[#5de6ff] hover:underline cursor-pointer">REVIEW</button>
                          </td>
                        </tr>
                        <tr className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                          <td className="py-3 text-[#5de6ff]">SUB_FILE</td>
                          <td className="py-3 text-white">Fansub_Prime</td>
                          <td className="py-3 text-right">
                            <button className="text-[#5de6ff] hover:underline cursor-pointer">REVIEW</button>
                          </td>
                        </tr>
                        <tr className="border-b border-slate-800 hover:bg-white/5 transition-colors">
                          <td className="py-3 text-[#5de6ff]">BANNER_ART</td>
                          <td className="py-3 text-white">K_Illustrator</td>
                          <td className="py-3 text-right">
                            <button className="text-[#5de6ff] hover:underline cursor-pointer">REVIEW</button>
                          </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                          <td className="py-3 text-[#5de6ff]">METADATA</td>
                          <td className="py-3 text-white">Bot_Scraper_3</td>
                          <td className="py-3 text-right">
                            <button className="text-[#5de6ff] hover:underline cursor-pointer">REVIEW</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT SIDEBAR SECTION (25% width) */}
            <aside className="w-full lg:w-1/4 space-y-6">
              
              {/* Primary Commands */}
              <div className="glass-surface p-6 rounded-none">
                <h3 className="font-mono text-xs text-[#d7c0d3] font-bold uppercase mb-6 tracking-widest border-b border-slate-800 pb-2">
                  Primary Commands
                </h3>
                <div className="flex flex-col gap-3">
                  
                  {/* Add Anime Command */}
                  <button
                    onClick={() => setIsAddAnimeOpen(true)}
                    className="w-full py-3.5 px-5 bg-[#c026d3] text-white font-mono text-xs font-bold flex items-center justify-between neon-purple-glow transition-all active:scale-95 duration-100 rounded-none cursor-pointer"
                  >
                    ADD_ANIME
                    <PlusCircle className="w-4 h-4" />
                  </button>

                  {/* Add Novel Command */}
                  <button
                    onClick={() => setIsAddNovelOpen(true)}
                    className="w-full py-3.5 px-5 bg-transparent border border-[#22d3ee] text-[#22d3ee] font-mono text-xs font-bold flex items-center justify-between hover:bg-[#22d3ee]/10 neon-cyan-glow transition-all active:scale-95 duration-100 rounded-none cursor-pointer"
                  >
                    ADD_NOVEL
                    <BookOpen className="w-4 h-4" />
                  </button>

                  {/* Add Episode Command */}
                  <button
                    onClick={() => setIsAddEpisodeOpen(true)}
                    className="w-full py-3.5 px-5 bg-transparent border border-slate-700 text-[#dee2f0] font-mono text-xs font-bold flex items-center justify-between hover:bg-white/5 transition-all active:scale-95 duration-100 rounded-none cursor-pointer"
                  >
                    ADD_EPISODE
                    <PlayCircle className="w-4 h-4" />
                  </button>

                  {/* System Sync Command */}
                  <button
                    onClick={triggerSync}
                    className="w-full py-3.5 px-5 bg-[#00845a] text-[#eefff3] font-mono text-xs font-bold flex items-center justify-between neon-green-glow transition-all active:scale-95 duration-100 rounded-none cursor-pointer"
                  >
                    SYSTEM_SYNC
                    <RefreshCw className="w-4 h-4" />
                  </button>

                </div>
              </div>

              {/* Status Cluster Panel */}
              <div className="glass-surface p-6 rounded-none">
                <h3 className="font-mono text-xs text-[#d7c0d3] font-bold uppercase mb-6 tracking-widest border-b border-slate-800 pb-2">
                  Status Cluster
                </h3>
                <div className="space-y-6">
                  
                  {/* Server Load indicator */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[10px] text-white">SERVER_LOAD</span>
                      <span className="font-mono text-[10px] text-[#4edea3]">42%</span>
                    </div>
                    <div className="h-2 w-full bg-[#1b2029] flex gap-1">
                      <div className="h-full bg-[#4edea3] w-1/5"></div>
                      <div className="h-full bg-[#4edea3] w-1/5"></div>
                      <div className="h-full bg-[#4edea3]/30 w-1/5"></div>
                      <div className="h-full bg-[#4edea3]/30 w-1/5"></div>
                      <div className="h-full bg-[#4edea3]/30 w-1/5"></div>
                    </div>
                  </div>

                  {/* Database Latency indicator */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[10px] text-white">DB_LATENCY</span>
                      <span className="font-mono text-[10px] text-[#5de6ff]">24ms</span>
                    </div>
                    <div className="h-2 w-full bg-[#1b2029] flex gap-1">
                      <div className="h-full bg-[#5de6ff] w-1/5"></div>
                      <div className="h-full bg-[#5de6ff]/30 w-1/5"></div>
                      <div className="h-full bg-[#5de6ff]/30 w-1/5"></div>
                      <div className="h-full bg-[#5de6ff]/30 w-1/5"></div>
                      <div className="h-full bg-[#5de6ff]/30 w-1/5"></div>
                    </div>
                  </div>

                  {/* API Uptime indicator */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[10px] text-white">API_UPTIME</span>
                      <span className="font-mono text-[10px] text-[#4edea3]">99.98%</span>
                    </div>
                    <div className="h-2 w-full bg-[#1b2029] flex gap-1">
                      <div className="h-full bg-[#4edea3] w-1/5"></div>
                      <div className="h-full bg-[#4edea3] w-1/5"></div>
                      <div className="h-full bg-[#4edea3] w-1/5"></div>
                      <div className="h-full bg-[#4edea3] w-1/5"></div>
                      <div className="h-full bg-[#4edea3] w-1/5"></div>
                    </div>
                  </div>

                </div>
              </div>

            </aside>

          </div>
        )}

        {/* VIEW 2: TERMINAL / HISTORY VIEW */}
        {activeTab === 'TERMINAL' && (
          <div className="glass-surface p-6 rounded-none font-mono">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#4edea3]" />
                <h2 className="text-md font-bold uppercase tracking-wider text-white">System Historical Logs & Activity</h2>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">MugiSub OS Terminal v2.0.4</span>
            </div>

            {/* Scrollable feed showing admin action history */}
            <div className="bg-[#090e17] border border-[#4edea3]/20 p-5 h-[500px] overflow-y-auto terminal-scroll text-xs text-[#4edea3]/90 space-y-2 select-text">
              {logs.map((log, index) => {
                let colorClass = 'text-[#4edea3]';
                if (log.includes('ADMIN:')) colorClass = 'text-[#5de6ff]';
                if (log.includes('SYSTEM:')) colorClass = 'text-[#fda9ff]';
                return (
                  <div key={index} className={`leading-relaxed border-l-2 pl-3 border-transparent hover:border-slate-700 transition-colors ${colorClass}`}>
                    {log}
                  </div>
                );
              })}
              <div className="text-slate-500 italic mt-4">[SYSTEM]: Streaming live audits... type any command at top query system input.</div>
            </div>

            {/* Terminal Actions */}
            <div className="mt-4 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setLogs([]);
                  addLog("SYSTEM: Terminal session logs cleared by administrator.");
                }}
                className="bg-[#252a34] px-4 py-2 border border-slate-700 hover:border-red-500/50 hover:text-red-400 transition-all font-bold text-xs uppercase cursor-pointer"
              >
                Clear History
              </button>
              <button
                onClick={() => addLog("SYSTEM: Exporting logs buffer to Local Storage.")}
                className="bg-[#252a34] px-4 py-2 border border-[#4edea3]/30 text-[#4edea3] hover:bg-[#4edea3]/10 transition-all font-bold text-xs uppercase cursor-pointer"
              >
                Backup Logs
              </button>
            </div>

          </div>
        )}

        {/* VIEW 3: USERS VIEW */}
        {activeTab === 'USERS' && (
          <div className="glass-surface p-6 rounded-none">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
              <Users className="w-5 h-5 text-[#fda9ff]" />
              <div>
                <h2 className="text-md font-bold uppercase tracking-wider text-white">Registered Users Directory</h2>
                <p className="text-[10px] text-slate-500 font-mono">Verify credentials, roles, and administrative flags.</p>
              </div>
            </div>
            
            {/* Render sub-component UsersTable */}
            <UsersTable />
          </div>
        )}

        {/* VIEW 4: CONTENT VIEW */}
        {activeTab === 'CONTENT' && (
          <div className="space-y-6">
            
            {/* Anime List Manager */}
            <div className="glass-surface p-6 rounded-none">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Tv className="w-5 h-5 text-[#fda9ff]" />
                  <h3 className="font-bold text-white font-mono uppercase">Anime Index List</h3>
                </div>
                <button
                  onClick={() => setIsAddAnimeOpen(true)}
                  className="bg-[#c026d3] text-white px-3 py-1 font-mono text-[10px] font-bold hover:bg-[#d946ef] transition-colors cursor-pointer"
                >
                  ADD_NEW_ANIME
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {animeList.map((anime) => (
                  <div key={anime.id} className="bg-[#0f131d] border border-slate-800 p-4 flex justify-between items-center hover:border-purple-500/30 transition-colors">
                    <div>
                      <div className="text-xs font-mono text-slate-500">{anime.id}</div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5">{anime.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">{anime.type}</div>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-mono border font-bold ${
                      anime.status === 'SYNCED' ? 'bg-[#4edea3]/10 text-[#4edea3] border-[#4edea3]/30' : 'bg-[#fda9ff]/10 text-[#fda9ff] border-[#fda9ff]/30'
                    }`}>
                      {anime.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Novels List Manager */}
            <div className="glass-surface p-6 rounded-none">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#5de6ff]" />
                  <h3 className="font-bold text-white font-mono uppercase">Novels Index List</h3>
                </div>
                <button
                  onClick={() => setIsAddNovelOpen(true)}
                  className="border border-[#22d3ee] text-[#22d3ee] px-3 py-1 font-mono text-[10px] font-bold hover:bg-[#22d3ee]/10 transition-colors cursor-pointer"
                >
                  ADD_NEW_NOVEL
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {novelsList.map((novel) => (
                  <div key={novel.id} className="bg-[#0f131d] border border-slate-800 p-4 flex justify-between items-center hover:border-cyan-500/30 transition-colors">
                    <div>
                      <div className="text-xs font-mono text-slate-500">{novel.id}</div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5">{novel.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">By: {novel.author}</div>
                    </div>
                    <span className="bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30 px-2 py-0.5 text-[9px] font-mono font-bold">
                      {novel.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* ============================== MODALS & FORMS =========================== */}
      {/* ========================================================================= */}

      {/* MODAL 1: ADD ANIME */}
      {isAddAnimeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111622] border-2 border-[#fda9ff]/30 p-6 max-w-md w-full rounded-none font-mono">
            <h3 className="text-sm font-bold text-[#fda9ff] uppercase tracking-wider mb-6 flex items-center gap-2">
              <Tv className="w-4 h-4" /> ADD ANIME TO DATABASE
            </h3>
            
            <form onSubmit={handleAddAnime} className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase mb-1">Anime Title</label>
                <input
                  type="text"
                  required
                  value={animeTitle}
                  onChange={(e) => setAnimeTitle(e.target.value)}
                  className="w-full bg-[#0d111a] border border-slate-800 focus:border-[#fda9ff]/50 text-white px-3 py-2 text-xs outline-none"
                  placeholder="e.g. Chainsaw Man Season 2"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase mb-1">Format Type</label>
                <select
                  value={animeType}
                  onChange={(e) => setAnimeType(e.target.value)}
                  className="w-full bg-[#0d111a] border border-slate-800 text-white px-3 py-2 text-xs outline-none cursor-pointer"
                >
                  <option value="TV Series">TV Series</option>
                  <option value="Movie">Movie</option>
                  <option value="OVA">OVA</option>
                  <option value="Web">Web</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddAnimeOpen(false)}
                  className="w-1/2 py-2 border border-slate-700 hover:bg-white/5 text-xs text-slate-400 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-[#c026d3] hover:bg-[#d946ef] text-white text-xs font-bold cursor-pointer"
                >
                  ADD_ENTRY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD NOVEL */}
      {isAddNovelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111622] border-2 border-[#5de6ff]/30 p-6 max-w-md w-full rounded-none font-mono">
            <h3 className="text-sm font-bold text-[#5de6ff] uppercase tracking-wider mb-6 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> SYNC NEW NOVEL
            </h3>
            
            <form onSubmit={handleAddNovel} className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase mb-1">Novel Title</label>
                <input
                  type="text"
                  required
                  value={novelTitle}
                  onChange={(e) => setNovelTitle(e.target.value)}
                  className="w-full bg-[#0d111a] border border-slate-800 focus:border-[#5de6ff]/50 text-white px-3 py-2 text-xs outline-none"
                  placeholder="e.g. Mushoku Tensei Redundant"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase mb-1">Author / Creator</label>
                <input
                  type="text"
                  required
                  value={novelAuthor}
                  onChange={(e) => setNovelAuthor(e.target.value)}
                  className="w-full bg-[#0d111a] border border-slate-800 focus:border-[#5de6ff]/50 text-white px-3 py-2 text-xs outline-none"
                  placeholder="e.g. Rifujin na Magonote"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddNovelOpen(false)}
                  className="w-1/2 py-2 border border-slate-700 hover:bg-white/5 text-xs text-slate-400 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 border border-[#5de6ff] text-[#5de6ff] hover:bg-[#5de6ff]/10 text-xs font-bold cursor-pointer"
                >
                  SYNC_NOVEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD EPISODE */}
      {isAddEpisodeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111622] border-2 border-slate-700 p-6 max-w-md w-full rounded-none font-mono">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <PlayCircle className="w-4 h-4" /> ADD EPISODE ENTRY
            </h3>
            
            <form onSubmit={handleAddEpisode} className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase mb-1">Select Anime</label>
                <select
                  value={episodeAnime}
                  onChange={(e) => setEpisodeAnime(e.target.value)}
                  className="w-full bg-[#0d111a] border border-slate-800 text-white px-3 py-2 text-xs outline-none cursor-pointer"
                >
                  {animeList.map(anime => (
                    <option key={anime.id} value={anime.id}>
                      {anime.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">Episode No.</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={episodeNum}
                    onChange={(e) => setEpisodeNum(parseInt(e.target.value) || 1)}
                    className="w-full bg-[#0d111a] border border-slate-800 text-white px-3 py-2 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">Episode Title (Opt)</label>
                  <input
                    type="text"
                    value={episodeTitle}
                    onChange={(e) => setEpisodeTitle(e.target.value)}
                    className="w-full bg-[#0d111a] border border-slate-800 text-white px-3 py-2 text-xs outline-none"
                    placeholder="e.g. Return of the King"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddEpisodeOpen(false)}
                  className="w-1/2 py-2 border border-slate-700 hover:bg-white/5 text-xs text-slate-400 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-xs font-bold cursor-pointer"
                >
                  ADD_EPISODE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: SYSTEM SYNC PROGRESS OVERLAY */}
      {isSyncing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111622] border-2 border-[#10b981]/40 p-6 max-w-md w-full rounded-none font-mono">
            <h3 className="text-sm font-bold text-[#10b981] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#10b981]" /> SYSTEM SYNCHRONIZE ACTIVE
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#d7c0d3]">
                <span>Progress:</span>
                <span className="font-bold text-white">{syncProgress}%</span>
              </div>

              {/* Progress bar container */}
              <div className="w-full bg-[#1b2029] h-2">
                <div 
                  className="bg-[#10b981] h-full transition-all duration-300 shadow-[0_0_8px_#10b981]"
                  style={{ width: `${syncProgress}%` }}
                ></div>
              </div>

              {/* Logging console */}
              <div className="bg-[#090e17] border border-slate-800 p-3 h-28 overflow-y-auto text-[10px] text-[#4edea3] flex flex-col gap-1 select-none">
                {syncLogs.map((log, idx) => (
                  <div key={idx} className="leading-tight">{log}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: SYNC SUCCESS DIALOG */}
      {syncSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111622] border-2 border-[#10b981] p-6 max-w-sm w-full rounded-none text-center font-mono">
            <div className="w-12 h-12 bg-[#10b981]/15 border border-[#10b981] mx-auto flex items-center justify-center text-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.3)] mb-4">
              <CheckCircle2 className="w-6 h-6 animate-bounce" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">SYNC COMPLETED</h3>
            <p className="text-[10px] text-[#4edea3] mt-1 uppercase">
              Database rows matched. CDN caches invalidated.
            </p>
            
            <button
              onClick={() => setSyncSuccess(false)}
              className="mt-6 px-6 py-2 bg-[#00845a] text-[#eefff3] hover:bg-[#00a36c] text-xs font-bold uppercase transition-all rounded-none cursor-pointer"
            >
              DISMISS
            </button>
          </div>
        </div>
      )}

      {/* Detectable Sticky Footer Anchor */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-[#111622]/95 border-t border-slate-800 px-6 py-2.5 flex items-center justify-between text-[10px] font-mono text-[#d7c0d3]">
        <div>
          © 2024 <span className="text-white font-bold">MugiSub Admin Panel</span>. All rights reserved.
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 bg-[#4edea3] rounded-full"></span>
          <span>Version 2.0.4</span>
          <span className="text-slate-700">|</span>
          <span className="text-[#fda9ff] uppercase tracking-widest font-black">MUGISUB_OS_v2</span>
        </div>
      </footer>

    </div>
  );
}
