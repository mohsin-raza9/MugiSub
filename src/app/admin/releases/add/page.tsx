import React from 'react';
import Link from 'next/link';
import { Menu, Search, Bell, Moon, ArrowLeft, Download } from 'lucide-react';
import ReleaseForm from '@/components/admin/forms/ReleaseForm';

export const metadata = {
  title: 'Add Release | MugiSub Admin',
  description: 'Register a new fansub release file for an episode.',
};

export default function AddReleasePage() {
  return (
    <div className="min-h-screen bg-[#0a0f18] text-[#e2e8f0] font-sans antialiased">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-900/8 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-10 left-10 w-[300px] h-[300px] bg-amber-900/5 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-[#111622]/90 backdrop-blur-md border-b border-[#1d2433] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-[#1d2433]/50">
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative flex items-center w-[250px]">
            <span className="absolute left-3 text-slate-500"><Search className="w-4 h-4" /></span>
            <input type="text" placeholder="Search anime, users, releases… [Ctrl K]"
              className="w-full bg-[#0d111a] border border-[#1d2433] text-xs py-1.5 pl-9 pr-3 outline-none text-[#e2e8f0] focus:border-[#a855f7]/60 focus:ring-1 focus:ring-[#a855f7]/30 transition-all font-mono" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-xs bg-[#121824] border border-[#1d2433] hover:border-[#a855f7]/60 text-slate-300 hover:text-white px-3 py-1 font-mono transition-all flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /><span>Back to Dashboard</span>
          </Link>
          <button className="relative p-1.5 bg-[#0d111a] border border-[#1d2433] hover:bg-[#111622] transition-colors cursor-pointer">
            <Bell className="w-4 h-4 text-purple-400" />
            <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-[9px] font-bold text-white px-1 py-0.5 rounded-full leading-none border border-[#0a0f18] animate-pulse">12</span>
          </button>
          <button className="p-1.5 bg-[#0d111a] border border-[#1d2433] hover:bg-[#111622] transition-colors text-slate-400 hover:text-amber-400">
            <Moon className="w-4 h-4 text-cyan-400" />
          </button>
          <div className="flex items-center gap-2 border-l border-[#1d2433] pl-4">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1.5px] shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                <div className="w-full h-full bg-[#111622] flex items-center justify-center font-bold text-[11px] text-white">TH</div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#111622] rounded-full" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">Tariq Hasan</span>
              <span className="text-[9px] text-purple-400 uppercase font-mono font-bold tracking-wider leading-none mt-0.5">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-4xl px-4 pt-10 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 mb-6">
          <Link href="/admin" className="hover:text-purple-400 transition-colors">admin</Link>
          <span>/</span>
          <span className="text-slate-400">releases</span>
          <span>/</span>
          <span className="text-amber-400">add</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between border-b border-[#1d2433] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-wider text-white font-mono">Add Release</h1>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5">Register a new fansub release file for an episode.</p>
            </div>
          </div>
          <Link href="/admin" className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1 bg-[#111622] hover:bg-[#1d2433] border border-[#1d2433] px-3 py-1.5 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /><span>Return to Dashboard</span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-[#111622] border border-[#1d2433] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <ReleaseForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#111622]/95 border-t border-[#1d2433] px-6 py-2.5 flex items-center justify-between text-[10px] font-mono text-[#94a3b8]">
        <div>© 2024 <span className="text-white font-bold">MugiSub Admin Panel</span>. All rights reserved.</div>
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          <span>Version 1.0.0</span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-400 uppercase tracking-widest font-black">MUGISUB_SYS_4.2.1</span>
        </div>
      </footer>
    </div>
  );
}
