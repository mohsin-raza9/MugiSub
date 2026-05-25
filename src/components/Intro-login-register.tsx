import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LoginRegProps {
  isInfo?: boolean;
}

export default function LoginAndRegister({ isInfo = false }: LoginRegProps) {
  return (
    <div className="w-full font-sans text-[11px]">

      {/* ── "What is MugiSub" sub-header bar ── */}
      <div className="text-black py-1.5 flex items-center justify-between border-b border-[#999]">
        <h2 className="font-bold text-[15px] m-0">What is MugiSub?</h2>
        <a
          href="#"
          className="bg-[#34394d] hover:bg-[#12151f] shadow-[0_1px_2px_0_rgba(0,0,0,0.3)] text-[#ccc] text-[10px] px-2 py-0.5 border border-[#3e455c] flex items-center gap-1 transition-colors font-sans"
        >
          <span>☰ Show Post</span>
        </a>
      </div>

      {/* ── Main login/info panel ── */}
      <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] rounded-sm mt-1.5 flex flex-row p-4 gap-4 w-full">

        {/* Left column: What Is AniDB? */}
        {isInfo && (
          <div className="w-[60%] flex flex-col gap-3 pr-2">
            <h2 className="font-bold text-black text-[12px] m-0">What Is AniDB?</h2>
            <p className="text-black leading-snug m-0">
              AniDB stands for Anime DataBase. It is a non-profit, user-driven platform providing
              comprehensive anime information and community features.
            </p>

            <h3 className="font-bold text-black mt-1 m-0">Why should you use AniDB?</h3>
            <ul className="list-square pl-4 flex flex-col gap-1 text-black m-0">
              <li>Track your anime collection and viewing progress easily.</li>
              <li>Discover new shows using our advanced tagging and relation systems.</li>
              <li>Engage with a massive community of dedicated anime enthusiasts.</li>
            </ul>

            <p className="text-black leading-snug mt-1 m-0">
              AniDB is shaped by its users. We rely on community contributions to maintain our
              database accuracy and completeness. By registering, you help keep the platform alive
              and expanding.
            </p>
          </div>
        )}

        {/* Right column: Login / Register box */}
        <div className={isInfo ? "w-[40%] flex flex-col" : "w-full flex flex-col"}>
          <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] rounded-sm flex flex-col h-full">

            {/* Tab strip */}
            <div className="flex w-full border-[#999999]">
              <div className="flex-1 flex items-center justify-center py-1.5 bg-[#bdbfc3] border-r border-[#999999]">
                <Link href="/login" className="text-black text-[15px] font-bold hover:underline">
                  Login
                </Link>
              </div>
              <div className="flex-1 flex items-center justify-center py-1.5 bg-[#800]">
                <Link href="/register" className="text-[#cfd1d4] text-[15px] font-bold">
                  Register
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="flex flex-col p-2 gap-1.5">
              <div className="flex flex-col gap-1.5">
                <input
                  type="text"
                  defaultValue="Username or email"
                  className="w-full bg-[#E8F0FE] border border-[#34394d] px-1.5 py-[9px] text-[11px] text-black outline-none"
                />
                <input
                  type="password"
                  defaultValue="Password"
                  className="w-full bg-[#E8F0FE] border border-[#34394d] px-1.5 py-[9px] text-[11px] text-black outline-none"
                />
              </div>

              <Link href="/forgot" className="text-[#1f5da1] hover:underline text-[12px]">
                Forgot your username or password?
              </Link>

              <div className="flex items-center gap-1 mt-1 ">
                <input
                  type="checkbox"
                  id="stayLoggedIn"
                  defaultChecked
                  className="w-3.5 h-3.5 cursor-pointer accent-[#2b2f3d]"
                />
                <label htmlFor="stayLoggedIn" className="text-[12px] text-black cursor-pointer select-none">
                  stay logged me on next visit
                </label>
              </div>

              <div className="flex justify-center mt-2">
                <button
                  type="button"
                  className="bg-[#2b2f3d] hover:bg-[#3d4357] text-white py-[5px] px-4 flex items-center justify-center gap-1.5 transition-colors border border-[#2b2f3d]"
                >
                  <ArrowRight size={12} color="#ffffff" className="shrink-0" />
                  <span className="text-[15px]">Login</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}