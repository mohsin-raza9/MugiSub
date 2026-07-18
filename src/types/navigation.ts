export interface TopNavLink {
    name: string;
    path: string;
    isActive: boolean
}

export interface PageConfig {
    title?: string;
    topNavigation?: TopNavLink[];
}

// Hamare saare pages ki mapping ka type
export type PageConfigMap = Record<string, PageConfig>;