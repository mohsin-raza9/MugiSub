'use client';

import React, { useState } from 'react';
import { ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AuthBox = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await authClient.signIn.email({
          email,
          password,
        }, {
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx) => {
            setError(ctx.error.message);
          }
        });
      } else {
        await authClient.signUp.email({
          email,
          password,
          name,
        }, {
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx) => {
            setError(ctx.error.message);
          }
        });
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="min-h-[400px] bg-[#bdbfc3] flex items-center justify-center font-sans p-4">
      {/* Main Container */}
      <div className="w-full max-w-[380px] bg-[#bdbfc3] rounded-2xl shadow-lg overflow-hidden border border-[#999]">
        
        {session ? (
          /* Profile / Welcome View if user is already logged in */
          <div className="p-4 flex flex-col gap-3">
            <div className="bg-[#2b2f3d] text-[#e1e5f0] font-bold uppercase tracking-wide px-3 py-1.5 text-[11px] mb-1">
              Currently Logged In
            </div>
            <div className="text-[12px] text-black space-y-1.5 px-1">
              <div>Logged in as: <strong className="text-[#a11f1f]">{session.user.name}</strong></div>
              <div>Email: {session.user.email}</div>
              <div>Role: <span className="bg-[#1f5da1] text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">{session.user.role || 'user'}</span></div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="bg-[#2b2f3d] hover:bg-[#3d4357] text-white py-[5px] px-4 font-bold text-[12px] transition-colors border border-[#2b2f3d]"
              >
                Go to Main Page
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-[#800] hover:bg-[#a00] text-white py-[5px] px-4 font-bold text-[12px] transition-colors border border-[#800]"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          /* Authentication Form */
          <form onSubmit={handleAuth} className="flex flex-col w-full">
            {/* Tab strip */}
            <div className="flex w-full border-b border-[#999999]">
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(""); }}
                className={`flex-1 py-2 text-[15px] font-bold focus:outline-none transition-colors ${
                  isLogin ? "bg-[#bdbfc3] text-black" : "bg-[#800] text-[#cfd1d4] hover:bg-[#900]"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(""); }}
                className={`flex-1 py-2 text-[15px] font-bold focus:outline-none transition-colors ${
                  !isLogin ? "bg-[#bdbfc3] text-black" : "bg-[#800] text-[#cfd1d4] hover:bg-[#900]"
                }`}
              >
                Register
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col p-4 gap-2.5">
              <div className="flex flex-col gap-2">
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#E8F0FE] border border-[#34394d] px-2 py-2 text-[12px] text-black outline-none focus:border-black"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#E8F0FE] border border-[#34394d] px-2 py-2 text-[12px] text-black outline-none focus:border-black"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#E8F0FE] border border-[#34394d] px-2 py-2 text-[12px] text-black outline-none focus:border-black"
                />
              </div>

              {error && (
                <div className="text-red-700 text-[11px] font-bold bg-red-100 p-1.5 border border-red-300">
                  {error}
                </div>
              )}

              {isLogin && (
                <a href="#" onClick={(e) => e.preventDefault()} className="text-[#1f5da1] hover:underline text-[12px]">
                  Forgot your username or password?
                </a>
              )}

              {isLogin && (
                <div className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    id="stayLoggedInBox"
                    defaultChecked
                    className="w-3.5 h-3.5 cursor-pointer accent-[#2b2f3d]"
                  />
                  <label htmlFor="stayLoggedInBox" className="text-[12px] text-black cursor-pointer select-none">
                    stay logged me on next visit
                  </label>
                </div>
              )}

              <div className="flex justify-center mt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#2b2f3d] hover:bg-[#3d4357] text-white py-2 px-6 flex items-center justify-center gap-2 transition-colors border border-[#2b2f3d] disabled:opacity-50 font-bold"
                >
                  <ArrowRight size={14} color="#ffffff" className="shrink-0" />
                  <span className="text-[14px]">{loading ? "Processing..." : isLogin ? "Login" : "Register"}</span>
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default AuthBox;