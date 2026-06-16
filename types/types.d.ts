// ==========================================
// MugiSub TypeScript Declarations
// ==========================================

export namespace MugiSub {
  // Better Auth Core User Shape
  export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: "user" | "moderator" | "admin";
    signature?: string | null;
  }

  export interface Session {
    id: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
    userId: string;
  }

  export interface Account {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;
    expiresAt?: Date | null;
    password?: string | null;
  }

  export interface Verification {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date;
  }

  // Anime Catalog
  export interface Anime {
    id: string;
    titleRomaji: string;
    titleEnglish?: string | null;
    titleJapanese?: string | null;
    description?: string | null;
    type: "TV Series" | "Movie" | "OVA" | "Web" | "Special";
    status: "Airing" | "Finished" | "Upcoming";
    airDate?: string | null;
    endDate?: string | null;
    image?: string | null;
    episodesCount?: number | null;
    rating?: number | null;
    ratingCount: number;
    average?: number | null;
    averageCount: number;
    
    // Relations / Joined data
    studios?: Studio[];
    episodes?: Episode[];
    characters?: CharacterRelation[];
    songs?: Song[];
    tags?: Tag[];
    collections?: Collection[];
  }

  export interface Studio {
    id: string;
    name: string;
    description?: string | null;
    image?: string | null;
  }

  export interface Episode {
    id: string;
    animeId: string;
    episodeNumber: number;
    title?: string | null;
    lengthMinutes?: number | null;
    airDate?: string | null;
    releases?: ReleaseFile[];
  }

  // Fansub Releases
  export interface FansubGroup {
    id: string;
    name: string;
    description?: string | null;
    website?: string | null;
  }

  export interface ReleaseFile {
    id: string;
    episodeId: string;
    groupId: string;
    format: string; // mkv, mp4, etc.
    resolution: string; // 1080p, 720p, unk
    languages: string[]; // ["ja", "en"]
    downloadUrl?: string | null;
    isNew: boolean;
    createdAt: Date;
    
    episode?: Episode;
    group?: FansubGroup;
  }

  // Characters & Staff
  export interface Character {
    id: string;
    name: string;
    gender?: string | null;
    description?: string | null;
    image?: string | null;
    rating?: number | null;
    ratingCount: number;
    trashPercent: number;
    haremCount: number;
    tags?: Tag[];
  }

  export interface CharacterRelation {
    character: Character;
    role: "Main" | "Supporting";
    voiceActor?: Creator | null;
  }

  export interface Creator {
    id: string;
    name: string;
    role?: string | null; // e.g. "Voice Actor", "Director"
    bio?: string | null;
    image?: string | null;
  }

  // Songs & Collections & Tags
  export interface Song {
    id: string;
    animeId: string;
    title: string;
    type: "OP" | "ED" | "Insert";
    number?: number | null;
    artist?: string | null;
  }

  export interface Collection {
    id: string;
    name: string;
    description?: string | null;
  }

  export interface Tag {
    id: string;
    name: string;
    description?: string | null;
    parentId?: string | null;
    parent?: Tag | null;
    subtags?: Tag[];
  }

  // Personal Trackers
  export interface MyListEntry {
    id: string;
    userId: string;
    episodeId: string;
    watchStatus: "completed" | "watching" | "on-hold" | "plan-to-watch" | "dropped";
    storageType?: string | null; // e.g. "local", "cloud", "external"
    rating?: number | null; // 1 to 10
    notes?: string | null;
    updatedAt: Date;
    
    episode?: Episode;
  }

  export interface Favorite {
    id: string;
    userId: string;
    animeId?: string | null;
    characterId?: string | null;
  }

  export interface Review {
    id: string;
    userId: string;
    animeId: string;
    title: string;
    content: string;
    rating: number; // 1 to 10
    createdAt: Date;
    
    user?: User;
    anime?: Anime;
  }

  export interface Vote {
    id: string;
    userId: string;
    entityType: "anime" | "character" | "review";
    entityId: string;
    value: number;
  }

  // News & Community Forums
  export interface NewsPost {
    id: string;
    authorId: string;
    title: string;
    content: string;
    createdAt: Date;
    author?: User;
  }

  export interface ForumCategory {
    id: string;
    title: string;
    description?: string | null;
    threads?: ForumThread[];
  }

  export interface ForumThread {
    id: string;
    categoryId: string;
    creatorId: string;
    title: string;
    viewsCount: number;
    createdAt: Date;
    
    category?: ForumCategory;
    creator?: User;
    posts?: ForumPost[];
  }

  export interface ForumPost {
    id: string;
    threadId: string;
    authorId: string;
    content: string;
    parentId?: string | null;
    createdAt: Date;
    
    thread?: ForumThread;
    author?: User;
    parent?: ForumPost | null;
    replies?: ForumPost[];
  }

  // Edit / Moderation Queue
  export interface EditRequest {
    id: string;
    userId: string;
    entityType: "anime" | "character" | "creator";
    entityId: string;
    fieldChanged: string;
    originalValue?: string | null;
    proposedValue?: string | null;
    status: "pending" | "approved" | "rejected";
    reviewerId?: string | null;
    createdAt: Date;
    
    user?: User;
  }

  // Recommendations and Search
  export interface Recommendation {
    animeId: string;
    similarAnimeId: string;
    anime: Anime;
    similarAnime: Anime;
  }

  export interface SearchFilters {
    query: string;
    category: "all" | "anime" | "character" | "club" | "collections" | "creator" | "episodes" | "group" | "mylist" | "songs" | "tags" | "user";
  }

  export interface SearchResults {
    anime: Anime[];
    characters: Character[];
    creators: Creator[];
    releases: ReleaseFile[];
    groups: FansubGroup[];
  }
}
