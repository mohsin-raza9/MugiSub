import { TopNavLink } from "@/types/navigation";
import Link from "next/link";
import clsx from 'clsx'


const TopNavigation = ({ navigationItems }: { navigationItems: TopNavLink[] }) => {
    return (
        <div className="flex justify-end gap-1">
            {navigationItems && navigationItems.map((navlink, index) => (
                <Link
                    key={index}
                    href={navlink.path}
                    className={clsx(" py-1 text-[11px] text-center hover:bg-[#cfd1d4] hover:text-[#34394d] w-full max-w-20", {
                        'bg-[#cfd1d4] text-[#34394d] border border-[#999999] border-b-0': navlink.isActive,
                        'text-white bg-[#34394d]': !navlink.isActive,
                    })}
                >
                    {navlink.name}
                </Link>
            ))}
        </div>
    )
}

export default TopNavigation;