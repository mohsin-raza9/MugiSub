import React from 'react';
import { 
  Home, Search, Calendar, Clock, Shuffle, Flame, Tv, Film, 
  Gamepad2, Clapperboard, Users, UserCog, Info, Mail, 
  ShieldCheck, AlertTriangle, FileText, Edit3, Plus, MessageSquare 
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
export default function AnimeDetailsPage() {
  return (
    <div className="flex min-h-screen bg-[#d1d5db] font-sans text-[#1f2937]">
      
      {/* 1. SIDEBAR */}
      <aside className="w-[220px] bg-[#cbd5e1] border-r border-[#94a3b8] flex flex-col shrink-0">
        
        {/* MENU SECTION */}
        <div className="mb-4">
          <h4 className="bg-[#2d3748] text-white px-3 py-1.5 text-xs font-bold tracking-wider m-0">MENU</h4>
          <nav className="flex flex-col">
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Home size={16} /> Home</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Search size={16} /> Search</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Calendar size={16} /> Season Chart</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Clock size={16} /> Schedule</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Shuffle size={16} /> Random</a>
          </nav>
        </div>

        {/* BROWSE SECTION */}
        <div className="mb-4">
          <h4 className="bg-[#2d3748] text-white px-3 py-1.5 text-xs font-bold tracking-wider m-0">BROWSE</h4>
          <nav className="flex flex-col">
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Flame size={16} /> Latest</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Tv size={16} /> Anime</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Film size={16} /> Movies</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Tv size={16} /> TV Shows</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Gamepad2 size={16} /> Games</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Clapperboard size={16} /> Series</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Users size={16} /> Creators</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><UserCog size={16} /> Admin</a>
          </nav>
        </div>

        {/* INFO SECTION */}
        <div className="mb-4">
          <h4 className="bg-[#2d3748] text-white px-3 py-1.5 text-xs font-bold tracking-wider m-0">INFO</h4>
          <nav className="flex flex-col">
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Info size={16} /> About Us</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><Mail size={16} /> Contact Us</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><ShieldCheck size={16} /> Privacy Policy</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><AlertTriangle size={16} /> Disclaimer</a>
            <a href="#" className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#374151] hover:bg-[#94a3b8] transition-colors"><FileText size={16} /> Terms & Condi...</a>
          </nav>
        </div>

        {/* LOGGED IN USER FOOTER */}
        <div className="mt-auto">
          <h4 className="bg-[#2d3748] text-white px-3 py-1.5 text-xs font-bold tracking-wider m-0">LOGGED IN</h4>
          <div className="p-4 text-xs text-[#991b1b] font-bold tracking-wide">dev@mugisub.com</div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-5 overflow-y-auto">
        
        {/* Top Dark Header */}
        <div className="bg-[#2d3748] text-white px-4 py-2.5 mb-5 rounded-sm shadow-sm">
          <h2 className="m-0 text-lg font-semibold">Anime: Kimi ga Shinu made Koi o Shitai</h2>
        </div>

        {/* Layout Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5">
          
          {/* LEFT COLUMN: Actions, Poster & Info Table */}
          <div className="flex flex-col gap-4">
            
            {/* Action Top Buttons */}
            <div className="flex gap-1.5">
              <button className="bg-[#4a5568] hover:bg-[#374151] text-white border-none px-2.5 py-1.5 text-xs font-medium cursor-pointer flex items-center gap-1 rounded-sm transition-colors shadow-sm">
                <Edit3 size={12} /> Edit Entry
              </button>
              <button className="bg-[#4a5568] hover:bg-[#374151] text-white border-none px-2.5 py-1.5 text-xs font-medium cursor-pointer flex items-center gap-1 rounded-sm transition-colors shadow-sm">
                <Plus size={12} /> Add/Edit Titles
              </button>
            </div>
            
            {/* Poster Card */}
            <div className="bg-white border border-[#a1a1aa] aspect-[3/4] flex items-center justify-center rounded-sm shadow-sm overflow-hidden group">
              {/* actual image can be used via <Image src="..." /> */}
              <span className="text-[#71717a] text-sm group-hover:scale-105 transition-transform duration-200">Anime Poster Image</span>
            </div>

            {/* Anime Info Table */}
            <div className="bg-white border border-[#94a3b8] rounded-sm shadow-sm overflow-hidden">
              <div className="bg-[#e2e8f0] px-3 py-1.5 text-xs font-bold border-b border-[#94a3b8]">Info</div>
              <div className="flex flex-col">
                <div className="flex justify-between px-3 py-2 text-xs border-b border-[#e2e8f0] hover:bg-slate-50">
                  <span className="font-bold text-[#4b5563]">Main Title</span>
                  <span>Kimi ga Shinu made Koi o Shitai</span>
                </div>
                <div className="flex justify-between px-3 py-2 text-xs border-b border-[#e2e8f0] hover:bg-slate-50">
                  <span className="font-bold text-[#4b5563]">Type</span>
                  <span>TV Series</span>
                </div>
                <div className="flex justify-between px-3 py-2 text-xs border-b border-[#e2e8f0] hover:bg-slate-50">
                  <span className="font-bold text-[#4b5563]">Season</span>
                  <span>Summer 2026</span>
                </div>
                <div className="flex justify-between px-3 py-2 text-xs hover:bg-slate-50">
                  <span className="font-bold text-[#4b5563]">Year</span>
                  <span>21.06.2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Synopsis, Stats, Forums, Cast */}
          <div className="flex flex-col gap-4">
            
            {/* Synopsis Box */}
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-4 rounded-sm shadow-sm">
              <p className="text-sm leading-relaxed m-0 mb-2.5 text-gray-700">
                Death lurks behind a mysterious orphanage where children train to become magical weapons of war. 
                Among them is Sheena, who longs to stop the fighting and end the conflict. The mysterious girl turns out to be a secret weapon—an immortal child soldier named Mimi.
              </p>
              <div className="italic text-xs text-[#64748b]">Source: Kodansha</div>
            </div>

            {/* Statistics */}
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="bg-[#e2e8f0] border border-[#cbd5e1] p-3.5 text-center rounded-sm shadow-xs">
                <span className="block text-[11px] font-bold text-[#475569] uppercase">Score/Rank By</span>
                <span className="text-base font-bold text-[#1e3a8a]">#9076</span>
              </div>
              <div className="bg-[#e2e8f0] border border-[#cbd5e1] p-3.5 text-center rounded-sm shadow-xs">
                <span className="block text-[11px] font-bold text-[#475569] uppercase">Favourites</span>
                <span className="text-base font-bold text-[#1e3a8a]">#9119</span>
              </div>
              <div className="bg-[#e2e8f0] border border-[#cbd5e1] p-3.5 text-center rounded-sm shadow-xs">
                <span className="block text-[11px] font-bold text-[#475569] uppercase">Running Time</span>
                <span className="text-base font-bold text-[#1e3a8a]">approx. 1h 40m</span>
              </div>
            </div>

            {/* Discussions */}
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">Newest Discussions</h3>
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-3.5 rounded-sm shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 text-sm">
                <div className="flex items-center gap-1.5 font-medium text-gray-800">
                  <MessageSquare size={15} className="text-blue-600" /> Comments
                  <span className="text-[#b91c1c] font-bold ml-1">by dorainam</span>
                </div>
                <div className="text-xs text-[#64748b]">Replies: 3 | Views: 201</div>
              </div>
            </div>

            {/* Tags Section */}
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">Tags</h3>
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-3.5 rounded-sm shadow-sm">
              <div className="flex gap-2 flex-wrap">
                <span className="bg-[#eff6ff] border border-[#bfdbfe] color-[#1e40af] px-2.5 py-1 rounded-md text-xs font-semibold text-blue-800">shoujo ai</span>
                <span className="bg-[#eff6ff] border border-[#bfdbfe] color-[#1e40af] px-2.5 py-1 rounded-md text-xs font-semibold text-blue-800">magic school</span>
                <span className="bg-[#eff6ff] border border-[#bfdbfe] color-[#1e40af] px-2.5 py-1 rounded-md text-xs font-semibold text-blue-800">fantasy</span>
                <span className="bg-[#eff6ff] border border-[#bfdbfe] color-[#1e40af] px-2.5 py-1 rounded-md text-xs font-semibold text-blue-800">speculative fiction</span>
              </div>
            </div>

            {/* Character Cast Section */}
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mt-2">Cast</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white border border-[#cbd5e1] p-3 flex gap-3 items-center rounded-sm shadow-xs hover:border-blue-400 transition-colors">
                <div className="w-10 height-10 bg-[#cbd5e1] rounded-full flex items-center justify-center text-[10px] text-gray-600 shrink-0 aspect-square">Mimi</div>
                <div>
                  <div className="font-bold text-sm text-[#1e40af]">Kagari Mimi</div>
                  <div className="text-[11px] text-[#64748b]">Main Character - Voiced by Hidaka Rina</div>
                </div>
              </div>
              <div className="bg-white border border-[#cbd5e1] p-3 flex gap-3 items-center rounded-sm shadow-xs hover:border-blue-400 transition-colors">
                <div className="w-10 height-10 bg-[#cbd5e1] rounded-full flex items-center justify-center text-[10px] text-gray-600 shrink-0 aspect-square">Sheena</div>
                <div>
                  <div className="font-bold text-sm text-[#1e40af]">Totsuki Sheena</div>
                  <div className="text-[11px] text-[#64748b]">Main Character - Voiced by Takahashi Rie</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}