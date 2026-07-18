'use client';

import { useEffect, useState } from 'react';

export function useAnimeList(isOpen: boolean) {
  const [animeList, setAnimeList] = useState<{ id: string; title: string; type?: string }[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/admin/anime?select=true')
      .then(res => res.json())
      .then(data => setAnimeList(Array.isArray(data) ? data : []))
      .catch(err => console.error('Failed to fetch anime', err));
  }, [isOpen]);

  return animeList;
}

export function useSeasonList(animeId: string) {
  const [seasonList, setSeasonList] = useState<{ id: string; title: string | null; number: number }[]>([]);

  useEffect(() => {
    if (!animeId) {
      setSeasonList([]);
      return;
    }
    fetch(`/api/admin/season?select=true&animeId=${animeId}`)
      .then(res => res.json())
      .then(data => setSeasonList(Array.isArray(data) ? data : []))
      .catch(err => console.error('Failed to fetch seasons', err));
  }, [animeId]);

  return seasonList;
}
