import { create } from 'zustand';
export interface AnimeItem {
  id: string;
  title: string;
  description: string | null;
  type: string;
  status: string;
  releaseDate: string | null;
  image: string | null;
  episodesCount: number | null;
  rating: number | null;
  ratingCount: number;
  average: number | null;
  averageCount: number;
  viewsCount: number;
  popularity: number;
  trendingScore: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AnimeStore {
  animes: AnimeItem[];
  isLoading: boolean;
  hasFetched: boolean;          // dubara fetch rokne ke liye
  error: string | null;

  fetchAnimes: () => Promise<void>;
  getAnimeById: (id: string) => AnimeItem | undefined;
}

export const useAnimeStore = create<AnimeStore>((set, get) => ({
  animes: [],
  isLoading: false,
  hasFetched: false,
  error: null,

  // ─── Fetch all anime from admin API ───────────
  fetchAnimes: async () => {
    if (get().hasFetched) return;

    set({ isLoading: true, error: null });

    try {
      const res = await fetch('/api/admin/anime');
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data: AnimeItem[] = await res.json();
      set({ animes: data, hasFetched: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  getAnimeById: (id: string) => {
    return get().animes.find((a) => a.id === id);
  },
}));
