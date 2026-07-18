'use client';
import React, { useRef, useState } from 'react';
import { FileText, Trash2, Loader2, UploadCloud } from 'lucide-react';
import { uploadToCloudinary, deleteFromCloudinary } from '@/utils/upload';

interface SubtitleUploadProps {
  folderName: string;
  currentUrl: string | null;
  currentPublicId: string | null;
  onUpload: (url: string, publicId: string) => void;
  onRemove: () => void;
}

const SubtitleUpload: React.FC<SubtitleUploadProps> = ({ folderName, currentUrl, currentPublicId, onUpload, onRemove }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      if (currentPublicId) {
        await deleteFromCloudinary(currentPublicId);
      }

      const result = await uploadToCloudinary(file, `MugiSub/Anime/${folderName}/Subtitles`);
      onUpload(result?.url || "", result?.publicId || "");
    } catch (error) {
      console.error('Subtitle upload failed:', error);
      alert('Subtitle upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = async () => {
    if (currentPublicId) {
      try {
        await deleteFromCloudinary(currentPublicId);
      } catch (error) {
        console.error('Subtitle delete failed:', error);
      }
    }
    onRemove();
  };

  return (
    <div className="space-y-1">
      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase">Subtitle File</label>
      <input ref={inputRef} type="file" accept=".srt,.ass,.vtt,.sub,.ssa" onChange={handleFileChange} className="hidden" />
      {currentUrl ? (
        <div className="flex items-center gap-2 p-1.5 border border-[#8c8f94] bg-[#e5e7eb]">
          <FileText size={14} className="text-[#1f3e70] shrink-0" />
          <span className="text-[10px] font-mono text-[#222735] truncate flex-1">{currentUrl.split('/').pop()}</span>
          <button type="button" onClick={handleRemove}
            className="bg-red-700/80 hover:bg-red-600 text-white p-0.5 rounded-sm cursor-pointer shrink-0">
            <Trash2 size={10} />
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={isUploading}
          className="w-full h-16 flex flex-col items-center justify-center border border-dashed border-[#8c8f94] bg-[#e5e7eb] hover:bg-[#d1d3d7] text-[#555] cursor-pointer transition-colors disabled:opacity-60">
          {isUploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <UploadCloud size={16} className="mb-1" />
              <span className="text-[8px] font-mono font-bold">UPLOAD SUBTITLE</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default SubtitleUpload;