import { PageConfigMap, PageConfig } from '@/types/navigation';

export const PAGE_CONFIG_MAP: PageConfigMap = {
    '/': {
        title: 'Home Feed',
        topNavigation: [
            { name: 'Main', path: '/', isActive: true },
            { name: 'Blog', path: '/blog', isActive: false },
            { name: 'Forum', path: '/forum', isActive: false },
            { name: 'Outbox', path: '/outbox', isActive: false },
        ],
    },
    '/admin': {
        title: 'Admin Panel',
        topNavigation: [
            { name: 'Dashboard', path: '/admin', isActive: true },
            { name: 'Anime', path: '/admin/anime', isActive: false },
            { name: 'User', path: '/admin/users', isActive: false },
            { name: 'Terminal', path: '/admin/terminal', isActive: false },
        ],
    },
    '/admin/anime': {
        title: 'Anime Management',
        topNavigation: [
            { name: 'Dashboard', path: '/admin', isActive: false },
            { name: 'Anime', path: '/admin/anime', isActive: true },
            { name: 'User', path: '/admin/users', isActive: false },
            { name: 'Terminal', path: '/admin/terminal', isActive: false },
        ],
    },
    '/admin/users': {
        title: 'User Management',
        topNavigation: [
            { name: 'Dashboard', path: '/admin', isActive: false },
            { name: 'Anime', path: '/admin/anime', isActive: false },
            { name: 'User', path: '/admin/users', isActive: true },
            { name: 'Terminal', path: '/admin/terminal', isActive: false },
        ],
    },
    '/admin/terminal': {
        title: 'Logs',
        topNavigation: [
            { name: 'Dashboard', path: '/admin', isActive: false },
            { name: 'Anime', path: '/admin/anime', isActive: false },
            { name: 'User', path: '/admin/users', isActive: false },
            { name: 'Terminal', path: '/admin/terminal', isActive: true },
        ],
    },
};

export const DEFAULT_PAGE_CONFIG: PageConfig = {
    topNavigation: [
        { name: 'Home', path: '/', isActive: false },
        { name: 'Trending', path: '/trending', isActive: false },
        { name: 'Schedule', path: '/schedule', isActive: false },
    ],
};