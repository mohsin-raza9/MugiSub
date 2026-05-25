import Link from "next/link";
import { Search } from "lucide-react";

export default function SearchContainer() {
  return (
    <div className="w-full py-[30px] bg-[#b1b3b5]">
      <div className="max-w-[1800px] w-full mx-auto h-[34px] rounded-[5px] flex items-center justify-between px-2">
        
        {/* Left Column (Isolated Brand Element) */}
        <div className="flex items-center h-full ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-small.svg" alt="logo" className="h-[50px] w-auto" />
        </div>

        {/* Right Column (Functional Search Module Group) */}
        <div className="flex items-center gap-1 h-full ">
          
          {/* Input Box Enclosure */}
          <div className="h-[28px] bg-[#34394d] border border-[#34394d] flex items-center overflow-hidden shadow-[0_1px_2px_0_rgba(0,0,0,0.3)] ">
            <input 
              type="text" 
              className="bg-transparent text-white text-[11px] p w-[270px] focus:outline-none placeholder-gray-600 font-mono h-[28px]"
            />
            {/* 'ALL' Dropdown Trigger */}
            <button className="h-full w-[87px] gap-10 border-l border-[#282d3d] bg-[#34394d] hover:bg-[#12151f] text-[11px] text-[#cbd3df] px-1.5 flex items-center justify-center shrink-0">
              all <span className=" text-[10px]">▼</span>
            </button>
          </div>

          {/* Execution Search Button */}
          <button className="h-[28px] bg-[#34394d] hover:bg-[#12151f] border shadow-[0_1px_2px_0_rgba(0,0,0,0.3)] border-[#34394d] text-[11px] font-medium text-[#ccc] px-2.5 flex items-center gap-1">
            <Search size={10} color="#cbd3df" strokeWidth={4} />
            Search
          </button>
        </div>

      </div>
    </div>
  );
}
