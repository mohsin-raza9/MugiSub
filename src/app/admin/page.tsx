'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import QuickActions from "@/components/admin/QuickActions";
import {
  Menu,
  Search,
  Bell,
  Moon,
  Sun,
  Tv,
  Users,
  User,
  Download,
  Calendar,
  ChevronDown,
  Eye,
  Maximize2,
  Plus,
  FileText,
  MessageCircle,
  AlertTriangle,
  Play,
  Wrench,
  Activity,
  Shield,
  ExternalLink,
  UploadCloud,
  FileVideo,
  ImageIcon,
  CheckCircle2,
  Terminal,
  ArrowLeft,
  Loader2
} from "lucide-react";

export default function RestructuredAdminDashboard() {
  const [currentView, setCurrentView] = useState<"dashboard" | "upload">("dashboard");
  const [timeframe, setTimeframe] = useState<"30" | "3" | "1">("30");
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Form State
  const [animeTitle, setAnimeTitle] = useState("");
  const [animeDesc, setAnimeDesc] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  
  // Uploading Flow State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadLogs, setUploadLogs] = useState<string[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Refs for hidden file inputs
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Simulated upload progress effects
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isUploading) {
      interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUploadSuccess(true);
            return 100;
          }
          const nextProgress = prev + Math.floor(Math.random() * 15) + 5;
          const capped = Math.min(nextProgress, 100);
          
          // Add system logs corresponding to progress
          if (capped > 10 && capped <= 30 && uploadLogs.length < 1) {
            setUploadLogs(prevLogs => [...prevLogs, "[SYS]: Connecting to server core... [ESTABLISHED]"]);
          } else if (capped > 30 && capped <= 50 && uploadLogs.length < 2) {
            setUploadLogs(prevLogs => [...prevLogs, "[SYS]: Allocating server cluster buffer... [OK]"]);
          } else if (capped > 50 && capped <= 75 && uploadLogs.length < 3) {
            setUploadLogs(prevLogs => [...prevLogs, `[SYS]: Uploading video stream chunks... ${capped}%`]);
          } else if (capped > 75 && capped < 100 && uploadLogs.length < 4) {
            setUploadLogs(prevLogs => [...prevLogs, "[SYS]: Writing metadata records to Neon DB schema... [OK]"]);
          }
          
          return capped;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isUploading, uploadLogs.length]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!animeTitle) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);
    setUploadLogs(["[SYS]: Initializing secure file transport stream..."]);
  };

  const resetForm = () => {
    setAnimeTitle("");
    setAnimeDesc("");
    setVideoFile(null);
    setThumbnailFile(null);
    setUploadSuccess(false);
    setUploadProgress(0);
    setUploadLogs([]);
  };

  // SVG Sparkline paths configuration
  const sparklinesData = {
    anime: "M 0 35 Q 20 10 40 28 T 80 8 T 120 18",
    animeFill: "M 0 35 Q 20 10 40 28 T 80 8 T 120 18 L 120 40 L 0 40 Z",
    characters: "M 0 32 Q 25 38 50 15 T 100 22 T 120 5",
    charactersFill: "M 0 32 Q 25 38 50 15 T 100 22 T 120 5 L 120 40 L 0 40 Z",
    users: "M 0 30 Q 30 10 60 25 T 100 8 T 120 3",
    usersFill: "M 0 30 Q 30 10 60 25 T 100 8 T 120 3 L 120 40 L 0 40 Z",
    releases: "M 0 25 Q 20 38 40 18 T 80 12 T 120 2",
    releasesFill: "M 0 25 Q 20 38 40 18 T 80 12 T 120 2 L 120 40 L 0 40 Z"
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] text-[#e2e8f0] font-sans antialiased pb-16 transition-colors duration-300 relative">
      
      {/* BACKGROUND SCI-FI GLOW METRICS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-amber-900/5 rounded-full blur-[80px] pointer-events-none z-0"></div>

      {/* COMPONENT A: TOP HEADER NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full bg-[#111622]/90 backdrop-blur-md border-b border-[#1d2433] px-4 py-2 flex items-center justify-between">
        {/* Left Nav */}
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-[#1d2433]/50 rounded-sm">
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Global Search */}
          <div className={`relative flex items-center transition-all duration-300 ${searchFocused ? 'w-[320px]' : 'w-[250px]'}`}>
            <span className="absolute left-3 text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search anime, users, releases... [Ctrl K]"
              className="w-full bg-[#0d111a] border border-[#1d2433] text-xs py-1.5 pl-9 pr-3 rounded-none outline-none text-[#e2e8f0] focus:border-[#a855f7]/60 focus:ring-1 focus:ring-[#a855f7]/30 transition-all font-mono"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-4">
          {/* View Dashboard Button if in Form View */}
          {currentView === "upload" && (
            <button
              onClick={() => { setCurrentView("dashboard"); resetForm(); }}
              className="text-xs bg-[#121824] border border-[#1d2433] hover:border-[#a855f7]/60 text-slate-300 hover:text-white px-3 py-1 font-mono transition-all flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </button>
          )}

          {/* Notification Bell */}
          <button className="relative p-1.5 bg-[#0d111a] border border-[#1d2433] hover:bg-[#111622] transition-colors rounded-none cursor-pointer">
            <Bell className="w-4 h-4 text-purple-400" />
            <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-[9px] font-bold text-white px-1 py-0.5 rounded-full leading-none border border-[#0a0f18] animate-pulse">
              12
            </span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")} 
            className="p-1.5 bg-[#0d111a] border border-[#1d2433] hover:bg-[#111622] transition-colors rounded-none text-slate-400 hover:text-amber-400"
          >
            {themeMode === "dark" ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 border-l border-[#1d2433] pl-4">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-none p-[1.5px] shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                <div className="w-full h-full bg-[#111622] flex items-center justify-center font-bold text-[11px] text-white">
                  TH
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#111622] rounded-full"></div>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">Tariq Hasan</span>
              <span className="text-[9px] text-purple-400 uppercase font-mono font-bold tracking-wider leading-none mt-0.5">
                Administrator
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN BODY AREA */}
      <main className="max-w-[1600px] mx-auto px-4 pt-6 flex flex-col gap-4 relative z-10">
        
        {/* CONDITIONAL RENDERING CONTAINER */}
        {currentView === "dashboard" ? (
          
          /* ========================================================================= */
          /* ======================== VIEW 1: MAIN DASHBOARD ========================= */
          /* ========================================================================= */
          <>
            {/* COMPONENT B: DASHBOARD TITLE & DATE PICKER ROW */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1d2433] pb-4 mb-2">
              <div>
                <h1 className="text-xl font-black uppercase tracking-wider text-white font-mono flex items-center gap-2">
                  <span className="inline-block w-1 h-5 bg-purple-500"></span>
                  Admin Dashboard
                  <span className="text-[10px] font-normal text-cyan-400 border border-cyan-500/30 bg-cyan-950/30 px-1.5 py-0.5 tracking-normal lowercase ml-2 font-mono">
                    terminal_online
                  </span>
                </h1>
                <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">Overview of your anime platform</p>
              </div>

              {/* Date Picker Range Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#111622] border border-[#1d2433] hover:border-[#a855f7]/60 text-xs font-mono text-[#94a3b8] hover:text-white transition-all rounded-none"
                >
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>May 10, 2024 - Jun 9, 2024</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDatePickerOpen && (
                  <div className="absolute right-0 mt-1 w-56 bg-[#121824] border border-[#1d2433] shadow-xl z-50 p-2 font-mono text-[11px]">
                    <div className="text-slate-400 px-2 py-1 border-b border-[#1d2433] uppercase text-[9px] font-bold tracking-wider mb-1">Select Presets</div>
                    <button className="w-full text-left px-2 py-1.5 hover:bg-[#1d2433] text-[#e2e8f0] transition-colors">Today</button>
                    <button className="w-full text-left px-2 py-1.5 hover:bg-[#1d2433] text-[#e2e8f0] transition-colors">Last 7 Days</button>
                    <button className="w-full text-left px-2 py-1.5 bg-purple-900/20 text-purple-400 hover:bg-[#1d2433] transition-colors">Last 30 Days</button>
                    <button className="w-full text-left px-2 py-1.5 hover:bg-[#1d2433] text-[#e2e8f0] transition-colors">Last 90 Days</button>
                  </div>
                )}
              </div>
            </div>

            {/* Asymmetric 2-Column Base */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
              
              {/* LEFT COLUMN (75%) */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                
                {/* Stats cards row (3 Cards Grid) */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Total Anime */}
                  <div className="bg-[#111622] border border-[#1d2433] p-4 flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all pointer-events-none"></div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider font-mono">Total Anime</span>
                        <h3 className="text-2xl font-black text-white mt-1 font-mono tracking-tight group-hover:text-purple-400 transition-colors">
                          12,458
                        </h3>
                      </div>
                      <div className="p-2 bg-[#1d2433]/40 border border-[#1d2433] text-purple-400 group-hover:scale-110 transition-transform">
                        <Tv className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-purple-400 font-mono font-bold">+245 this month</span>
                      <div className="w-24 h-8 shrink-0">
                        <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path d={sparklinesData.animeFill} fill="url(#purpleGlow)" />
                          <path d={sparklinesData.anime} fill="none" stroke="#a855f7" strokeWidth="1.5" className="drop-shadow-[0_0_3px_rgba(168,85,247,0.8)]" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-purple-500"></div>
                  </div>

                  {/* Total Characters */}
                  <div className="bg-[#111622] border border-[#1d2433] p-4 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all pointer-events-none"></div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider font-mono">Total Characters</span>
                        <h3 className="text-2xl font-black text-white mt-1 font-mono tracking-tight group-hover:text-cyan-400 transition-colors">
                          58,293
                        </h3>
                      </div>
                      <div className="p-2 bg-[#1d2433]/40 border border-[#1d2433] text-cyan-400 group-hover:scale-110 transition-transform">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-cyan-400 font-mono font-bold">+1,293 this month</span>
                      <div className="w-24 h-8 shrink-0">
                        <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="cyanGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path d={sparklinesData.charactersFill} fill="url(#cyanGlow)" />
                          <path d={sparklinesData.characters} fill="none" stroke="#06b6d4" strokeWidth="1.5" className="drop-shadow-[0_0_3px_rgba(6,118,212,0.8)]" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-cyan-500"></div>
                  </div>

                  {/* Total Users */}
                  <div className="bg-[#111622] border border-[#1d2433] p-4 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all pointer-events-none"></div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider font-mono">Total Users</span>
                        <h3 className="text-2xl font-black text-white mt-1 font-mono tracking-tight group-hover:text-emerald-400 transition-colors">
                          248,751
                        </h3>
                      </div>
                      <div className="p-2 bg-[#1d2433]/40 border border-[#1d2433] text-emerald-400 group-hover:scale-110 transition-transform">
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">+3,892 this month</span>
                      <div className="w-24 h-8 shrink-0">
                        <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="greenGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path d={sparklinesData.usersFill} fill="url(#greenGlow)" />
                          <path d={sparklinesData.users} fill="none" stroke="#10b981" strokeWidth="1.5" className="drop-shadow-[0_0_3px_rgba(16,185,129,0.8)]" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-emerald-500"></div>
                  </div>
                </section>

                {/* Analytics Overview (3 Charts Grid) */}
                <section className="bg-[#111622] border border-[#1d2433] p-4 flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1d2433] pb-3">
                    <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-white flex items-center gap-2">
                      <span className="inline-block w-1 h-4 bg-cyan-400"></span>
                      Analytics Overview
                    </h2>
                    <div className="flex bg-[#0d111a] border border-[#1d2433] p-0.5 rounded-none font-mono text-[10px]">
                      <button 
                        onClick={() => setTimeframe("30")}
                        className={`px-3 py-1 cursor-pointer transition-colors ${timeframe === "30" ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                      >
                        30 Days
                      </button>
                      <button 
                        onClick={() => setTimeframe("3")}
                        className={`px-3 py-1 cursor-pointer transition-colors ${timeframe === "3" ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                      >
                        3 Months
                      </button>
                      <button 
                        onClick={() => setTimeframe("1")}
                        className={`px-3 py-1 cursor-pointer transition-colors ${timeframe === "1" ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                      >
                        1 Year
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Chart 1: User Registrations */}
                    <div className="bg-[#0d111a] border border-[#1d2433] p-3 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 font-mono">User Registrations</span>
                          <div className="text-base font-black font-mono text-white mt-0.5">8,389</div>
                        </div>
                        <span className="text-[9px] font-mono font-bold bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded-none">
                          +12.5%
                        </span>
                      </div>
                      
                      <div className="h-24 w-full mt-3 relative">
                        <svg className="w-full h-full" viewBox="0 0 200 80">
                          <line x1="0" y1="20" x2="200" y2="20" stroke="#1d2433" strokeDasharray="2 2" />
                          <line x1="0" y1="50" x2="200" y2="50" stroke="#1d2433" strokeDasharray="2 2" />
                          <line x1="66" y1="0" x2="66" y2="70" stroke="#1d2433" strokeDasharray="2 2" />
                          <line x1="133" y1="0" x2="133" y2="70" stroke="#1d2433" strokeDasharray="2 2" />
                          <path d="M 0,60 Q 30,30 60,50 T 120,20 T 180,45 L 200,10" fill="none" stroke="#a855f7" strokeWidth="1.5" className="drop-shadow-[0_0_2px_rgba(168,85,247,0.6)]" />
                          <text x="2" y="16" fill="#94a3b8" fontSize="8" className="font-mono">1K</text>
                          <text x="2" y="46" fill="#94a3b8" fontSize="8" className="font-mono">500</text>
                          <text x="2" y="68" fill="#94a3b8" fontSize="8" className="font-mono">0</text>
                          <text x="0" y="79" fill="#94a3b8" fontSize="8" className="font-mono">May 10</text>
                          <text x="75" y="79" fill="#94a3b8" fontSize="8" className="font-mono text-center">May 25</text>
                          <text x="170" y="79" fill="#94a3b8" fontSize="8" className="font-mono text-right">Jun 9</text>
                        </svg>
                      </div>
                    </div>

                    {/* Chart 2: Anime Added */}
                    <div className="bg-[#0d111a] border border-[#1d2433] p-3 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 font-mono">Anime Added</span>
                          <div className="text-base font-black font-mono text-white mt-0.5">348</div>
                        </div>
                        <span className="text-[9px] font-mono font-bold bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded-none">
                          +8.2%
                        </span>
                      </div>
                      
                      <div className="h-24 w-full mt-3 relative">
                        <svg className="w-full h-full" viewBox="0 0 200 80">
                          <line x1="0" y1="20" x2="200" y2="20" stroke="#1d2433" strokeDasharray="2 2" />
                          <line x1="0" y1="50" x2="200" y2="50" stroke="#1d2433" strokeDasharray="2 2" />
                          <line x1="66" y1="0" x2="66" y2="70" stroke="#1d2433" strokeDasharray="2 2" />
                          <line x1="133" y1="0" x2="133" y2="70" stroke="#1d2433" strokeDasharray="2 2" />
                          <path d="M 0,65 Q 40,55 80,25 T 140,35 T 200,15" fill="none" stroke="#06b6d4" strokeWidth="1.5" className="drop-shadow-[0_0_2px_rgba(6,182,212,0.6)]" />
                          <text x="2" y="16" fill="#94a3b8" fontSize="8" className="font-mono">1K</text>
                          <text x="2" y="46" fill="#94a3b8" fontSize="8" className="font-mono">500</text>
                          <text x="2" y="68" fill="#94a3b8" fontSize="8" className="font-mono">0</text>
                          <text x="0" y="79" fill="#94a3b8" fontSize="8" className="font-mono">May 10</text>
                          <text x="75" y="79" fill="#94a3b8" fontSize="8" className="font-mono">May 25</text>
                          <text x="170" y="79" fill="#94a3b8" fontSize="8" className="font-mono">Jun 9</text>
                        </svg>
                      </div>
                    </div>

                    {/* Chart 3: Forum Activity */}
                    <div className="bg-[#0d111a] border border-[#1d2433] p-3 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 font-mono">Forum Activity</span>
                          <div className="text-base font-black font-mono text-white mt-0.5">2,593</div>
                        </div>
                        <span className="text-[9px] font-mono font-bold bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded-none">
                          +15.3%
                        </span>
                      </div>
                      
                      <div className="h-24 w-full mt-3 relative">
                        <svg className="w-full h-full" viewBox="0 0 200 80">
                          <line x1="0" y1="20" x2="200" y2="20" stroke="#1d2433" strokeDasharray="2 2" />
                          <line x1="0" y1="50" x2="200" y2="50" stroke="#1d2433" strokeDasharray="2 2" />
                          <line x1="66" y1="0" x2="66" y2="70" stroke="#1d2433" strokeDasharray="2 2" />
                          <line x1="133" y1="0" x2="133" y2="70" stroke="#1d2433" strokeDasharray="2 2" />
                          <path d="M 0,55 Q 30,68 60,35 T 120,40 T 200,10" fill="none" stroke="#10b981" strokeWidth="1.5" className="drop-shadow-[0_0_2px_rgba(16,185,129,0.6)]" />
                          <text x="2" y="16" fill="#94a3b8" fontSize="8" className="font-mono">1K</text>
                          <text x="2" y="46" fill="#94a3b8" fontSize="8" className="font-mono">500</text>
                          <text x="2" y="68" fill="#94a3b8" fontSize="8" className="font-mono">0</text>
                          <text x="0" y="79" fill="#94a3b8" fontSize="8" className="font-mono">May 10</text>
                          <text x="75" y="79" fill="#94a3b8" fontSize="8" className="font-mono">May 25</text>
                          <text x="170" y="79" fill="#94a3b8" fontSize="8" className="font-mono">Jun 9</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Bottom Row side-by-side elements */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
                  {/* Latest Anime */}
                  <div className="xl:col-span-3 bg-[#111622] border border-[#1d2433] p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-[#1d2433] pb-3">
                      <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-white flex items-center gap-2">
                        <span className="inline-block w-1 h-4 bg-purple-500"></span>
                        Latest Anime
                      </h2>
                      <a href="#" className="text-[10px] text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1 transition-colors">
                        View All <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse font-mono text-xs">
                        <thead>
                          <tr className="border-b border-[#1d2433] text-[#94a3b8] text-[10px] uppercase tracking-wider">
                            <th className="py-2.5 font-bold">Title</th>
                            <th className="py-2.5 font-bold">Type</th>
                            <th className="py-2.5 font-bold">Status</th>
                            <th className="py-2.5 font-bold text-center">Episodes</th>
                            <th className="py-2.5 font-bold">Rating</th>
                            <th className="py-2.5 font-bold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1d2433]/50">
                          <tr className="hover:bg-[#1d2433]/20 transition-colors">
                            <td className="py-3 flex items-center gap-3 pr-2">
                              <div className="w-9 h-12 bg-purple-900/30 border border-[#1d2433] shrink-0 flex items-center justify-center font-bold text-[10px] text-purple-400 uppercase">DS</div>
                              <div>
                                <div className="font-bold text-white leading-tight">Demon Slayer: Hashira Training Arc</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">Studio Ufotable</div>
                              </div>
                            </td>
                            <td className="py-3 text-slate-300">TV Series</td>
                            <td className="py-3">
                              <span className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-0.5 font-bold rounded-none uppercase">Airing</span>
                            </td>
                            <td className="py-3 text-center text-slate-300">8 / ?</td>
                            <td className="py-3 text-amber-400 font-bold">⭐ 9.21</td>
                            <td className="py-3 text-right">
                              <div className="flex justify-end gap-1.5">
                                <button className="p-1 hover:bg-[#1d2433] text-slate-400 hover:text-white rounded-none transition-colors cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                                <button className="p-1 hover:bg-[#1d2433] text-slate-400 hover:text-purple-400 rounded-none transition-colors cursor-pointer"><Maximize2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-[#1d2433]/20 transition-colors">
                            <td className="py-3 flex items-center gap-3 pr-2">
                              <div className="w-9 h-12 bg-cyan-900/30 border border-[#1d2433] shrink-0 flex items-center justify-center font-bold text-[10px] text-cyan-400 uppercase">JK</div>
                              <div>
                                <div className="font-bold text-white leading-tight">Jujutsu Kaisen Season 2</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">Studio MAPPA</div>
                              </div>
                            </td>
                            <td className="py-3 text-slate-300">TV Series</td>
                            <td className="py-3">
                              <span className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-0.5 font-bold rounded-none uppercase">Airing</span>
                            </td>
                            <td className="py-3 text-center text-slate-300">18 / 23</td>
                            <td className="py-3 text-amber-400 font-bold">⭐ 9.12</td>
                            <td className="py-3 text-right">
                              <div className="flex justify-end gap-1.5">
                                <button className="p-1 hover:bg-[#1d2433] text-slate-400 hover:text-white rounded-none transition-colors cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                                <button className="p-1 hover:bg-[#1d2433] text-slate-400 hover:text-purple-400 rounded-none transition-colors cursor-pointer"><Maximize2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-[#1d2433]/20 transition-colors">
                            <td className="py-3 flex items-center gap-3 pr-2">
                              <div className="w-9 h-12 bg-blue-900/30 border border-[#1d2433] shrink-0 flex items-center justify-center font-bold text-[10px] text-blue-400 uppercase">FR</div>
                              <div>
                                <div className="font-bold text-white leading-tight">Frieren: Beyond Journey's End</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">Studio Madhouse</div>
                              </div>
                            </td>
                            <td className="py-3 text-slate-300">TV Series</td>
                            <td className="py-3">
                              <span className="bg-blue-950/60 border border-blue-500/30 text-blue-400 text-[10px] px-2 py-0.5 font-bold rounded-none uppercase">Finished</span>
                            </td>
                            <td className="py-3 text-center text-slate-300">28 / 28</td>
                            <td className="py-3 text-amber-400 font-bold">⭐ 9.37</td>
                            <td className="py-3 text-right">
                              <div className="flex justify-end gap-1.5">
                                <button className="p-1 hover:bg-[#1d2433] text-slate-400 hover:text-white rounded-none transition-colors cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                                <button className="p-1 hover:bg-[#1d2433] text-slate-400 hover:text-purple-400 rounded-none transition-colors cursor-pointer"><Maximize2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-[#1d2433]/20 transition-colors">
                            <td className="py-3 flex items-center gap-3 pr-2">
                              <div className="w-9 h-12 bg-amber-900/20 border border-[#1d2433] shrink-0 flex items-center justify-center font-bold text-[10px] text-amber-400 uppercase">SZ</div>
                              <div>
                                <div className="font-bold text-white leading-tight">Suzume no Tojimari</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">CoMix Wave</div>
                              </div>
                            </td>
                            <td className="py-3 text-slate-300">Movie</td>
                            <td className="py-3">
                              <span className="bg-blue-950/60 border border-blue-500/30 text-blue-400 text-[10px] px-2 py-0.5 font-bold rounded-none uppercase">Finished</span>
                            </td>
                            <td className="py-3 text-center text-slate-300">1 / 1</td>
                            <td className="py-3 text-amber-400 font-bold">⭐ 8.91</td>
                            <td className="py-3 text-right">
                              <div className="flex justify-end gap-1.5">
                                <button className="p-1 hover:bg-[#1d2433] text-slate-400 hover:text-white rounded-none transition-colors cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                                <button className="p-1 hover:bg-[#1d2433] text-slate-400 hover:text-purple-400 rounded-none transition-colors cursor-pointer"><Maximize2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-[#1d2433]/20 transition-colors">
                            <td className="py-3 flex items-center gap-3 pr-2">
                              <div className="w-9 h-12 bg-purple-900/30 border border-[#1d2433] shrink-0 flex items-center justify-center font-bold text-[10px] text-purple-300 uppercase">MT</div>
                              <div>
                                <div className="font-bold text-white leading-tight">Mushoku Tensei Season 2</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">Studio Bind</div>
                              </div>
                            </td>
                            <td className="py-3 text-slate-300">TV Series</td>
                            <td className="py-3">
                              <span className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-0.5 font-bold rounded-none uppercase">Airing</span>
                            </td>
                            <td className="py-3 text-center text-slate-300">12 / ?</td>
                            <td className="py-3 text-amber-400 font-bold">⭐ 8.78</td>
                            <td className="py-3 text-right">
                              <div className="flex justify-end gap-1.5">
                                <button className="p-1 hover:bg-[#1d2433] text-slate-400 hover:text-white rounded-none transition-colors cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
                                <button className="p-1 hover:bg-[#1d2433] text-slate-400 hover:text-purple-400 rounded-none transition-colors cursor-pointer"><Maximize2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="border-t border-[#1d2433] pt-3 text-center">
                      <a href="#" className="inline-block text-xs font-bold font-mono text-purple-400 hover:text-purple-300 hover:underline transition-all">
                        View All Anime →
                      </a>
                    </div>
                  </div>

                  {/* Leaderboard */}
                  <div className="xl:col-span-2 bg-[#111622] border border-[#1d2433] p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-[#1d2433] pb-3">
                      <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-white flex items-center gap-2">
                        <span className="inline-block w-1 h-4 bg-purple-500"></span>
                        Top Characters
                      </h2>
                      <a href="#" className="text-[10px] text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1 transition-colors">
                        View All <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="flex flex-col gap-2 font-mono">
                      <div className="flex items-center justify-between bg-[#0d111a] border border-[#1d2433] p-2 hover:border-[#a855f7]/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-purple-400 w-4 text-center">01</span>
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[1px]">
                            <div className="w-full h-full rounded-full bg-[#111622] flex items-center justify-center text-[10px] text-white font-black uppercase">SB</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Saber</div>
                            <div className="text-[9px] text-[#94a3b8] mt-0.5">Fate/Zero</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-amber-400 font-bold">⭐ 92%</span>
                          <span className="text-slate-400 border-l border-[#1d2433] pl-3 text-[11px]">♡ 12.4K</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-[#0d111a] border border-[#1d2433] p-2 hover:border-[#a855f7]/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-slate-500 w-4 text-center">02</span>
                          <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/30 p-[1px]">
                            <div className="w-full h-full rounded-full bg-[#111622] flex items-center justify-center text-[10px] text-cyan-400 font-black uppercase">RM</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Rem</div>
                            <div className="text-[9px] text-[#94a3b8] mt-0.5">Re:Zero</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-amber-400 font-bold">⭐ 89%</span>
                          <span className="text-slate-400 border-l border-[#1d2433] pl-3 text-[11px]">♡ 11.7K</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-[#0d111a] border border-[#1d2433] p-2 hover:border-[#a855f7]/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-slate-500 w-4 text-center">03</span>
                          <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 p-[1px]">
                            <div className="w-full h-full rounded-full bg-[#111622] flex items-center justify-center text-[10px] text-emerald-400 font-black uppercase">MA</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Mikasa Ackerman</div>
                            <div className="text-[9px] text-[#94a3b8] mt-0.5">Shingeki no Kyojin</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-amber-400 font-bold">⭐ 88%</span>
                          <span className="text-slate-400 border-l border-[#1d2433] pl-3 text-[11px]">♡ 9.8K</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-[#0d111a] border border-[#1d2433] p-2 hover:border-[#a855f7]/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-slate-500 w-4 text-center">04</span>
                          <div className="w-9 h-9 rounded-full bg-pink-500/20 border border-pink-500/30 p-[1px]">
                            <div className="w-full h-full rounded-full bg-[#111622] flex items-center justify-center text-[10px] text-pink-400 font-black uppercase">ZT</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Zero Two</div>
                            <div className="text-[9px] text-[#94a3b8] mt-0.5">Darling in the Franxx</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-amber-400 font-bold">⭐ 87%</span>
                          <span className="text-slate-400 border-l border-[#1d2433] pl-3 text-[11px]">♡ 9.1K</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-[#0d111a] border border-[#1d2433] p-2 hover:border-[#a855f7]/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-slate-500 w-4 text-center">05</span>
                          <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/30 p-[1px]">
                            <div className="w-full h-full rounded-full bg-[#111622] flex items-center justify-center text-[10px] text-amber-400 font-black uppercase">MS</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Mai Sakurajima</div>
                            <div className="text-[9px] text-[#94a3b8] mt-0.5">Bunny Girl Senpai</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-amber-400 font-bold">⭐ 86%</span>
                          <span className="text-slate-400 border-l border-[#1d2433] pl-3 text-[11px]">♡ 8.7K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT SIDEBAR COLUMN (25%) */}
              <div className="lg:col-span-1 flex flex-col gap-4">
                
                {/* PRIORITY 1: QUICK ACTIONS */}
                <QuickActions />

                {/* PRIORITY 2: TOTAL RELEASES CARD & REVIEW ACTIVITY GRAPH */}
                <div className="flex flex-col gap-4">
                  {/* Total Releases */}
                  <div className="bg-[#111622] border border-[#1d2433] p-4 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all pointer-events-none"></div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider font-mono">Total Releases</span>
                        <h3 className="text-2xl font-black text-white mt-1 font-mono tracking-tight group-hover:text-amber-400 transition-colors">
                          96,574
                        </h3>
                      </div>
                      <div className="p-2 bg-[#1d2433]/40 border border-[#1d2433] text-amber-400 group-hover:scale-110 transition-transform">
                        <Download className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-amber-400 font-mono font-bold">+1,742 this month</span>
                      <div className="w-24 h-8 shrink-0">
                        <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="amberGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path d={sparklinesData.releasesFill} fill="url(#amberGlow)" />
                          <path d={sparklinesData.releases} fill="none" stroke="#f59e0b" strokeWidth="1.5" className="drop-shadow-[0_0_3px_rgba(245,158,11,0.8)]" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-amber-500"></div>
                  </div>

                  {/* Review Activity */}
                  <div className="bg-[#111622] border border-[#1d2433] p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono">Review Activity</span>
                        <div className="text-base font-black font-mono text-white mt-0.5">4,789</div>
                      </div>
                      <span className="text-[9px] font-mono font-bold bg-amber-950/40 border border-emerald-500/20 text-amber-400 px-1.5 py-0.5 rounded-none">
                        +10.1%
                      </span>
                    </div>
                    
                    <div className="h-24 w-full mt-1 relative">
                      <svg className="w-full h-full" viewBox="0 0 200 80">
                        <line x1="0" y1="20" x2="200" y2="20" stroke="#1d2433" strokeDasharray="2 2" />
                        <line x1="0" y1="50" x2="200" y2="50" stroke="#1d2433" strokeDasharray="2 2" />
                        <line x1="66" y1="0" x2="66" y2="70" stroke="#1d2433" strokeDasharray="2 2" />
                        <line x1="133" y1="0" x2="133" y2="70" stroke="#1d2433" strokeDasharray="2 2" />
                        <path d="M 0,68 Q 40,40 80,48 T 140,15 T 200,8" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="drop-shadow-[0_0_2px_rgba(245,158,11,0.6)]" />
                        <text x="2" y="16" fill="#94a3b8" fontSize="8" className="font-mono">1K</text>
                        <text x="2" y="46" fill="#94a3b8" fontSize="8" className="font-mono">500</text>
                        <text x="2" y="68" fill="#94a3b8" fontSize="8" className="font-mono">0</text>
                        <text x="0" y="79" fill="#94a3b8" fontSize="8" className="font-mono">May 10</text>
                        <text x="75" y="79" fill="#94a3b8" fontSize="8" className="font-mono">May 25</text>
                        <text x="170" y="79" fill="#94a3b8" fontSize="8" className="font-mono">Jun 9</text>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* PRIORITY 3: FEED STREAMS (RECENT ACTIVITY & SYSTEM STATUS) */}
                <div className="flex flex-col gap-4">
                  {/* Recent Activity */}
                  <div className="bg-[#111622] border border-[#1d2433] p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-[#1d2433] pb-3">
                      <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-white flex items-center gap-2">
                        <span className="inline-block w-1 h-3.5 bg-purple-500"></span>
                        Recent Activity
                      </h2>
                      <a href="#" className="text-[9px] text-purple-400 hover:text-purple-300 font-mono flex items-center gap-0.5 transition-colors">
                        View All <ChevronDown className="w-3 h-3 inline rotate-270" />
                      </a>
                    </div>

                    <div className="flex flex-col gap-4 relative pl-3 border-l border-[#1d2433] ml-2.5 font-mono text-[11px] text-[#94a3b8]">
                      <div className="relative">
                        <div className="absolute -left-[20px] top-0.5 w-3.5 h-3.5 bg-purple-500 rounded-full border-2 border-[#111622]"></div>
                        <div className="flex justify-between items-start gap-1">
                          <div><span className="text-white font-bold">Ahmed Khan</span> approved anime edit request - <span className="text-purple-400">Shingeki no Kyojin Season 4</span></div>
                          <span className="text-[9px] text-slate-500 shrink-0 font-mono pl-1">2m ago</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[20px] top-0.5 w-3.5 h-3.5 bg-cyan-500 rounded-full border-2 border-[#111622]"></div>
                        <div className="flex justify-between items-start gap-1">
                          <div><span className="text-white font-bold">Tariq Hasan</span> created news post - <span className="text-cyan-400">Summer 2024 Anime Lineup Announced</span></div>
                          <span className="text-[9px] text-slate-500 shrink-0 font-mono pl-1">15m ago</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[20px] top-0.5 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-[#111622] flex items-center justify-center text-[7px] text-white">↓</div>
                        <div className="flex justify-between items-start gap-1">
                          <div>New fansub release added - <span className="text-blue-400 font-bold">One Piece - Episode 1123</span> by <span className="text-slate-300">StrawHat Fansubs</span></div>
                          <span className="text-[9px] text-slate-500 shrink-0 font-mono pl-1">28m ago</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[20px] top-0.5 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-[#111622] flex items-center justify-center text-[7px] text-white">★</div>
                        <div className="flex justify-between items-start gap-1">
                          <div>Character rating updated - <span className="text-amber-400 font-bold">Saber (Fate/Zero)</span> New rating: <span className="text-white">92%</span></div>
                          <span className="text-[9px] text-slate-500 shrink-0 font-mono pl-1">45m ago</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[20px] top-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#111622] flex items-center justify-center text-[7px] text-white">+</div>
                        <div className="flex justify-between items-start gap-1">
                          <div>User registered - <span className="text-emerald-400 font-bold">ZoroKing</span></div>
                          <span className="text-[9px] text-slate-500 shrink-0 font-mono pl-1">1h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="bg-[#111622] border border-[#1d2433] p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-[#1d2433] pb-3">
                      <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-white flex items-center gap-2">
                        <span className="inline-block w-1 h-3.5 bg-emerald-500"></span>
                        System Status
                      </h2>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                        <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider">Operational</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3 items-center">
                      <div className="col-span-2 flex items-center justify-center bg-[#0d111a] border border-[#1d2433] p-3 aspect-square relative group">
                        <div className="absolute inset-0.5 opacity-20 group-hover:opacity-40 transition-opacity">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="3 3" />
                          </svg>
                        </div>
                        <svg className="w-12 h-12 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] z-10" viewBox="0 0 100 100" fill="none">
                          <defs>
                            <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#a855f7" />
                              <stop offset="50%" stopColor="#6366f1" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                          <path d="M 50 10 L 85 22 L 85 55 C 85 78 50 90 50 90 C 50 90 15 78 15 55 L 15 22 Z" stroke="url(#shieldGrad)" strokeWidth="3.5" strokeLinejoin="bevel" />
                          <path d="M 50 20 L 75 29 L 75 53 C 75 70 50 80 50 80 C 50 80 25 70 25 53 L 25 29 Z" fill="#a855f7" fillOpacity="0.25" stroke="#a855f7" strokeWidth="1" />
                          <path d="M 50 35 L 50 65 M 35 50 L 65 50" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      </div>

                      <div className="col-span-3 flex flex-col gap-2 font-mono text-[10px]">
                        <div className="flex items-center justify-between border-b border-[#1d2433]/50 pb-1">
                          <span className="text-slate-400">Website:</span>
                          <span className="text-emerald-400 font-bold">Operational</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-[#1d2433]/50 pb-1">
                          <span className="text-slate-400">Database:</span>
                          <span className="text-emerald-400 font-bold">Operational</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-[#1d2433]/50 pb-1">
                          <span className="text-slate-400">Storage:</span>
                          <span className="text-emerald-400 font-bold">Operational</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Email:</span>
                          <span className="text-emerald-400 font-bold">Operational</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </>
        ) : (
          
          /* ========================================================================= */
          /* ======================== VIEW 2: UPLOAD ANIME FORM ======================= */
          /* ========================================================================= */
          <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full pt-4">
            
            {/* Title Bar / Header */}
            <div className="flex items-center justify-between border-b border-[#1d2433] pb-4">
              <div className="flex items-center gap-3">
                <span className="inline-block w-1 h-5 bg-purple-500"></span>
                <h1 className="text-lg font-black uppercase tracking-wider text-white font-mono">
                  Upload Anime
                </h1>
              </div>
              <button
                onClick={() => { setCurrentView("dashboard"); resetForm(); }}
                className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1 bg-[#111622] hover:bg-[#1d2433] border border-[#1d2433] px-3 py-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Dashboard</span>
              </button>
            </div>

            {/* FORM CONTAINER - Strictly square corners, subtle dark borders */}
            <div className="bg-[#111622] border border-[#1d2433] p-6 rounded-none relative overflow-hidden">
              
              {/* Grid backgrounds */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>

              {uploadSuccess ? (
                /* SUCCESS STATE CONTAINER */
                <div className="py-8 flex flex-col items-center justify-center text-center font-mono">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] mb-4 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Upload Completed</h3>
                  <p className="text-xs text-emerald-400 mt-1 uppercase max-w-md">
                    DATABASE RECORD CREATED SUCCESSFULLY. METADATA FILE WRITTEN.
                  </p>
                  
                  {/* Summary Block */}
                  <div className="mt-6 bg-[#0d111a] border border-[#1d2433] p-4 text-left text-xs text-slate-300 w-full max-w-md space-y-2">
                    <div className="text-purple-400 border-b border-[#1d2433] pb-1 font-bold text-[10px] uppercase">Upload Summary</div>
                    <div><span className="text-slate-500">Title:</span> {animeTitle}</div>
                    {videoFile && <div><span className="text-slate-500">Video File:</span> {videoFile.name} ({(videoFile.size / (1024*1024)).toFixed(1)} MB)</div>}
                    {thumbnailFile && <div><span className="text-slate-500">Thumbnail:</span> {thumbnailFile.name}</div>}
                    {animeDesc && <div className="line-clamp-2"><span className="text-slate-500">Description:</span> {animeDesc}</div>}
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={resetForm}
                      className="px-5 py-2 bg-[#0d111a] border border-[#1d2433] hover:border-purple-500/40 text-xs font-bold uppercase transition-all cursor-pointer"
                    >
                      Upload Another
                    </button>
                    <button
                      onClick={() => { setCurrentView("dashboard"); resetForm(); }}
                      className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                /* MAIN INPUT FORM */
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  
                  {/* ROW 1: VIDEO FILE UPLOAD */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
                    <div className="md:w-1/3 text-left">
                      <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                        upload anime
                      </label>
                      <p className="text-[10px] text-slate-500 mt-1">Accepts high definition mkv, mp4 source streams.</p>
                    </div>
                    
                    <div className="md:w-2/3">
                      <input 
                        type="file" 
                        ref={videoInputRef}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setVideoFile(e.target.files[0]);
                          }
                        }}
                        accept="video/*" 
                        className="hidden" 
                      />
                      
                      <div 
                        onClick={() => videoInputRef.current?.click()}
                        className="border-2 border-dashed border-[#1d2433] hover:border-purple-500/40 bg-[#0d111a] p-5 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2"
                      >
                        {videoFile ? (
                          <>
                            <FileVideo className="w-8 h-8 text-purple-400" />
                            <div className="text-xs text-white font-mono font-bold truncate max-w-full px-4">{videoFile.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono">({(videoFile.size / (1024*1024)).toFixed(1)} MB) - Click to change</div>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-8 h-8 text-slate-500 group-hover:text-purple-400" />
                            <span className="text-xs font-mono text-[#94a3b8] hover:text-white">
                              Click to select video stream
                            </span>
                            <span className="text-[9px] text-slate-600 font-mono">DRAG & DROP SUPPORTED</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ROW 2: TITLE INPUT */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
                    <div className="md:w-1/3 text-left">
                      <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                        Add title
                      </label>
                      <p className="text-[10px] text-slate-500 mt-1">Main metadata indexing name.</p>
                    </div>

                    <div className="md:w-2/3">
                      <input
                        type="text"
                        required
                        value={animeTitle}
                        onChange={(e) => setAnimeTitle(e.target.value)}
                        placeholder="Enter series or movie name"
                        className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-purple-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* ROW 3: DESCRIPTION TEXTAREA */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
                    <div className="md:w-1/3 text-left pt-1">
                      <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                        description
                      </label>
                      <p className="text-[10px] text-slate-500 mt-1">Short plot summary, characters, air time notes.</p>
                    </div>

                    <div className="md:w-2/3">
                      <textarea
                        value={animeDesc}
                        onChange={(e) => setAnimeDesc(e.target.value)}
                        placeholder="Enter anime plot synopsis..."
                        rows={4}
                        className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-purple-500/50 text-white px-3 py-2 outline-none font-mono text-xs rounded-none resize-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* ROW 4: THUMBNAIL IMAGE UPLOAD */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#1d2433]/70 pb-5 gap-4">
                    <div className="md:w-1/3 text-left">
                      <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                        thunmbnail
                      </label>
                      <p className="text-[10px] text-slate-500 mt-1">Anime poster upload. Recommended 3:4 ratio.</p>
                    </div>

                    <div className="md:w-2/3">
                      <input 
                        type="file" 
                        ref={thumbnailInputRef}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setThumbnailFile(e.target.files[0]);
                          }
                        }}
                        accept="image/*" 
                        className="hidden" 
                      />

                      <div 
                        onClick={() => thumbnailInputRef.current?.click()}
                        className="border-2 border-dashed border-[#1d2433] hover:border-purple-500/40 bg-[#0d111a] p-4 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-1"
                      >
                        {thumbnailFile ? (
                          <>
                            <ImageIcon className="w-6 h-6 text-cyan-400" />
                            <div className="text-xs text-white font-mono font-bold truncate max-w-full px-4">{thumbnailFile.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono">Click to change</div>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-6 h-6 text-slate-500" />
                            <span className="text-xs font-mono text-[#94a3b8] hover:text-white">
                              Upload poster image
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SIMULATED UPLOADING STATE PANEL */}
                  {isUploading && (
                    <div className="bg-[#0d111a] border border-[#1d2433] p-4 flex flex-col gap-3 font-mono">
                      <div className="flex items-center justify-between text-xs font-bold text-purple-400">
                        <span className="flex items-center gap-1.5">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          UPLOADING FILE CHUNKS...
                        </span>
                        <span>{uploadProgress}%</span>
                      </div>
                      
                      {/* Progress bar container */}
                      <div className="w-full bg-[#111622] h-1.5 border border-[#1d2433]">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-cyan-500 h-full transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.6)]"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>

                      {/* Console / Terminal logs */}
                      <div className="bg-[#050811] border border-[#1d2433] p-2.5 h-20 overflow-y-auto text-[9px] text-slate-400 flex flex-col gap-1 select-none">
                        <div className="text-cyan-500 font-bold border-b border-[#1d2433]/30 pb-0.5 flex items-center gap-1">
                          <Terminal className="w-3 h-3" /> STREAM_MONITOR_LOGS
                        </div>
                        {uploadLogs.map((log, idx) => (
                          <div key={idx} className="leading-tight truncate">{log}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* COMPONENT C: ACTION SUBMISSION BUTTON */}
                  <div className="flex items-center justify-center pt-2">
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="bg-[#7c3aed] text-white hover:bg-[#8b5cf6] font-bold text-xs uppercase py-2.5 px-8 transition-all duration-300 border border-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.35)] hover:shadow-[0_0_20px_rgba(168,85,247,0.55)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-none font-mono"
                    >
                      {isUploading ? "Processing..." : "Upload"}
                    </button>
                  </div>

                </form>
              )}

            </div>

          </div>
        )}

      </main>

      {/* DETECTABLE STICKY FOOTER ANCHOR */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#111622]/95 border-t border-[#1d2433] px-6 py-2.5 flex items-center justify-between text-[10px] font-mono text-[#94a3b8]">
        <div>
          © 2024 <span className="text-white font-bold">MugiSub Admin Panel</span>. All rights reserved.
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          <span>Version 1.0.0</span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-400 uppercase tracking-widest font-black">MUGISUB_SYS_4.2.1</span>
        </div>
      </footer>

    </div>
  );
}
