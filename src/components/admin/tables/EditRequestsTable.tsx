'use client';

import React, { useState } from 'react';
import { Search, Check, X, Eye, Wrench } from 'lucide-react';

const MOCK_REQUESTS = [
  { id: 'req_1', entityType: 'anime', field: 'title', original: 'Attack on Titan', proposed: 'Shingeki no Kyojin', user: 'WeebMaster99', status: 'pending', createdAt: '2026-06-16T10:00:00Z' },
  { id: 'req_2', entityType: 'character', field: 'description', original: 'A normal boy.', proposed: 'A boy who pilots an Eva.', user: 'NeonFan', status: 'pending', createdAt: '2026-06-15T14:30:00Z' },
  { id: 'req_3', entityType: 'creator', field: 'role', original: 'Director', proposed: 'Chief Director', user: 'AnimeHistorian', status: 'approved', createdAt: '2026-06-10T09:15:00Z' },
  { id: 'req_4', entityType: 'anime', field: 'airDate', original: '2026-04-01', proposed: '2026-04-15', user: 'ReleaseTracker', status: 'rejected', createdAt: '2026-06-12T16:45:00Z' },
  { id: 'req_5', entityType: 'character', field: 'image', original: 'old_url.jpg', proposed: 'new_hd_url.png', user: 'PicEditor', status: 'pending', createdAt: '2026-06-14T11:20:00Z' },
];

export default function EditRequestsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.entityType.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.field.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || req.status === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: action === 'approve' ? 'approved' : 'rejected' } : r));
  };

  const getEntityTypeBadge = (type: string) => {
    switch (type) {
      case 'anime': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'character': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'creator': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'approved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'rejected': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-yellow-500/50 text-white px-3 py-2 pl-9 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
        
        <div className="flex bg-[#0d111a] border border-[#1d2433] p-1">
          {['All', 'Pending', 'Approved', 'Rejected'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 text-xs font-mono transition-colors ${filter === tab ? 'bg-[#1d2433] text-yellow-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto border border-[#1d2433]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111622] border-b border-[#1d2433]">
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Entity</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Field</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Changes</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">User</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <tr key={req.id} className="bg-[#0d111a] border-b border-[#1d2433]/50 hover:bg-[#111622]/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border rounded-sm ${getEntityTypeBadge(req.entityType)}`}>
                      {req.entityType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-300 font-bold">{req.field}</td>
                  <td className="px-4 py-3 text-xs font-mono">
                    <div className="flex flex-col gap-1 max-w-xs">
                      <div className="text-rose-400 bg-rose-500/5 px-2 py-0.5 border-l-2 border-rose-500 truncate" title={req.original}>- {req.original}</div>
                      <div className="text-emerald-400 bg-emerald-500/5 px-2 py-0.5 border-l-2 border-emerald-500 truncate" title={req.proposed}>+ {req.proposed}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-300">{req.user}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border rounded-sm ${getStatusBadge(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="p-1.5 bg-[#111622] border border-[#1d2433] hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-colors group"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      </button>
                      {req.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleAction(req.id, 'approve')}
                            className="p-1.5 bg-[#111622] border border-[#1d2433] hover:border-emerald-500/50 text-slate-400 hover:text-emerald-400 transition-colors group"
                            title="Approve Request"
                          >
                            <Check className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                          </button>
                          <button 
                            onClick={() => handleAction(req.id, 'reject')}
                            className="p-1.5 bg-[#111622] border border-[#1d2433] hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition-colors group"
                            title="Reject Request"
                          >
                            <X className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-xs font-mono text-slate-500 bg-[#0d111a]">
                  No edit requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
