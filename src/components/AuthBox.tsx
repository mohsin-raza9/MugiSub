'use client';


import { Link, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';

interface LoginRegProps {
  isInfo?: boolean;
}
 
const AuthBox = ({ isInfo = false }: LoginRegProps) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#bdbfc3] flex items-center justify-center font-sans">
      {/* Main Container */}
      <div className="w-full max-w-[380px] bg-[#bdbfc3] rounded-2xl shadow-lg overflow-hidden">


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
};

export default AuthBox;