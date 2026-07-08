import { PlusCircle } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

const Statusbox = () => {
    return (
        <Fragment>
              <div className="bg-[#bdbfc3] border border-[#8c8f94] shadow-[1px_1px_2px_rgba(0,0,0,0.2)]">
              <div className="bg-[#2a3243] text-white font-mono font-bold text-[10px] tracking-wider px-2 py-1.5 uppercase border-b border-[#1a202c]">
                Status
              </div>
              <div className="p-2 space-y-2.5">
                {[
                  { label: 'SERVER', value: '42%', pct: 42, color: '#1a5c36' },
                  { label: 'DB_LAT', value: '24ms', pct: 20, color: '#1f3e70' },
                  { label: 'API_UP', value: '99.98%', pct: 99, color: '#1a5c36' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-[9px] font-mono text-[#222735] mb-1 font-bold">
                      <span>{s.label}</span>
                      <span>{s.value}</span>
                    </div>
                    <div className="h-2 bg-[#9fa2a8] border-t border-l border-[#787b80]">
                      <div className="h-full" style={{ width: `${s.pct}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </Fragment>
    );
}

export default Statusbox