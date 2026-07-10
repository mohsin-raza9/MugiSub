'use client';

import React from 'react';
import { FileText } from 'lucide-react';

const AddNews = () => {
  return (
    <button
      type="button"
      onClick={() => console.log('ADD_NEWS: Create New clicked')}
      className="w-full flex items-center justify-center py-2 bg-[#8c6d1d] hover:bg-[#a68224] text-white border border-[#664f14] transition-colors cursor-pointer rounded-sm group"
    >
      <div className="flex items-center gap-1.5">
        <FileText size={13} className="group-hover:scale-110 transition-transform" />
        <span className="text-[9px] font-mono font-bold tracking-wider">ADD_NEWS</span>
      </div>
    </button>
  );
};

export default AddNews;
