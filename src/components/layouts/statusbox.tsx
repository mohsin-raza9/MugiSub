'use client';

import React from 'react';

const SH = ({ t }: { t: string }) => (
  <div className="bg-[#2e384d] text-[#ddd] font-bold uppercase tracking-wide px-3 py-[5px] text-[11px] border-b border-[#1f2635] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
    {t}
  </div>
);

export default function Statusbox() {
  return (
    <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
      <SH t="Health Indicators" />
      <div className="p-2 space-y-1.5">
        {[
          { key: 'API_GW', val: 'OPERATIONAL', c: '#4ade80' },
          { key: 'DB_NODE', val: 'CONNECTED', c: '#4ade80' },
          { key: 'CDN', val: 'EDGE_OK', c: '#4ade80' },
          { key: 'AUTH', val: 'SESSION_ACTIVE', c: '#60a5fa' },
        ].map(h => (
          <div key={h.key} className="flex items-center justify-between text-[10px] font-mono px-1">
            <span className="text-[#34394d] font-bold">{h.key}</span>
            <span className="font-bold" style={{ color: h.c }}>{h.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}