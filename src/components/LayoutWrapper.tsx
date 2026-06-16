'use client';

import { usePathname } from "next/navigation";
import SearchContainer from "./SearchContainer";
import Sidebar from "./Sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="min-h-screen w-full bg-[#0a0f18] text-[#e2e8f0] font-sans antialiased selection:bg-purple-500 selection:text-white">
        {children}
      </div>
    );
  }

  return (
    <div className="h-full w-full m-0 p-0 text-[#1a2536] font-sans flex flex-col bg-[#b1b3b5]">
      <SearchContainer />
      <div className="flex flex-row gap-2">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
