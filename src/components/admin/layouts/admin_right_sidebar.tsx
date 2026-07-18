'use client'

import AddAnime from "@/components/layouts/add_anime";
import AddNews from "@/components/layouts/add_news";
import AddEpisode from "@/components/layouts/AddEpisode";
import AddSeason from "@/components/layouts/AddSeason";
import Statusbox from "@/components/layouts/statusbox";
import { ChevronRight, History } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminRightSidebar() {
    const router = useRouter()
    return (
        <div className="w-[200px] shrink-0 space-y-3">

            {/* Commands Grid Box */}
            <div className="bg-[#bdbfc3] border border-[#8c8f94] shadow-[1px_1px_2px_rgba(0,0,0,0.2)]">
                <div className="bg-[#2a3243] text-white font-mono font-bold text-[10px] tracking-wider px-2 py-1.5 uppercase border-b border-[#1a202c]">
                    Commands
                </div>

                {/* Clean 3-Column Grid for Symmetric Actions */}
                <div className="p-2 space-y-2">
                    <div className="grid grid-cols-3 gap-1.5">

                        {/* ADD ANIME BOX */}
                        <AddAnime />

                        {/* ADD EPISODE BOX */}
                        <AddEpisode />

                        {/* ADD SEASON BOX */}
                        <AddSeason />

                    </div>

                    {/* Full Width Add News Button */}
                    <AddNews />

                    {/* Full Width Modernized History Bar */}
                    <button
                        onClick={() => router.push('/admin/terminal')}
                        className="w-full flex items-center justify-center py-2 bg-[#8c6d1d] hover:bg-[#a68224] text-white border border-[#664f14] transition-colors cursor-pointer rounded-sm group"
                    >
                        <div className="flex items-center gap-1.5">
                            <History size={13} className="group-hover:-translate-x-px transition-transform" />
                            <span className="text-[9px] font-mono font-bold tracking-wider">VIEW HISTORY</span>
                        </div>
                    </button>
                </div>

            </div>
            {/* Status Box */}


            <Statusbox />


            {/* Navigate / Quick Links Box */}
            <div className="bg-[#bdbfc3] border border-[#8c8f94] shadow-[1px_1px_2px_rgba(0,0,0,0.2)]">
                <div className="bg-[#2a3243] text-white font-mono font-bold text-[10px] tracking-wider px-2 py-1.5 uppercase border-b border-[#1a202c]">
                    Navigate
                </div>
                <ul className="py-1 text-[11px] bg-[#caccce]">
                    {([['Dashboard', ''], ['Terminal', 'terminal'], ['Users', 'users'], ['Anime', 'anime']] as const).map(([l, t]) => (
                        <li key={t}>
                            <button
                                onClick={() => router.push(`/admin/${t}`)}
                                className="w-full flex items-center gap-1 px-3 py-1.5 hover:bg-[#2a3243] hover:text-white text-[#2a3243] font-medium transition-colors cursor-pointer text-left"
                            >
                                <ChevronRight size={10} className="opacity-70" />
                                {l}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}