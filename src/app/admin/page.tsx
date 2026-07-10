'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Tv,
  BookOpen,
  Users,
  Zap,
  History,
  Loader2,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import UsersTable from '@/components/admin/tables/UsersTable';
import AddAnime from '@/components/layouts/add_anime';
import AddEpisode from '@/components/layouts/add_episode';
import AddSeason from '@/components/layouts/AddSeason';
import AddNews from '@/components/layouts/add_news';
import Statusbox from '@/components/layouts/statusbox';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminTab from '@/components/admin/layouts/admin_tab';
import AdminRightSidebar from '@/components/admin/layouts/admin_right_sidebar';

// ─── Mock Data ────────────────────────────────────────────────────
const INITIAL_ANIME = [
  { id: 'AN-992', title: 'Solo Leveling Vol. 2', type: 'TV Series', status: 'SYNCED' },
  { id: 'AN-881', title: 'Bleach: TYBW Part 3', type: 'TV Series', status: 'INDEXING' },
  { id: 'AN-102', title: 'Demon Slayer: Hashira Training', type: 'TV Series', status: 'SYNCED' },
  { id: 'AN-103', title: 'Jujutsu Kaisen Season 2', type: 'TV Series', status: 'SYNCED' },
];

const INITIAL_NOVELS = [
  { id: 'LN-042', title: 'Overlord: The Holy Kingdom', author: 'Kugane Maruyama', status: 'SYNCED' },
  { id: 'LN-011', title: 'Re:Zero Arc 8', author: 'Tappei Nagatsuki', status: 'SYNCED' },
  { id: 'LN-105', title: 'Classroom of the Elite Vol. 11', author: 'Shogo Kinugasa', status: 'SYNCED' },
];

const PENDING_APPROVALS = [
  { type: 'EP_RECAP', contributor: 'U_Nightcore' },
  { type: 'SUB_FILE', contributor: 'Fansub_Prime' },
  { type: 'BANNER_ART', contributor: 'K_Illustrator' },
  { type: 'METADATA', contributor: 'Bot_Scraper_3' },
];

// ─── Helpers ──────────────────────────────────────────────────────
const statusBadge = (s: string) =>
  s === 'SYNCED'
    ? 'inline-block bg-[#1a4731] text-[#4ade80] border border-[#2d6a4a] text-[9px] font-bold px-1.5 py-0.5 uppercase'
    : 'inline-block bg-[#3b1c1c] text-[#f87171] border border-[#6b2c2c] text-[9px] font-bold px-1.5 py-0.5 uppercase';

