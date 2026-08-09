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
  const [isDragActive, setIsDragActive] = useState(false);

  const uploadFile = async (file: File) => {
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Basic check for subtitle files by extension
      const validExtensions = ['.srt', '.ass', '.vtt', '.sub', '.ssa'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (validExtensions.includes(fileExtension) || file.type.includes('text/') || file.type === '') {
        await uploadFile(file);
      } else {
        alert('Invalid file format. Please upload a subtitle file (.srt, .ass, .vtt, etc.)');
      }
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
        <div
          onClick={() => !isUploading && inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full h-16 flex flex-col items-center justify-center border border-dashed rounded-sm text-[#555] cursor-pointer transition-all duration-150 ${
            isDragActive 
              ? 'border-blue-600 bg-blue-50/10' 
              : 'border-[#8c8f94] bg-[#e5e7eb] hover:bg-[#d1d3d7]'
          } ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}
        >
          {isUploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <UploadCloud size={16} className="mb-1" />
              <span className="text-[8px] font-mono font-bold">UPLOAD SUBTITLE</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SubtitleUpload;