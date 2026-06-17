'use client';

import React, { useState } from 'react';
import { ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "register" | "forgot";

const AuthBox = () => {
  const { data: session } = authClient.useSession();
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
          onError: (ctx: any) => {
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
                onClick={() => { setMode("login"); setError(""); setSuccessMsg(""); }}
                className={`flex-1 py-2 text-[15px] font-bold focus:outline-none transition-colors ${
                  mode === "login" || mode === "forgot" ? "bg-[#bdbfc3] text-black" : "bg-[#800] text-[#cfd1d4] hover:bg-[#900]"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => { setMode("register"); setError(""); setSuccessMsg(""); }}
                className={`flex-1 py-2 text-[15px] font-bold focus:outline-none transition-colors ${
                  mode === "register" ? "bg-[#bdbfc3] text-black" : "bg-[#800] text-[#cfd1d4] hover:bg-[#900]"
                }`}
              >
                Register
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col p-4 gap-2.5">
              <div className="flex flex-col gap-2">
                {mode === "register" && (
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

                {mode !== "forgot" && (
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#E8F0FE] border border-[#34394d] px-2 py-2 text-[12px] text-black outline-none focus:border-black"
                  />
                )}
              </div>

              {error && (
                <div className="text-red-700 text-[11px] font-bold bg-red-100 p-1.5 border border-red-300">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="text-green-800 text-[11px] font-bold bg-green-100 p-1.5 border border-green-300">
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
                  {mode !== "forgot" && <ArrowRight size={14} color="#ffffff" className="shrink-0" />}
                  <span className="text-[14px]">
                    {loading ? "Processing..." : mode === "login" ? "Login" : mode === "register" ? "Register" : "Send Reset Link"}
                  </span>
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