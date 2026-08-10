'use client';

import React, { useState } from 'react';
import { RotateCcw, Database, User, Film, Video, Trash2 } from 'lucide-react';

const SH = ({ t }: { t: string }) => (
    <div className="bg-[#2e384d] text-[#ddd] font-bold uppercase tracking-wide px-3 py-[5px] text-[11px] border-b border-[#1f2635] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
        {t}
    </div>
);

interface LogEntry {
    time: string;
    category: string;
    message: string;
    color: string;
}

const DEFAULT_COLORS: Record<string, string> = {
    SYSTEM: 'text-[#e2e8f0]',
    DB: 'text-[#4ade80]',
    ADMIN: 'text-[#60a5fa]',
    ANIME: 'text-[#f472b6]',
    EPISODE: 'text-[#a78bfa]',
    USER: 'text-[#fbbf24]',
    WARN: 'text-[#f87171]',
    ERROR: 'text-[#ef4444]',
};

const makeLogEntry = (category: string, message: string, color?: string): LogEntry => {
    const now = new Date();
    return {
        time: now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category,
        message,
        color: color || DEFAULT_COLORS[category] || 'text-[#94a3b8]',
    };
};

const getInitialLogs = (): LogEntry[] => [
    makeLogEntry('SYSTEM', 'MugiSub Admin Terminal initialized.'),
    makeLogEntry('DB', 'Database connection pool established.'),
    makeLogEntry('ADMIN', 'Session authenticated — Admin Panel active.'),
    makeLogEntry('SYSTEM', 'All systems operational. Waiting for commands...'),
];

export default function AdminTerminalPage() {
    const [logs, setLogs] = useState<LogEntry[]>(getInitialLogs);
    const [filter, setFilter] = useState<string>('ALL');

    const addLog = (category: string, message: string, color?: string) => {
        setLogs(prev => [makeLogEntry(category, message, color), ...prev]);
    };

    const categories = ['ALL', 'SYSTEM', 'DB', 'ADMIN', 'ANIME', 'EPISODE', 'USER', 'WARN', 'ERROR'];

    const filteredLogs = filter === 'ALL' ? logs : logs.filter(l => l.category === filter);

    return (
        <div className="flex flex-col h-[calc(100vh-60px)] bg-[#1a202c]">
            <SH t="SYSTEM TERMINAL — ACTION HISTORY" />

            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2e384d] bg-[#1f2635]">
                <div className="flex flex-wrap items-center gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 border transition-colors cursor-pointer ${
                                filter === cat
                                    ? 'bg-[#1a5c36] border-[#236b40] text-white'
                                    : 'bg-[#2e384d] border-[#3b4358] text-[#94a3b8] hover:bg-[#3b4358] hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setLogs([]);
                            addLog('SYSTEM', 'Terminal logs cleared by administrator.');
                        }}
                        className="flex items-center gap-1.5 bg-[#a11f1f] hover:bg-[#c02222] text-white text-[9px] font-bold uppercase px-3 py-1.5 border border-[#7a1515] transition-colors cursor-pointer"
                    >
                        <Trash2 size={11} /> Clear
                    </button>
                    <button
                        onClick={() => {
                            addLog('SYSTEM', 'Terminal context refreshed.');
                            addLog('DB', 'Schema cache revalidated.');
                        }}
                        className="flex items-center gap-1.5 bg-[#1f3e70] hover:bg-[#254d8c] text-white text-[9px] font-bold uppercase px-3 py-1.5 border border-[#15305a] transition-colors cursor-pointer"
                    >
                        <RotateCcw size={11} /> Refresh
                    </button>
                </div>
            </div>

            {/* Terminal output */}
            <div
                className="flex-1 overflow-y-auto font-mono text-[11px] space-y-0.5 p-4"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#1a5c36 #0d1117' }}
            >
                {filteredLogs.length === 0 ? (
                    <div className="text-[#4ade80]/40 italic text-center py-10">
                        No logs match the selected filter. Perform an action to see history.
                    </div>
                ) : (
                    filteredLogs.map((log, i) => (
                        <div
                            key={i}
                            className={`${log.color} hover:bg-white/5 px-1 py-[2px] border-l-2 border-transparent hover:border-[#4ade80] transition-colors flex items-start gap-3`}
                        >
                            <span className="text-[#64748b] shrink-0 select-none">[{log.time}]</span>
                            <span className="shrink-0 font-bold w-14 select-none">{log.category}</span>
                            <span className="text-[#cbd5e1] break-words">: {log.message}</span>
                        </div>
                    ))
                )}
            </div>

            {/* Summary stats bar */}
            <div className="px-4 py-2 border-t border-[#2e384d] bg-[#1f2635] flex flex-wrap items-center justify-between gap-2 text-[9px] font-mono text-[#94a3b8] uppercase tracking-wider">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Database size={11} className="text-[#4ade80]" /> DB: OK</span>
                    <span className="flex items-center gap-1"><User size={11} className="text-[#60a5fa]" /> Session: ACTIVE</span>
                    <span className="flex items-center gap-1"><Film size={11} className="text-[#f472b6]" /> Anime: Loaded</span>
                    <span className="flex items-center gap-1"><Video size={11} className="text-[#a78bfa]" /> Episodes: Loaded</span>
                </div>
                <div className="text-[#94a3b8]">
                    Showing {filteredLogs.length} / {logs.length} total entries
                </div>
            </div>
        </div>
    );
}
