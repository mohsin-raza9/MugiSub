'use client';

import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, ShieldAlert, AlertTriangle } from 'lucide-react';

const MOCK_REPORTS = [
  { id: 'rep_1', type: 'Review', reason: 'Inappropriate language and harassment.', target: 'Review #492 (Attack on Titan)', reportedBy: 'UserA', severity: 'Critical', status: 'Open', createdAt: '2026-06-16T10:00:00Z' },
  { id: 'rep_2', type: 'Forum Post', reason: 'Spam/Advertisement', target: 'Post #89 (Watch Anime Free link)', reportedBy: 'ModBot', severity: 'High', status: 'Open', createdAt: '2026-06-15T14:30:00Z' },
  { id: 'rep_3', type: 'User Profile', reason: 'NSFW Avatar', target: 'User "GokuFan"', reportedBy: 'Anonymous', severity: 'Medium', status: 'Resolved', createdAt: '2026-06-10T09:15:00Z' },
  { id: 'rep_4', type: 'Comment', reason: 'Spoilers without tag', target: 'Comment on Ep 12', reportedBy: 'SpoilerHater', severity: 'Low', status: 'Dismissed', createdAt: '2026-06-12T16:45:00Z' },
  { id: 'rep_5', type: 'Review', reason: 'Trolling/Review Bombing', target: 'Review #10 (Evangelion)', reportedBy: 'EvaFan', severity: 'Medium', status: 'Open', createdAt: '2026-06-14T11:20:00Z' },
];

export default function ReportsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [reports, setReports] = useState(MOCK_REPORTS);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredReports = reports.filter(rep => {
    const matchesSearch = rep.target.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rep.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rep.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || rep.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAction = (id: string, action: 'resolve' | 'dismiss') => {
    setReports(reports.map(r => r.id === id ? { ...r, status: action === 'resolve' ? 'Resolved' : 'Dismissed' } : r));
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Low': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Resolved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Dismissed': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
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
            placeholder="Search reports..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-[#0d111a] border border-[#1d2433] focus:border-rose-500/50 text-white px-3 py-2 pl-9 outline-none font-mono text-xs rounded-none transition-colors"
          />
        </div>
        
        <div className="flex bg-[#0d111a] border border-[#1d2433] p-1">
          {['All', 'Open', 'Resolved', 'Dismissed'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 text-xs font-mono transition-colors ${filter === tab ? 'bg-[#1d2433] text-rose-400' : 'text-slate-500 hover:text-slate-300'}`}
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
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Target</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Reason</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Reported By</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Severity</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((req) => (
                <tr key={req.id} className="bg-[#0d111a] border-b border-[#1d2433]/50 hover:bg-[#111622]/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-mono text-white font-bold">{req.target}</span>
                      <span className="text-[10px] font-mono text-slate-500">{req.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-300 max-w-xs truncate" title={req.reason}>{req.reason}</td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-400">{req.reportedBy}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border rounded-sm ${getSeverityBadge(req.severity)}`}>
                      {req.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border rounded-sm ${getStatusBadge(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {req.status === 'Open' && (
                        <>
                          <button 
                            onClick={() => handleAction(req.id, 'resolve')}
                            className="p-1.5 bg-[#111622] border border-[#1d2433] hover:border-emerald-500/50 text-slate-400 hover:text-emerald-400 transition-colors group"
                            title="Resolve Issue"
                          >
                            <CheckCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                          </button>
                          <button 
                            onClick={() => handleAction(req.id, 'dismiss')}
                            className="p-1.5 bg-[#111622] border border-[#1d2433] hover:border-slate-500/50 text-slate-400 hover:text-slate-300 transition-colors group"
                            title="Dismiss Report"
                          >
                            <XCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                          </button>
                          <button 
                            className="p-1.5 bg-[#111622] border border-[#1d2433] hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition-colors group"
                            title="Ban User"
                          >
                            <ShieldAlert className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
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
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
