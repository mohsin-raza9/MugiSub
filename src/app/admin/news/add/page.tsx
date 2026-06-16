import React from 'react';
import Link from 'next/link';
import {
  Menu,
  Search,
  Bell,
  Moon,
  ArrowLeft,
  FileText,
  Newspaper,
} from 'lucide-react';
import NewsForm from '@/components/admin/forms/NewsForm';

export const metadata = {
  title: 'Post News | MugiSub Admin',
  description: 'Publish a new news post to the MugiSub platform.',
};

export default function AddNewsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f18] text-[#e2e8f0] font-sans antialiased">

      {/* ── Ambient background glows ─────────────────────────────────────── */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-900/8 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-10 left-10 w-[300px] h-[300px] bg-purple-900/6 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* ── Top Navigation Bar ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full bg-[#111622]/90 backdrop-blur-md border-b border-[#1d2433] px-4 py-2 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-[#1d2433]/50">
            <Menu className="w-5 h-5" />
          </button>

          {/* Global Search */}
          <div className="relative flex items-center w-[250px]">
            <span className="absolute left-3 text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search anime, users, releases… [Ctrl K]"
              className="w-full bg-[#0d111a] border border-[#1d2433] text-xs py-1.5 pl-9 pr-3 outline-none text-[#e2e8f0] focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/30 transition-all font-mono"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Back to Dashboard */}
          <Link
            href="/admin"
            className="text-xs bg-[#121824] border border-[#1d2433] hover:border-pink-500/60 text-slate-300 hover:text-white px-3 py-1 font-mono transition-all flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Bell */}
          <button className="relative p-1.5 bg-[#0d111a] border border-[#1d2433] hover:bg-[#111622] transition-colors cursor-pointer">
            <Bell className="w-4 h-4 text-pink-400" />
            <span className="absolute -top-1.5 -right-1.5 bg-pink-600 text-[9px] font-bold text-white px-1 py-0.5 rounded-full leading-none border border-[#0a0f18] animate-pulse">
              12
            </span>
          </button>

          {/* Theme */}
          <button className="p-1.5 bg-[#0d111a] border border-[#1d2433] hover:bg-[#111622] transition-colors text-slate-400 hover:text-cyan-400">
            <Moon className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-2 border-l border-[#1d2433] pl-4">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-tr from-pink-600 to-cyan-500 p-[1.5px] shadow-[0_0_8px_rgba(236,72,153,0.3)]">
                <div className="w-full h-full bg-[#111622] flex items-center justify-center font-bold text-[11px] text-white">
                  TH
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#111622] rounded-full" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">Tariq Hasan</span>
              <span className="text-[9px] text-pink-400 uppercase font-mono font-bold tracking-wider leading-none mt-0.5">
                Administrator
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main className="relative z-10 mx-auto max-w-[900px] px-4 pt-10 pb-20">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 mb-6">
          <Link href="/admin" className="hover:text-pink-400 transition-colors">admin</Link>
          <span>/</span>
          <span className="text-slate-400">news</span>
          <span>/</span>
          <span className="text-pink-400">add</span>
        </div>

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-pink-500/10 border border-pink-500/20 text-pink-400">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white leading-none">post news</h1>
            <p className="text-[11px] font-mono text-slate-500 mt-1">
              Publish a news post visible to all platform users.
            </p>
          </div>
        </div>

        {/* Thin divider */}
        <div className="border-b border-[#1d2433] mb-8" />

        {/* ── Status chip ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-pink-400 border border-pink-500/20 bg-pink-500/5 px-2 py-1">
            <FileText className="w-3 h-3" />
            new post
          </span>
          <span className="text-[10px] font-mono text-slate-600">
            — draft will be published immediately on submit
          </span>
        </div>

        {/* ── Form ────────────────────────────────────────────────────────── */}
        <NewsForm />

        {/* ── Footer hint ─────────────────────────────────────────────────── */}
        <p className="mt-6 text-center text-[10px] font-mono text-slate-600">
          Posts are published instantly · No markdown preview yet
        </p>
      </main>
    </div>
  );
}
