'use client';

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface LoginRegProps {
  isInfo?: boolean;
}

type AuthMode = "login" | "register" | "forgot";

export default function LoginAndRegister({ isInfo = false }: LoginRegProps) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (mode === "login") {
        await authClient.signIn.email({
          email,
          password,
        }, {
          onSuccess: () => {
            router.push("/onboarding");
          },
          onError: (ctx: any) => {
            setError(ctx.error.message);
          }
        });
      } else if (mode === "register") {
        await authClient.signUp.email({
          email,
          password,
          name,
        }, {
          onSuccess: () => {
            router.push("/onboarding");
          },
          onError: (ctx: any) => {
            setError(ctx.error.message);
          }
        });
      } else if (mode === "forgot") {
        await authClient.requestPasswordReset({
          email,
          redirectTo: "/reset-password",
        }, {
          onSuccess: () => {
            setSuccessMsg("Reset link sent! Check your email.");
            setMode("login");
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

  // Immediate pending verification modal
  if (session?.user && !session.user.emailVerified) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 font-sans">
        <div className="bg-[#bdbfc3] w-full max-w-[380px] rounded-sm border border-[#999] shadow-lg p-5 flex flex-col items-center text-center">
          <h2 className="text-[18px] font-bold text-black mb-2">Verify Your Email</h2>
          <p className="text-[13px] text-black mb-4">
            We've sent a verification link to <strong className="text-[#a11f1f]">{session.user.email}</strong>. 
            Please check your inbox (and spam folder) to verify your account.
          </p>
          <button
            onClick={() => window.open('mailto:', '_blank')}
            className="bg-[#2b2f3d] hover:bg-[#3d4357] text-white py-2 px-6 font-bold text-[14px] transition-colors border border-[#2b2f3d]"
          >
            Go to Email
          </button>
        </div>
      </div>
    );
  }

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
      <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] rounded-sm mt-1.5 flex flex-col md:flex-row p-4 gap-4 w-full">

        {/* Left column: What Is AniDB? */}
        {isInfo && (
          <div className="w-full md:w-[60%] flex flex-col gap-3 pr-0 md:pr-2">
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

        {/* Right column: Login / Register / Profile box */}
        <div className={isInfo ? "w-full md:w-[40%] flex flex-col" : "w-full flex flex-col"}>
          {session ? (
            /* Logged In View */
            <div className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] rounded-sm flex flex-col h-full p-3 gap-2">
              <div className="bg-[#2b2f3d] text-[#e1e5f0] font-bold uppercase tracking-wide px-2 py-1 text-[11px] mb-1">
                Profile Info
              </div>
              <div className="text-[12px] text-black space-y-1">
                <div>Logged in as: <strong className="text-[#a11f1f]">{session.user.name}</strong></div>
                <div className="truncate">Email: {session.user.email}</div>
                <div>Role: <span className="bg-[#1f5da1] text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">{session.user.role || 'user'}</span></div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 bg-[#2b2f3d] hover:bg-[#3d4357] text-white py-[5px] px-4 font-bold transition-colors border border-[#2b2f3d]"
              >
                Log Out
              </button>
            </div>
          ) : (
            /* Logged Out Login/Register Form */
            <form onSubmit={handleAuth} className="border border-[#999] bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] rounded-sm flex flex-col h-full">

              {/* Tab strip */}
              <div className="flex w-full border-[#999999]">
                <button
                  type="button"
                  onClick={() => { setMode("login"); setError(""); setSuccessMsg(""); }}
                  className={`flex-1 py-1.5 text-[15px] font-bold focus:outline-none transition-colors ${
                    mode === "login" || mode === "forgot" ? "bg-[#bdbfc3] text-black" : "bg-[#800] text-[#cfd1d4] hover:bg-[#900]"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => { setMode("register"); setError(""); setSuccessMsg(""); }}
                  className={`flex-1 py-1.5 text-[15px] font-bold focus:outline-none transition-colors ${
                    mode === "register" ? "bg-[#bdbfc3] text-black" : "bg-[#800] text-[#cfd1d4] hover:bg-[#900]"
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Form Body */}
              <div className="flex flex-col p-2 gap-1.5">
                <div className="flex flex-col gap-1.5">
                  {mode === "register" && (
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-[#E8F0FE] border border-[#34394d] px-1.5 py-[9px] text-[11px] text-black outline-none"
                    />
                  )}
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#E8F0FE] border border-[#34394d] px-1.5 py-[9px] text-[11px] text-black outline-none"
                  />
                  {mode !== "forgot" && (
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-[#E8F0FE] border border-[#34394d] px-1.5 py-[9px] text-[11px] text-black outline-none"
                    />
                  )}
                </div>

                {error && (
                  <div className="text-red-700 text-[11px] font-bold bg-red-100 p-1 border border-red-300">
                    {error}
                  </div>
                )}
                {successMsg && (
                  <div className="text-green-800 text-[11px] font-bold bg-green-100 p-1 border border-green-300">
                    {successMsg}
                  </div>
                )}

                {mode === "login" && (
                  <a href="#" onClick={(e) => { e.preventDefault(); setMode("forgot"); setError(""); setSuccessMsg(""); }} className="text-[#1f5da1] hover:underline text-[12px]">
                    Forgot your password?
                  </a>
                )}

                {mode === "forgot" && (
                  <a href="#" onClick={(e) => { e.preventDefault(); setMode("login"); setError(""); setSuccessMsg(""); }} className="text-[#1f5da1] hover:underline text-[12px]">
                    Back to login
                  </a>
                )}

                {mode === "login" && (
                  <div className="flex items-center gap-1 mt-1">
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
                )}

                <div className="flex justify-center mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#2b2f3d] hover:bg-[#3d4357] text-white py-[5px] px-4 flex items-center justify-center gap-1.5 transition-colors border border-[#2b2f3d] disabled:opacity-50"
                  >
                    {mode !== "forgot" && <ArrowRight size={12} color="#ffffff" className="shrink-0" />}
                    <span className="text-[15px]">
                      {loading ? "Processing..." : mode === "login" ? "Login" : mode === "register" ? "Register" : "Send Reset Link"}
                    </span>
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}