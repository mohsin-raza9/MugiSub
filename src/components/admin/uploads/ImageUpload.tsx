'use client';
import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Trash2, Loader2, UploadCloud } from 'lucide-react';
import { uploadToCloudinary, deleteFromCloudinary } from '@/utils/upload';

interface ImageUploadProps {
  folderName: string;
  currentUrl: string | null;
  currentPublicId: string | null;
  onUpload: (url: string, publicId: string) => void;
  onRemove: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ folderName, currentUrl, currentPublicId, onUpload, onRemove }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Delete old image if exists
      if (currentPublicId) {
        await deleteFromCloudinary(currentPublicId);
      }

      const result = await uploadToCloudinary(file, `MugiSub/Anime/${folderName}/Poster`);
      onUpload(result?.url || '', result?.publicId || '');
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Image upload failed. Please try again.');
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
        console.error('Image delete failed:', error);
      }
    }
    onRemove();
  };

  return (
    <div className="space-y-1 w-full">
      <label className="block text-[9px] text-[#222735] font-mono font-bold uppercase">Poster Image</label>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      {currentUrl ? (
        <div className="relative group w-full">
          <img src={currentUrl} alt="Poster" className="w-full h-20 object-cover border border-[#8c8f94]" />
          <button type="button" onClick={handleRemove}
            className="absolute top-1 right-1 bg-red-700/80 hover:bg-red-600 text-white p-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Trash2 size={10} />
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={isUploading}
          className="w-full h-20 flex flex-col items-center justify-center border border-dashed border-[#8c8f94] bg-[#e5e7eb] hover:bg-[#d1d3d7] text-[#555] cursor-pointer transition-colors disabled:opacity-60">
          {isUploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <UploadCloud size={16} className="mb-1" />
              <span className="text-[8px] font-mono font-bold">UPLOAD POSTER</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ImageUpload;