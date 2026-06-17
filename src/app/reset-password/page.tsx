'use client';

import React, { useState, Suspense } from 'react';
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // explicitly pass the token just in case auto-detection fails
      await authClient.resetPassword({
        newPassword: password,
        token: token || undefined,
      }, {
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => {
            router.push("/");
          }, 3000);
        },
        onError: (ctx) => {
          setError(ctx.error.message);
        }
      });
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-[380px] bg-[#bdbfc3] rounded-2xl shadow-lg border border-[#999] p-6 text-center">
        <h2 className="text-[18px] font-bold text-black mb-2">Password Reset Successful!</h2>
        <p className="text-[13px] text-black">Redirecting you to the home page...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[380px] bg-[#bdbfc3] rounded-2xl shadow-lg overflow-hidden border border-[#999]">
      <div className="bg-[#2b2f3d] text-white p-3 font-bold uppercase text-[14px] text-center">
        Reset Password
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col p-5 gap-3">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-[#E8F0FE] border border-[#34394d] px-2 py-2 text-[12px] text-black outline-none focus:border-black"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full bg-[#E8F0FE] border border-[#34394d] px-2 py-2 text-[12px] text-black outline-none focus:border-black"
        />
        
        {error && (
          <div className="text-red-700 text-[11px] font-bold bg-red-100 p-1.5 border border-red-300">
            {error}
          </div>
        )}

        <div className="flex justify-center mt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2b2f3d] hover:bg-[#3d4357] text-white py-2 px-6 flex items-center justify-center gap-2 transition-colors border border-[#2b2f3d] disabled:opacity-50 font-bold"
          >
            <span className="text-[14px]">{loading ? "Processing..." : "Reset Password"}</span>
            <ArrowRight size={14} color="#ffffff" className="shrink-0" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#cfd1d4] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
