import Link from "next/link";
 
export default function News() {
  return (
    <div className="w-full font-sans text-[11px] flex flex-col h-full">
 
      {/* ── Sub-header bar ── */}
      <div className="text-black py-1.5 flex items-center justify-between border-b border-[#999]">
        <h2 className="font-bold text-[15px] m-0">News</h2>
        <a
          href="#"
          className="bg-[#34394d] hover:bg-[#12151f] shadow-[0_1px_2px_0_rgba(0,0,0,0.3)] text-[#ccc] text-[10px] px-2 py-0.5 border border-[#3e455c] flex items-center gap-1 transition-colors font-sans"
        >
          <span>☰ Show Post</span>
        </a>
      </div>
 
      {/* ── Body panel — flex-1 so it fills remaining height like MugiSub ── */}
      <div className="flex-1 mt-1.5 p-4 rounded-sm text-black text-[11px] leading-relaxed space-y-3 border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
 
        {/* Title row + timestamp */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 border-b border-gray-400/40 pb-1.5 mb-2">
          <a
            href="#"
            className="text-[#a11f1f] text-[12px] font-bold hover:underline leading-tight"
          >
            [Patreon] Major Change to Patreon Platform... Again
          </a>
          <span className="text-[10px] text-gray-700 italic shrink-0">
            posted on 02.02.2026 05:21 by CDB-Man
          </span>
        </div>
 
        {/* Post heading */}
        <h3 className="text-[12px] font-bold text-black m-0 font-sans">
          Major Change To Patreon Platform... Again
        </h3>
 
        {/* Body */}
        <div className="text-[11px] text-gray-900 font-sans space-y-2">
          <p className="m-0">Hi everyone,</p>
          <p className="m-0">
            Unfortunately, Patreon has again announced the elimination of &quot;per-creation
            billing&quot; after November 2026 due to forced changed by Apple. You can read the
            announcement here:{" "}
            <Link
              href="https://www.patreon.com/posts/148395613"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1f5da1] hover:underline break-all"
            >
              https://www.patreon.com/posts/148395613
            </Link>
          </p>
        </div>
 
      </div>
    </div>
  );
}