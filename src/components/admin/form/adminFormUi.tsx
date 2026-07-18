'use client';

import React from 'react';
import { X } from 'lucide-react';

// ─── Modal Shell ─────────────────────────────────────────────────────
interface AdminFormModalProps {
  title: string;
  stepLabel?: string;
  onClose: () => void;
  closeDisabled?: boolean;
  children: React.ReactNode;
  width?: string;
}

export function AdminFormModal({
  title,
  stepLabel,
  onClose,
  closeDisabled,
  children,
  width = '520px',
}: AdminFormModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div
        className="bg-[#bdbfc3] border border-[#787b80] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col"
        style={{ width, maxWidth: '95vw' }}
      >
        <div className="bg-[#2a3243] text-white font-mono font-bold uppercase tracking-wide px-3 py-2 text-[11px] border-b border-[#1a202c] flex justify-between items-center shrink-0">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="truncate">{title}</span>
            {stepLabel && (
              <span className="text-[9px] text-[#94a3b8] font-normal tracking-normal">{stepLabel}</span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={closeDisabled}
            className="hover:text-red-400 font-bold cursor-pointer disabled:opacity-50 shrink-0 ml-2"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-3 space-y-3 max-h-[85vh] overflow-y-auto custom-scrollbar text-left flex-1 min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Step Progress Bar ───────────────────────────────────────────────
interface StepIndicatorProps {
  steps: string[];
  current: number;
}

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-1 mb-1">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <div
              className={`flex-1 text-center py-1 text-[8px] font-mono font-bold uppercase border ${
                active
                  ? 'bg-[#2a3243] text-white border-[#1a202c]'
                  : done
                    ? 'bg-[#1a5c36] text-white border-[#134526]'
                    : 'bg-[#caccce] text-[#666] border-[#9fa2a8]'
              }`}
              title={label}
            >
              {label}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-2 h-px shrink-0 ${done ? 'bg-[#1a5c36]' : 'bg-[#9fa2a8]'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Section Panel ───────────────────────────────────────────────────
export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 bg-[#caccce] p-2 border border-[#9fa2a8]">
      <span className="text-[10px] font-black tracking-wider text-[#2a3243] block border-b border-[#9fa2a8] pb-0.5 mb-1.5">
        {title}
      </span>
      {children}
    </div>
  );
}

// ─── Field Primitives ────────────────────────────────────────────────
const inputCls =
  'w-full bg-[#f0f5ff] border border-[#8c8f94] px-2 py-1 text-[11px] text-black outline-none focus:border-[#2a3243]';
const labelCls = 'block text-[9px] text-[#222735] font-mono font-bold uppercase mb-0.5';

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, required, children, className = '' }: FieldProps) {
  return (
    <div className={className}>
      <label className={labelCls}>
        {label}
        {required && <span className="text-red-700">*</span>}
      </label>
      {children}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ''}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${inputCls} resize-none ${props.className ?? ''}`}
    />
  );
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`${inputCls} cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${props.className ?? ''}`}
    />
  );
}

// ─── Action Buttons ────────────────────────────────────────────────────
interface StepActionsProps {
  onCancel: () => void;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextType?: 'button' | 'submit';
  cancelLabel?: string;
  backLabel?: string;
  disabled?: boolean;
  extra?: React.ReactNode;
}

export function StepActions({
  onCancel,
  onBack,
  onNext,
  nextLabel = 'NEXT',
  nextType = 'submit',
  cancelLabel = 'CANCEL',
  backLabel = 'BACK',
  disabled,
  extra,
}: StepActionsProps) {
  return (
    <div className="flex gap-2 pt-2 border-t border-[#9fa2a8]">
      <button
        type="button"
        onClick={onCancel}
        disabled={disabled}
        className="flex-1 py-1.5 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50"
      >
        {cancelLabel}
      </button>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          disabled={disabled}
          className="flex-1 py-1.5 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50"
        >
          {backLabel}
        </button>
      )}
      {extra}
      {onNext !== undefined && (
        <button
          type={nextType}
          onClick={nextType === 'button' ? onNext : undefined}
          disabled={disabled}
          className="flex-1 py-1.5 bg-[#a11f1f] hover:bg-[#c02222] text-white text-[11px] font-mono font-bold border border-[#7a1515] cursor-pointer disabled:opacity-50"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}

export function CommitButton({
  onClick,
  disabled,
  loading,
  label = 'COMMIT RECORD',
}: {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="flex-1 py-1.5 bg-[#1a5c36] hover:bg-[#236b40] text-white text-[11px] font-mono font-bold border border-[#134526] cursor-pointer disabled:opacity-50"
    >
      {loading ? 'SAVING...' : label}
    </button>
  );
}

// ─── Summary ─────────────────────────────────────────────────────────
export function SummaryPanel({ rows }: { rows: { label: string; value: string; highlight?: boolean }[] }) {
  return (
    <>
      <div className="bg-[#2a3243] text-[#e2933c] font-mono text-[10px] px-2 py-1 border border-[#1a202c]">
        // RECORD PREVIEW — REVIEW BEFORE COMMIT
      </div>
      <div className="bg-[#caccce] border border-[#9fa2a8] p-3 space-y-1.5 font-mono text-[11px]">
        {rows.map(row => (
          <SummaryRow key={row.label} {...row} />
        ))}
      </div>
    </>
  );
}

export function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between border-b border-[#9fa2a8]/50 pb-1 last:border-0 gap-2">
      <span className="text-[#555] text-[10px] font-bold shrink-0">{label}</span>
      <span className={`text-[11px] font-bold text-right break-all ${highlight ? 'text-[#a11f1f]' : 'text-[#222735]'}`}>
        {value}
      </span>
    </div>
  );
}

// ─── Subtitle Fields Block ───────────────────────────────────────────
export interface SubtitleData {
  subtitleUrl: string | null;
  subtitlePublicId: string | null;
  language: string;
  languageName: string;
  format: 'SRT' | 'ASS' | 'VTT';
  fileSizeKb: number | null;
}

export const EMPTY_SUBTITLE: SubtitleData = {
  subtitleUrl: null,
  subtitlePublicId: null,
  language: 'en',
  languageName: 'English',
  format: 'SRT',
  fileSizeKb: null,
};

interface SubtitleFieldsProps {
  data: SubtitleData;
  onChange: (fields: Partial<SubtitleData>) => void;
  folderName: string;
  uploadComponent: React.ComponentType<{
    folderName?: string;
    currentUrl?: string | null;
    currentPublicId?: string | null;
    onUpload: (url: string, publicId: string) => void;
    onRemove?: () => void;
  }>;
  disabled?: boolean;
}

export function SubtitleFields({
  data,
  onChange,
  folderName,
  uploadComponent: Upload,
  disabled,
}: SubtitleFieldsProps) {
  return (
    <FormSection title="// SUBTITLE (OPTIONAL)">
      {disabled && (
        <div className="text-[10px] text-red-600 font-bold mb-2">
          Complete previous steps first to enable uploads.
        </div>
      )}
      <div className={disabled ? 'opacity-50 pointer-events-none' : ''}>
        <Upload
          folderName={folderName}
          currentUrl={data.subtitleUrl}
          currentPublicId={data.subtitlePublicId}
          onUpload={(url, id) => onChange({ subtitleUrl: url, subtitlePublicId: id })}
          onRemove={() => onChange({ subtitleUrl: null, subtitlePublicId: null })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <FormField label="Language">
          <TextInput
            value={data.language}
            onChange={e => onChange({ language: e.target.value })}
            placeholder="en"
          />
        </FormField>
        <FormField label="Language Name">
          <TextInput
            value={data.languageName}
            onChange={e => onChange({ languageName: e.target.value })}
            placeholder="English"
          />
        </FormField>
        <FormField label="Format">
          <SelectInput
            value={data.format}
            onChange={e => onChange({ format: e.target.value as SubtitleData['format'] })}
          >
            <option value="SRT">SRT</option>
            <option value="ASS">ASS</option>
            <option value="VTT">VTT</option>
          </SelectInput>
        </FormField>
        <FormField label="File Size (KB)">
          <TextInput
            type="number"
            min={0}
            value={data.fileSizeKb ?? ''}
            onChange={e =>
              onChange({ fileSizeKb: e.target.value ? parseInt(e.target.value, 10) : null })
            }
            placeholder="—"
          />
        </FormField>
      </div>
    </FormSection>
  );
}

// ─── Confirm Dialog ──────────────────────────────────────────────────
export function ConfirmDialog({
  message,
  onNo,
  onYes,
  loading,
}: {
  message: string;
  onNo: () => void;
  onYes: () => void;
  loading?: boolean;
}) {
  return (
    <div className="space-y-4 text-center py-6">
      <p className="text-[13px] font-bold text-[#222735] font-mono">{message}</p>
      <div className="flex gap-3 justify-center pt-4">
        <button
          type="button"
          onClick={onNo}
          disabled={loading}
          className="px-6 py-2 border border-[#8c8f94] bg-[#caccce] hover:bg-[#b8babb] text-[11px] font-mono font-bold text-[#222735] cursor-pointer disabled:opacity-50"
        >
          NO
        </button>
        <button
          type="button"
          onClick={onYes}
          disabled={loading}
          className="px-6 py-2 bg-[#a11f1f] hover:bg-[#c02222] text-white text-[11px] font-mono font-bold border border-[#7a1515] cursor-pointer disabled:opacity-50"
        >
          YES
        </button>
      </div>
    </div>
  );
}

// ─── Anime / Season Selectors ────────────────────────────────────────
export function AnimeSelect({
  value,
  onChange,
  animeList,
  required,
}: {
  value: string;
  onChange: (id: string) => void;
  animeList: { id: string; title: string }[];
  required?: boolean;
}) {
  return (
    <FormField label="Anime" required={required}>
      <SelectInput
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">-- Select Anime --</option>
        {animeList.map(a => (
          <option key={a.id} value={a.id}>
            {a.title}
          </option>
        ))}
      </SelectInput>
    </FormField>
  );
}

export function SeasonSelect({
  value,
  onChange,
  seasonList,
  disabled,
}: {
  value: string;
  onChange: (id: string) => void;
  seasonList: { id: string; title: string | null; number: number }[];
  disabled?: boolean;
}) {
  return (
    <FormField label="Season (optional)">
      <SelectInput
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">-- No Season --</option>
        {seasonList.map(s => (
          <option key={s.id} value={s.id}>
            {s.title || `Season ${s.number}`}
          </option>
        ))}
      </SelectInput>
    </FormField>
  );
}