// Section header — matches sidebar section headers exactly
const SH = ({ t }: { t: string }) => (
  <div className="bg-[#2e384d] text-[#ddd] font-bold uppercase tracking-wide px-3 py-[5px] text-[11px] border-b border-[#1f2635] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
    {t}
  </div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'DATABASE' | 'TERMINAL' | 'USERS' | 'Anime'>('DATABASE');

  const [animeList, setAnimeList] = useState(INITIAL_ANIME);
  const [novelsList, setNovelsList] = useState(INITIAL_NOVELS);
  const [releaseCount, setReleaseCount] = useState(412);
  // Logs
  const [logs, setLogs] = useState<string[]>([
    "[18:22:01] SYSTEM   : MugiSub Admin initialized.",
    "[18:22:05] DB_PROC  : Kysely connected to Neon PostgreSQL.",
    "[18:22:15] AUTH     : Super Admin session started.",
    "[18:22:45] SYNC_EVT : Metadata synced for Solo Leveling Vol. 2.",
    "[18:23:01] STATUS   : All nodes OPERATIONAL.",
  ]);

  const addLog = (msg: string) => {
    const t = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, `[${t}] ${msg}`]);
  };

  // Modals
  const [isAddAnime, setIsAddAnime] = useState(false);
  const [isAddNovel, setIsAddNovel] = useState(false);

  // Forms States (Extended for DB Schema)
  const [animeTitle, setAnimeTitle] = useState('');
  const [titleEnglish, setTitleEnglish] = useState('');
  const [titleJapanese, setTitleJapanese] = useState('');
  const [animeType, setAnimeType] = useState('TV');
  const [animeStatus, setAnimeStatus] = useState('Upcoming');
  const [isFeatured, setIsFeatured] = useState(false);
  const [airDate, setAirDate] = useState('');
  const [nextEpisodeAt, setNextEpisodeAt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  // Validation Error State
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Image Upload Refs & States
  const posterInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [posterName, setPosterName] = useState('');
  const [bannerName, setBannerName] = useState('');

  // Novel Form States
  const [novelTitle, setNovelTitle] = useState('');
  const [novelAuthor, setNovelAuthor] = useState('');

  // Sync
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const triggerSync = () => {
    setIsSyncing(true); setSyncProgress(0); setSyncSuccess(false);
    setSyncLogs(["Initialising core...", "Verifying DB schema..."]);
    addLog("ADMIN    : Manual SYSTEM_SYNC triggered.");
  };

  useEffect(() => {
    let iv: NodeJS.Timeout;
    if (isSyncing) {
      iv = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(iv);
            setIsSyncing(false);
            setSyncSuccess(true);
            addLog("SYSTEM   : Sync COMPLETED — all nodes OK.");
            return 100;
          }
          const n = Math.min(prev + Math.floor(Math.random() * 20) + 10, 100);
          if (n > 30 && n <= 60) setSyncLogs(p => p.length < 3 ? [...p, "[DB] Cache flushed... OK"] : p);
          if (n > 60 && n <= 85) setSyncLogs(p => p.length < 4 ? [...p, "[CDN] Edge nodes refreshed... OK"] : p);
          if (n > 85 && n < 100) setSyncLogs(p => p.length < 5 ? [...p, "[META] Hashes verified... OK"] : p);
          return n;
        });
      }, 380);
    }
    return () => clearInterval(iv);
  }, [isSyncing]);

  // Unified API Dynamic Post Handler
  // Unified API Dynamic Post Handler with Multi-Field Validation
  const handleAddAnime = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    const errors: string[] = [];

    // 1. Language & Titles Validation
    if (!animeTitle.trim()) errors.push("Romaji Title is strictly required.");

    // 2. Format Type Validation
    const validFormats = ['TV', 'Movie', 'OVA', 'ONA', 'Web', 'Special'];
    if (!validFormats.includes(animeType)) {
      errors.push("Invalid Format Type selected.");
    }

    // 3. Airing Status Validation
    const validStatuses = ['Upcoming', 'Airing', 'Finished', 'Hiatus'];
    if (!validStatuses.includes(animeStatus)) {
      errors.push("Invalid Airing Status selected.");
    }

    // 4. Air Date String Validation
    if (animeStatus === 'Upcoming' && !airDate.trim()) {
      errors.push("Air Date String is required when status is 'Upcoming'.");
    }

    // 5. Next Episode Countdown Validation
    if (animeStatus === 'Airing' && !nextEpisodeAt) {
      errors.push("Next Episode Countdown timestamp is required for live Airing anime.");
    }

    // 6. Poster & Banner Media Validation
    if (!imageUrl) {
      errors.push("Poster Image is mandatory. Please drag or upload a file.");
    }
    // Banner configuration check for Featured Slider content
    if (isFeatured && !bannerUrl) {
      errors.push("Featured (Slider) content requires a high-res Banner Image.");
    }

    // If validation fails, abort pipeline and show logs
    if (errors.length > 0) {
      setFormErrors(errors);
      if (typeof addLog === 'function') addLog(`VAL_WARN  : Form validation rejected with ${errors.length} errors.`);
      return;
    }

    // Clear validation box if clean
    setFormErrors([]);

    const tempId = `AN-${Math.floor(100 + Math.random() * 900)}`;
    const payload = {
      titleRomaji: animeTitle,
      titleEnglish: titleEnglish || null,
      titleJapanese: titleJapanese || null,
      type: animeType,
      status: animeStatus,
      isFeatured,
      airDate: airDate || null,
      nextEpisodeAt: nextEpisodeAt ? new Date(nextEpisodeAt).toISOString() : null,
      image: imageUrl || null,
      bannerImage: bannerUrl || null,
    };

    try {
      if (typeof addLog === 'function') addLog(`DB_WRITE : Committing record "${animeTitle}" to database...`);

      console.log(payload)

      // Reset Form fields and Dropzones
      setAnimeTitle(''); setTitleEnglish(''); setTitleJapanese(''); setAirDate(''); setNextEpisodeAt(''); setImageUrl(''); setBannerUrl(''); setPosterName(''); setBannerName(''); setIsAddAnime(false);
    } catch (error) {
      if (typeof addLog === 'function') addLog(`DB_ERR   : Pipeline failed to write entry.`);
      console.error(error);
    }
  };


  const handleAddNovel = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `LN-${Math.floor(100 + Math.random() * 900)}`;
    setNovelsList(p => [{ id, title: novelTitle, author: novelAuthor, status: 'SYNCED' }, ...p]);
    addLog(`ADMIN    : Added Novel "${novelTitle}" by ${novelAuthor} (${id})`);
    setNovelTitle(''); setNovelAuthor(''); setIsAddNovel(false);
  };



  // ─── Sidebar command button — matches site's button style ─────
  const CmdBtn = ({
    label, onClick, variant = 'default', icon: Icon,
  }: {
    label: string; onClick: () => void;
    variant?: 'red' | 'navy' | 'green' | 'gold' | 'default';
    icon: React.ElementType;
  }) => {
    const styles: Record<string, string> = {
      red: 'bg-[#a11f1f] hover:bg-[#c02222] text-white border-[#7a1515]',
      navy: 'bg-[#1f3e70] hover:bg-[#254d8c] text-white border-[#15305a]',
      green: 'bg-[#1a5c36] hover:bg-[#236b40] text-white border-[#134526]',
      gold: 'bg-[#5c4a1a] hover:bg-[#6e5a20] text-white border-[#42360f]',
      default: 'bg-[#34394d] hover:bg-[#12151f] text-white border-[#1c2331]',
    };
    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-2 py-[5px] border text-[11px] font-bold uppercase tracking-wide transition-colors cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.3)] ${styles[variant]}`}
      >
        <span>{label}</span>
        <Icon size={13} />
      </button>
    );
  };

  const handleFileChange = (file: File, type: 'poster' | 'banner') => {
    if (!file) return;

    // Generates a local browser URL that can be used directly in <img> src
    const generatedUrl = URL.createObjectURL(file);

    if (type === 'poster') {
      setImageUrl(generatedUrl);
      setPosterName(file.name);
      if (typeof addLog === 'function') addLog(`FS_LOAD  : Poster loaded locally -> ${file.name}`);
    } else {
      setBannerUrl(generatedUrl);
      setBannerName(file.name);
      if (typeof addLog === 'function') addLog(`FS_LOAD  : Banner loaded locally -> ${file.name}`);
    }
  };

  return (
    <div className="w-full min-w-0 pt-2 overflow-x-hidden">

      {/* ── Tab Navigation — identical to Main/Forum/Outbox style ── */}
      <AdminTab />

      {/* ── Main content container — matches page.tsx's content div ─ */}
      <div className="w-full min-w-0 p-3 lg:p-4 lg:ml-2 bg-[#cfd1d4] text-[#1a2536] font-sans flex flex-col gap-3 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] overflow-x-hidden">

        {/* ── Page title banner — matches "MAIN" banner on home page ─ */}
        <div className="bg-[#34394d] text-[#ddd] p-3 py-1.5 border border-[#1c2331] font-bold text-[15px] uppercase tracking-wide shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
          Admin Panel
        </div>

        {/* ── Layout: content + right sidebar ──────────────────────── */}
        <div className="flex gap-3">

          {/* ════ LEFT CONTENT ════════════════════════════════════ */}
          <div className="flex-1 min-w-0 space-y-3">

            {/* ─── DATABASE TAB ─────────────────────────────────── */}
            {activeTab === 'DATABASE' && (
              <>
                {/* Stat cards — styled like the site's table headers */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    { label: 'Total Anime', value: animeList.length + 12838, badge: '+4.2%', icon: Tv, color: '#a11f1f' },
                    { label: 'Total Novels', value: novelsList.length + 8100, badge: '+1.8%', icon: BookOpen, color: '#1f3e70' },
                    { label: 'Total Users', value: '245,991', badge: '+12.5%', icon: Users, color: '#1a5c36' },
                    { label: 'Releases', value: releaseCount, badge: 'LIVE', icon: Zap, color: '#8b6914' },
                  ].map(s => (
                    <div key={s.label} className="bg-[#bdbfc3] border border-[#999] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-[#34394d]">{s.label}</span>
                        <s.icon size={14} color={s.color} />
                      </div>
                      <div className="text-[22px] font-black text-[#1a2536] font-mono leading-none">{s.value}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[9px] font-bold" style={{ color: s.color }}>{s.badge}</span>
                        <TrendingUp size={10} color={s.color} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity chart — styled like site's Recent Releases section */}
                <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
                  <div className="text-black py-1.5 px-3 font-bold text-[13px] flex items-center justify-between border-b border-[#999]">
                    <span>User Activity &amp; Registrations — 30-Day Analysis</span>
                    <span className="bg-[#34394d] text-[#ccc] text-[10px] px-2 py-0.5 border border-[#3e455c] font-sans">JUN 2025</span>
                  </div>
                  <div className="p-3">
                    <svg viewBox="0 0 900 150" className="w-full h-36">
                      <defs>
                        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1f3e70" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#1f3e70" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                      {/* Y-axis gridlines */}
                      {[35, 70, 105].map(y => (
                        <line key={y} x1="0" y1={y} x2="900" y2={y}
                          stroke="#999" strokeDasharray="3 3" strokeWidth="0.6" />
                      ))}
                      {/* Area fill */}
                      <path
                        d="M0,125 C60,118 100,120 180,112 S310,95 450,75 S610,95 720,88 S820,45 900,30 L900,148 L0,148 Z"
                        fill="url(#cg)"
                      />
                      {/* Line */}
                      <path
                        d="M0,125 C60,118 100,120 180,112 S310,95 450,75 S610,95 720,88 S820,45 900,30"
                        fill="none" stroke="#1f3e70" strokeWidth="2"
                      />
                      {/* Dots */}
                      {[[0, 125], [180, 112], [450, 75], [720, 88], [900, 30]].map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="3.5" fill="#1f3e70" stroke="#cfd1d4" strokeWidth="1.5" />
                      ))}
                      {/* X-axis labels */}
                      {[['JUN_01', 10], ['JUN_08', 195], ['JUN_15', 420], ['JUN_22', 640], ['JUN_30', 848]].map(([l, x]) => (
                        <text key={l} x={x} y="148" fontSize="9" fill="#34394d">{l}</text>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Tables Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  {/* Latest Added Content — matches site table style */}
                  <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] overflow-x-auto">
                    <div className="text-black py-1.5 px-3 font-bold text-[13px] border-b border-[#999]">
                      Latest Added Content
                    </div>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#34394d] text-white text-[11px] font-bold uppercase tracking-wider">
                          <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">ID</th>
                          <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">Title</th>
                          <th className="px-2 py-1.5 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...animeList.slice(0, 2), ...novelsList.slice(0, 2)].map((item, i) => (
                          <tr key={item.id}
                            className={`text-[11.5px] border-b border-[#999]/40 hover:bg-white/30 transition-colors ${i % 2 === 0 ? 'bg-[#bdbfc3]' : 'bg-[#cfd1d4]'}`}>
                            <td className="px-2 py-1.5 border-r border-[#999]/30 text-[#1f3e70] font-bold font-mono">{item.id}</td>
                            <td className="px-2 py-1.5 border-r border-[#999]/30">{item.title}</td>
                            <td className="px-2 py-1.5 text-center">
                              <span className={statusBadge('status' in item ? item.status : 'SYNCED')}>
                                {'status' in item ? item.status : 'SYNCED'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pending Approvals */}
                  <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] overflow-x-auto">
                    <div className="text-black py-1.5 px-3 font-bold text-[13px] border-b border-[#999]">
                      Pending Approvals
                    </div>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#34394d] text-white text-[11px] font-bold uppercase tracking-wider">
                          <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">Type</th>
                          <th className="px-2 py-1.5 text-left border-r border-[#1c2331]">Contributor</th>
                          <th className="px-2 py-1.5 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PENDING_APPROVALS.map((p, i) => (
                          <tr key={p.type}
                            className={`text-[11.5px] border-b border-[#999]/40 hover:bg-white/30 transition-colors ${i % 2 === 0 ? 'bg-[#bdbfc3]' : 'bg-[#cfd1d4]'}`}>
                            <td className="px-2 py-1.5 border-r border-[#999]/30 font-bold text-[#1f3e70] font-mono">{p.type}</td>
                            <td className="px-2 py-1.5 border-r border-[#999]/30">{p.contributor}</td>
                            <td className="px-2 py-1.5 text-center">
                              <button className="bg-[#a11f1f] hover:bg-[#c02222] text-white text-[9px] font-bold px-2 py-0.5 border border-[#7a1515] cursor-pointer uppercase">
                                Review
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* ─── TERMINAL TAB ─────────────────────────────────── */}
            {activeTab === 'TERMINAL' && (
              <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
                <div className="text-black py-1.5 px-3 font-bold text-[13px] flex items-center justify-between border-b border-[#999]">
                  <span>System Terminal — Action History</span>
                  <div className="flex gap-1">
                    <button onClick={() => { setLogs([]); addLog("ADMIN    : Terminal logs cleared."); }}
                      className="bg-[#a11f1f] hover:bg-[#c02222] text-white text-[9px] font-bold px-2 py-0.5 border border-[#7a1515] cursor-pointer uppercase">
                      Clear
                    </button>
                    <button onClick={() => addLog("SYSTEM   : Logs backed up.")}
                      className="bg-[#1a5c36] hover:bg-[#236b40] text-white text-[9px] font-bold px-2 py-0.5 border border-[#134526] cursor-pointer uppercase">
                      Backup
                    </button>
                  </div>
                </div>
                <div
                  className="bg-[#111827] p-4 h-[500px] overflow-y-auto font-mono text-[11px] space-y-0.5"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#1a5c36 #0d1117' }}
                >
                  {logs.map((log, i) => {
                    let c = 'text-[#4ade80]';
                    if (log.includes('ADMIN')) c = 'text-[#60a5fa]';
                    if (log.includes('SYSTEM')) c = 'text-[#e2e8f0]';
                    return (
                      <div key={i} className={`${c} hover:bg-white/5 px-1 py-[2px] border-l-2 border-transparent hover:border-[#4ade80] transition-colors`}>
                        {log}
                      </div>
                    );
                  })}
                  {logs.length === 0 && (
                    <div className="text-[#4ade80]/40 italic">No logs. Perform an action to see history.</div>
                  )}
                </div>
              </div>
            )}

            {/* ─── USERS TAB ────────────────────────────────────── */}
            {activeTab === 'USERS' && (
              <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
                <div className="text-black py-1.5 px-3 font-bold text-[13px] border-b border-[#999]">
                  User Management
                </div>
                <div className="p-3">
                  <UsersTable />
                </div>
              </div>
            )}
          </div>

          {/* ════ RIGHT SIDEBAR ════════════════════════════════════ */}
          <AdminRightSidebar />
        </div>
      </div>
      
    </div>
  );
}
