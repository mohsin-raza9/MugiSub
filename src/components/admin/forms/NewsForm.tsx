'use client';

import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

// ─── Sub-Components ────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`bg-[#111622] border transition-all duration-200 ${
        focused ? 'border-pink-500/50 shadow-[0_0_12px_rgba(236,72,153,0.10)]' : 'border-[#1d2433]'
      }`}
    >
      {/* Label row */}
      <div className="px-3 pt-2.5 pb-1">
        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
          {label}
        </span>
      </div>
      {/* Input */}
      <input
        className={`w-full bg-[#0a0f18] text-sm text-[#e2e8f0] font-mono px-3 py-3 outline-none placeholder:text-slate-600 transition-colors ${className}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextArea({ label, className = '', ...props }: TextAreaProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`bg-[#111622] border transition-all duration-200 relative ${
        focused
          ? 'border-pink-500/50 shadow-[0_0_18px_rgba(236,72,153,0.12)]'
          : 'border-[#1d2433]'
      }`}
    >
      {/* Pink left-border accent */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 ${
          focused ? 'bg-pink-500' : 'bg-transparent'
        }`}
      />

      {/* Label row */}
      <div className="px-3 pt-2.5 pb-1">
        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
          {label}
        </span>
      </div>

      {/* Textarea */}
      <textarea
        className={`w-full bg-[#0a0f18] text-sm text-[#e2e8f0] font-mono px-3 py-3 outline-none resize-none placeholder:text-slate-600 transition-colors min-h-[300px] ${className}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  success?: boolean;
}

export function Button({ loading, success, children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`
        relative w-full py-3.5 px-6 font-bold text-sm text-white font-mono uppercase tracking-widest
        transition-all duration-300 cursor-pointer outline-none
        ${
          success
            ? 'bg-emerald-900/60 border border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.15)]'
            : `bg-gradient-to-r from-[#1e0d1a] to-[#2a1020] border border-pink-500/40
               hover:border-pink-500/70 hover:from-[#2d1025] hover:to-[#3a1530]
               hover:shadow-[0_0_24px_rgba(236,72,153,0.25)] active:scale-[0.99]`
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {success ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Posted Successfully
          </>
        ) : loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Posting…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {children}
          </>
        )}
      </span>
    </button>
  );
}

// ─── Main Form Component ───────────────────────────────────────────────────────

export default function NewsForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to post news.');
        return;
      }

      setIsSuccess(true);

      // Navigate to admin home after a short success flash
      setTimeout(() => {
        window.location.href = '/admin';
      }, 1200);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Row 1 – News Title */}
      <Input
        label="post title"
        type="text"
        placeholder="Enter a headline for the news post…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Row 2 – News Body */}
      <TextArea
        label="news"
        placeholder="Write the full news content here. Markdown is supported."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      {/* Error message */}
      {error && (
        <p className="text-xs font-mono text-red-400 border border-red-500/20 bg-red-500/5 px-3 py-2">
          ⚠ {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        loading={isLoading}
        success={isSuccess}
        disabled={isLoading || isSuccess}
      >
        Post
      </Button>
    </form>
  );
}
