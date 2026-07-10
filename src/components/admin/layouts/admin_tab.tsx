import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminTab() {
    const pathname = usePathname();
    return (
        <div className="flex justify-end pr-2 gap-0 mb-0">
            <Link
                href="/admin"
                className={`border border-[#999999] px-3 py-1 text-[11px] ml-[2px] transition-colors cursor-pointer font-sans ${pathname === '/admin'
                    ? 'bg-[#cfd1d4] text-[#1a2536] border-b-[#cfd1d4] -mb-px z-10'
                    : 'bg-[#34394d] text-white hover:bg-[#cfd1d4] hover:text-black border-b-0'
                    }`}
            >
                Dashboard
            </Link>
            <Link
                href="/admin/anime"
                className={`border border-[#999999] px-3 py-1 text-[11px] ml-[2px] transition-colors cursor-pointer font-sans ${pathname === '/admin/anime'
                    ? 'bg-[#cfd1d4] text-[#1a2536] border-b-[#cfd1d4] -mb-px z-10'
                    : 'bg-[#34394d] text-white hover:bg-[#cfd1d4] hover:text-black border-b-0'
                    }`}
            >
                Anime
            </Link>
            <Link
                href="/admin/users"
                className={`border border-[#999999] px-3 py-1 text-[11px] ml-[2px] transition-colors cursor-pointer font-sans ${pathname === '/admin/users'
                    ? 'bg-[#cfd1d4] text-[#1a2536] border-b-[#cfd1d4] -mb-px z-10'
                    : 'bg-[#34394d] text-white hover:bg-[#cfd1d4] hover:text-black border-b-0'
                    }`}
            >
                Users
            </Link>
            <Link
                href="/admin/terminal"
                className={`border border-[#999999] px-3 py-1 text-[11px] ml-[2px] transition-colors cursor-pointer font-sans ${pathname === '/admin/terminal'
                    ? 'bg-[#cfd1d4] text-[#1a2536] border-b-[#cfd1d4] -mb-px z-10'
                    : 'bg-[#34394d] text-white hover:bg-[#cfd1d4] hover:text-black border-b-0'
                    }`}
            >
                Terminal
            </Link>
        </div>
    )
}
