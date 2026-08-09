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
  const [isDragActive, setIsDragActive] = useState(false);

  const uploadFile = async (file: File) => {
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
    if (file && file.type.startsWith('image/')) {
      await uploadFile(file);
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
        <div 
          onClick={() => !isUploading && inputRef.current?.click()} 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full h-20 flex flex-col items-center justify-center border border-dashed rounded-sm text-[#555] cursor-pointer transition-all duration-150 ${
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
              <span className="text-[8px] font-mono font-bold">UPLOAD POSTER</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;