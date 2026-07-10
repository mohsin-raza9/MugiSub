import React, { useRef, useState } from 'react';
import { uploadToCloudinary, deleteFromCloudinary } from '@/utils/upload';
import { Loader2, Trash2 } from 'lucide-react';

interface FileUploadZoneProps {
  accept: string;
  label: string;
  icon: React.ElementType;
  folderName?: string;
  onUpload: (url: string, publicId: string) => void;
  onRemove?: () => void;
  currentUrl?: string | null;
  currentPublicId?: string | null;
  showPreview?: boolean;
  fileType?: 'image' | 'video' | 'subtitle';
}

export default function FileUploadZone({
  accept,
  label,
  icon: Icon,
  folderName,
  onUpload,
  onRemove,
  currentUrl,
  currentPublicId,
  showPreview = false,
  fileType
}: FileUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    setError(null);
    try {
      const result = await uploadToCloudinary(file, folderName as string, fileType);
      if (result) {
        onUpload(result.url, result.publicId);
      } else {
        setError('Upload failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPublicId) {
      await deleteFromCloudinary(currentPublicId);
    }
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full relative">
      <label className="font-bold text-[9px] uppercase text-[#222735] tracking-wide">{label}</label>
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
          }
        }}
      />
      
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (!isUploading && e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
          }
        }}
        className={`border-2 border-dashed h-[60px] flex flex-col items-center justify-center transition-all p-1 rounded-sm relative overflow-hidden ${
          currentUrl ? 'border-[#1a5c36] bg-[#d1e7dd] cursor-default' : 'border-[#8c8f94] bg-[#f0f5ff] hover:bg-[#e2e8f5] cursor-pointer'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center text-[#2a3243]">
            <Loader2 size={16} className="animate-spin mb-1" />
            <span className="text-[8.5px] font-mono font-bold tracking-tighter">UPLOADING...</span>
          </div>
        ) : currentUrl ? (
          <div className="flex flex-col items-center justify-center w-full h-full relative group">
            {showPreview ? (
              <img src={currentUrl} alt={label} className="absolute inset-0 w-full h-full object-cover opacity-80" />
            ) : null}
            <div className="z-10 bg-black/50 p-1 rounded text-white flex flex-col items-center">
               <span className="text-[8.5px] font-mono font-bold">✅ UPLOADED</span>
            </div>
            
            {onRemove && (
              <button 
                onClick={handleRemove}
                className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
                title="Remove & Delete from Cloudinary"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-[#555]">
            <Icon size={16} className="mb-0.5 text-[#555]" />
            <span className="text-[8.5px] font-mono font-bold tracking-tighter uppercase">DRAG / CLICK TO UPLOAD</span>
          </div>
        )}
      </div>
      
      {error && <span className="text-[9px] text-red-600 font-bold mt-0.5">{error}</span>}
    </div>
  );
}
