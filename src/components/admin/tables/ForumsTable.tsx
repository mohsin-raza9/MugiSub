'use client';

import React, { useState } from 'react';
import { Search, Eye, Lock, Trash2, MessageCircle } from 'lucide-react';

const MOCK_THREADS = [
  { id: 'th_1', title: 'Welcome to MugiSub Forums!', category: 'Announcements', creator: 'Tariq Hasan', posts: 142, views: 5200, createdAt: '2026-06-01T10:00:00Z', isLocked: true },
  { id: 'th_2', title: 'Spring 2026 Anime Discussion', category: 'General Discussion', creator: 'Alice Smith', posts: 328, views: 8900, createdAt: '2026-06-05T14:30:00Z', isLocked: false },
  { id: 'th_3', title: 'How to download episodes?', category: 'Support', creator: 'Bob Jones', posts: 5, views: 120, createdAt: '2026-06-10T09:15:00Z', isLocked: false },
  { id: 'th_4', title: 'Looking for translators!', category: 'Recruitment', creator: 'Charlie Doe', posts: 12, views: 450, createdAt: '2026-06-12T16:45:00Z', isLocked: false },
  { id: 'th_5', title: 'Off-topic spam thread', category: 'Off-Topic', creator: 'Spammer123', posts: 89, views: 300, createdAt: '2026-06-15T11:20:00Z', isLocked: true },
];

export default function ForumsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [threads, setThreads] = useState(MOCK_THREADS);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredThreads = threads.filter(thread => 
    thread.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    thread.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLock = (id: string) => {
    setThreads(threads.map(t => t.id === id ? { ...t, isLocked: !t.isLocked } : t));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this thread and all its posts?')) {
      setThreads(threads.filter(t => t.id !== id));
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Announcements': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'General Discussion': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Support': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Recruitment': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search threads by title or creator..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-teal-500/50 text-white px-3 py-2 pl-9 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
        <div className="text-[10px] text-slate-500 font-mono">
          Showing {filteredThreads.length} of {threads.length} threads
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto border border-[#1d2433]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111622] border-b border-[#1d2433]">
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Thread Title</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Creator</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider text-right">Posts</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider text-right">Views</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Created</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredThreads.length > 0 ? (
              filteredThreads.map((thread) => (
                <tr key={thread.id} className="bg-[#0d111a] border-b border-[#1d2433]/50 hover:bg-[#111622]/50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-white font-bold max-w-[200px] truncate">
                    <div className="flex items-center gap-2">
                      {thread.isLocked && <Lock className="w-3 h-3 text-amber-500" />}
                      <span title={thread.title}>{thread.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border rounded-sm ${getCategoryBadgeColor(thread.category)}`}>
                      {thread.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-300">{thread.creator}</td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-300 text-right">{thread.posts.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-300 text-right">{thread.views.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-400">
                    {new Date(thread.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="p-1.5 bg-[#111622] border border-[#1d2433] hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-colors group"
                        title="View Thread"
                      >
                        <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleLock(thread.id)}
                        className={`p-1.5 bg-[#111622] border border-[#1d2433] transition-colors group ${thread.isLocked ? 'hover:border-emerald-500/50 text-amber-500 hover:text-emerald-400' : 'hover:border-amber-500/50 text-slate-400 hover:text-amber-400'}`}
                        title={thread.isLocked ? "Unlock Thread" : "Lock Thread"}
                      >
                        <Lock className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleDelete(thread.id)}
                        className="p-1.5 bg-[#111622] border border-[#1d2433] hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition-colors group"
                        title="Delete Thread"
                      >
                        <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-xs font-mono text-slate-500 bg-[#0d111a]">
                  No threads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
