'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#bdbfc3] border-2 border-[#787b80] w-full max-w-md shadow-[4px_4px_0px_rgba(0,0,0,0.6)] flex flex-col">
        {/* Header */}
        <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-4 py-3 text-xs border-b-2 border-[#1a202c] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-yellow-400" />
            <span>{title}</span>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="hover:text-red-400 font-bold cursor-pointer disabled:opacity-50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-sm text-[#222735] font-mono leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 py-2 border-2 border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-xs font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50 transition-colors shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2 bg-[#b91c1c] hover:bg-[#dc2626] text-white text-xs font-mono font-bold border-2 border-[#7f1d1d] cursor-pointer disabled:opacity-50 transition-colors shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
