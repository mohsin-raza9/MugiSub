'use client';
import React from 'react';
import { Newspaper } from 'lucide-react';

const AddNews = () => {
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center p-1.5 bg-[#5c4a1a] hover:bg-[#6e5a20] text-white border border-[#42360f] transition-colors cursor-pointer rounded-sm group min-h-[58px] w-full"
    >
      <Newspaper size={15} className="mb-0.5 group-hover:scale-110 transition-transform" />
      <span className="text-[8px] font-mono font-bold tracking-tight text-center leading-tight">ADD_NEWS</span>
    </button>
  );
};

export default AddNews;