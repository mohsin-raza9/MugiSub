import Link from "next/link";
import { Search, Menu } from "lucide-react";

interface SearchContainerProps {
  onToggleSidebar?: () => void;
}

export default function SearchContainer({ onToggleSidebar }: SearchContainerProps) {
  return (
    <div className="w-full py-4 sm:py-[30px] bg-[#b1b3b5] overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto flex flex-col md:flex-row gap-4 md:gap-0 md:h-[34px] md:rounded-[5px] items-center justify-between px-4 md:px-2 min-w-0">
        
        {/* Left Column (Isolated Brand Element) */}
        <div className="flex items-center h-full gap-2 shrink-0">
          {/* Hamburger button visible only on mobile */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-1.5 bg-[#34394d] hover:bg-[#12151f] text-[#cbd3df] rounded shadow-[0_1px_2px_0_rgba(0,0,0,0.3)] transition-colors flex items-center justify-center shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={18} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-small.svg" alt="logo" className="h-[70px] w-auto shrink-0 max-w-full" />
        </div>

        {/* Right Column (Functional Search Module Group) */}
        <div className="flex items-center gap-1 h-full w-full md:w-auto justify-end min-w-0">
          
          {/* Input Box Enclosure */}
          <div className="h-[28px] bg-[#34394d] border border-[#34394d] flex items-center overflow-hidden shadow-[0_1px_2px_0_rgba(0,0,0,0.3)] flex-1 min-w-0 w-full  md:w-[400px]">
            <input 
              type="text" 
              className="bg-transparent text-white text-[11px] w-full min-w-0 focus:outline-none placeholder-gray-600 font-mono h-[28px] px-1"
            />
            {/* 'ALL' Dropdown Trigger */}
            <button className="h-full w-[60px] md:w-[87px] border-l border-[#282d3d] bg-[#34394d] hover:bg-[#12151f] text-[11px] text-[#cbd3df] px-1.5 flex items-center justify-center shrink-0">
              all <span className="text-[10px] ml-1">▼</span>
            </button>
          </div>

          {/* Execution Search Button */}
          <button className="h-[28px] bg-[#34394d] hover:bg-[#12151f] border shadow-[0_1px_2px_0_rgba(0,0,0,0.3)] border-[#34394d] text-[11px] font-medium text-[#ccc] px-2.5 flex items-center gap-1 shrink-0">
            <Search size={10} color="#cbd3df" strokeWidth={4} />
            Search
          </button>
        </div>

      </div>
    </div>
  );
}
