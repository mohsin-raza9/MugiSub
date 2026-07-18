'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useWebStore } from '@/store/useWebStore';
import { useAnimeStore } from '@/store/animeStore';

export default function PathSyncListener() {
    const pathname = usePathname();
    const setPageByPathname = useWebStore((state) => state.setPageByPathname);
    const hasFetched = useAnimeStore((state) => state.hasFetched);

    useEffect(() => {
        setPageByPathname(pathname);
    }, [pathname, setPageByPathname, hasFetched]);

    return null;
}