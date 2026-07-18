import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TopNavLink } from '@/types/navigation';
import { PAGE_CONFIG_MAP, DEFAULT_PAGE_CONFIG } from '@/config/pages';
import { useAnimeStore } from './animeStore';

interface WebStore {
    // --- States ---
    currentPagePath: string;
    currentPageTitle: string;
    topNavigationLinks: TopNavLink[];

    // --- Actions ---
    setPageByPathname: (pathname: string) => void;
    setDynamicAnimeTitle: (pathname: string) => void;
}

export const useWebStore = create<WebStore>()(
    persist(
        (set, get) => ({
            // Default States
            currentPagePath: '/',
            currentPageTitle: 'Home Feed',
            topNavigationLinks: PAGE_CONFIG_MAP['/']?.topNavigation?.map((link) => ({
                ...link,
                isActive: link.path === '/',
            })) || [],

            // --- Scenario 1: Path change update ---
            setPageByPathname: (pathname: string) => {
                if (pathname.startsWith('/anime/')) {
                    get().setDynamicAnimeTitle(pathname);
                    return;
                }

                if (get().currentPagePath === pathname) return;

                const config = PAGE_CONFIG_MAP[pathname] || DEFAULT_PAGE_CONFIG;
                const targetTitle = config.title || '';
                const targetNavigation: TopNavLink[] = [];

                if (config.topNavigation && config.topNavigation.length > 0) {
                    config.topNavigation.forEach(link => {
                        targetNavigation.push({
                            ...link,
                            isActive: link.path === pathname,
                        });
                    });
                }

                set({
                    currentPagePath: pathname,
                    currentPageTitle: targetTitle,
                    topNavigationLinks: targetNavigation,
                });
            },

            // --- Scenario 2: Dynamic Anime Title Update ---
            setDynamicAnimeTitle: (pathname: string) => {
                const currentState = get();

                let inferredTitle = '';
                let animeId = '';

                if (pathname.startsWith('/anime/')) {
                    const uuidMatch = pathname.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
                    if (uuidMatch) {
                        animeId = uuidMatch[0];
                    }
                }

                if (animeId) {
                    const animeStore = useAnimeStore.getState();
                    const cachedAnime = animeStore.getAnimeById(animeId);

                    if (cachedAnime) {
                        inferredTitle = cachedAnime.title;
                    } else {
                        inferredTitle = 'Anime Hub';
                    }
                }

                if (currentState.currentPagePath === pathname && currentState.currentPageTitle === inferredTitle) {
                    return;
                }

                set({
                    currentPagePath: pathname,
                    currentPageTitle: `Anime: ${inferredTitle}`,
                    topNavigationLinks: [{ name: 'Main', path: pathname, isActive: true }],
                });
            },
        }),
        {
            name: 'web-navigation-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);