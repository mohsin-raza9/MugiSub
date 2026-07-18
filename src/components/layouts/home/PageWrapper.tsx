'use client';

import { useWebStore } from '@/store/useWebStore';
import TopNavigation from "@/components/TopNavigation"
import { Fragment } from "react/jsx-runtime"
import { FC } from 'react';
import Footer from '@/components/Footer';

const PageWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
    const { topNavigationLinks, currentPageTitle } = useWebStore()
    return (
        <Fragment>
            <TopNavigation navigationItems={topNavigationLinks} />
            <div className="w-full min-w-0 p-3 lg:p-4 lg:ml-2 bg-[#cfd1d4] text-[#1a2536] font-sans flex flex-col gap-2 shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] overflow-x-hidden">
                <div className="bg-[#34394d] text-[#ddd] p-3 py-1.5 border border-[#1c2331] font-bold text-[15px] uppercase tracking-wide shadow-[0_1px_3px_0_rgba(0,0,0,0.4)]">
                    {currentPageTitle}
                </div>

                {children}

                <Footer />
            </div>
        </Fragment>
    )
}

export default PageWrapper