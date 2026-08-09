'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Edit, Trash2, Film, Video, Clapperboard, LayoutList, Loader2 } from 'lucide-react';
import ConfirmModal from '@/components/admin/ui/ConfirmModal';
import EditAnimeModal from '@/components/admin/ui/EditAnimeModal';
import EditSeasonModal from '@/components/admin/ui/EditSeasonModal';
import EditEpisodeModal from '@/components/admin/ui/EditEpisodeModal';

type Episode = { id: string, episodeNumber: number, title: string, description: string };
type Season = { id: string, number: number, title: string, episodes: Episode[] };
type Anime = { id: string, title: string, type: string, status: string, seasons: Season[], episodes: Episode[] };

export default function AnimeAdminPage() {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(true);

    // Confirm modal state
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState<{
        title: string;
        message: string;
        onConfirm: () => void;
        confirmText?: string;
    } | null>(null);

    // Edit modal states
    const [editAnimeOpen, setEditAnimeOpen] = useState(false);
    const [editAnimeId, setEditAnimeId] = useState<string | null>(null);
    const [editSeasonOpen, setEditSeasonOpen] = useState(false);
    const [editSeasonId, setEditSeasonId] = useState<string | null>(null);
    const [editEpisodeOpen, setEditEpisodeOpen] = useState(false);
    const [editEpisodeId, setEditEpisodeId] = useState<string | null>(null);
    const [editEpisodeAnimeId, setEditEpisodeAnimeId] = useState<string | null>(null);

    // Submitting state for delete loading
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchAnime = async (showLoading = true) => {
        if (showLoading) {
            queueMicrotask(() => setLoading(true));
        }
        try {
            const res = await fetch('/api/admin/anime');
            if (res.ok) {
                const data = await res.json();
                setAnimeList(data);
            }
        } catch (error) {
            console.error('Failed to fetch anime list:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const load = async () => {
            await fetchAnime(false);
        };
        void load();
    }, []);

    const handleDeleteConfirm = async () => {
        if (confirmConfig?.onConfirm) {
            setIsDeleting(true);
            try {
                await confirmConfig.onConfirm();
            } finally {
                setIsDeleting(false);
                setConfirmOpen(false);
                setConfirmConfig(null);
            }
        }
    };

    const deleteAnime = (id: string) => {
        const targetAnime = animeList.find(a => a.id === id);
        setConfirmConfig({
            title: 'DELETE ANIME',
            message: `Are you sure you want to delete "${targetAnime?.title || 'this anime'}"? This action cannot be undone and will also delete all seasons, episodes, and subtitles.`,
            confirmText: 'DELETE ANIME',
            onConfirm: async () => {
                const res = await fetch(`/api/admin/anime/${id}`, { method: 'DELETE' });
                if (res.ok) fetchAnime();
                else alert('Failed to delete anime');
            },
        });
        setConfirmOpen(true);
    };

    const deleteSeason = (id: string) => {
        setConfirmConfig({
            title: 'DELETE SEASON',
            message: 'Are you sure you want to delete this season? All episodes in this season will be unlinked.',
            confirmText: 'DELETE SEASON',
            onConfirm: async () => {
                const res = await fetch(`/api/admin/season/${id}`, { method: 'DELETE' });
                if (res.ok) fetchAnime();
                else alert('Failed to delete season');
            },
        });
        setConfirmOpen(true);
    };

    const deleteEpisode = (id: string) => {
        setConfirmConfig({
            title: 'DELETE EPISODE',
            message: 'Are you sure you want to delete this episode? This will also delete all associated subtitles.',
            confirmText: 'DELETE EPISODE',
            onConfirm: async () => {
                const res = await fetch(`/api/admin/episode/${id}`, { method: 'DELETE' });
                if (res.ok) fetchAnime();
                else alert('Failed to delete episode');
            },
        });
        setConfirmOpen(true);
    };

    // ----- Render Components -----
    const EpisodeRow = ({ episode, animeId }: { episode: Episode; animeId: string }) => (
        <div className="flex items-center justify-between py-2 px-4 bg-[#bdbfc3] border border-[#999] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] hover:bg-[#2c3446] transition-colors ml-12 rounded-sm m-2 border-l-2 group">
            <div className="flex items-center gap-3">
                <Video size={16} className="text-gray-400" />
                <span className="text-sm text-[#3b4358] group-hover:text-gray-100">
                    Episode {episode.episodeNumber} {episode.title ? `- ${episode.title}` : ''}
                </span>
            </div>
            <div className="flex gap-1">
                <button
                    onClick={() => {
                        setEditEpisodeId(episode.id);
                        setEditEpisodeAnimeId(animeId);
                        setEditEpisodeOpen(true);
                    }}
                    className="p-1.5 hover:bg-blue-600/30 text-blue-600 rounded transition-colors cursor-pointer"
                    title="Edit Episode"
                >
                    <Edit size={13} />
                </button>
                <button
                    onClick={() => deleteEpisode(episode.id)}
                    className="p-1.5 hover:bg-red-600/30 text-red-600 rounded transition-colors cursor-pointer"
                    title="Delete Episode"
                >
                    <Trash2 size={13} />
                </button>
            </div>
        </div>
    );

    const SeasonRow = ({ season, animeId }: { season: Season; animeId: string }) => {
        const [expanded, setExpanded] = useState(false);
        return (
            <div className="flex flex-col ml-6 m-2">
                <div
                    className="flex items-center justify-between py-2 px-4 bg-[#bdbfc3] border border-[#999] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] hover:bg-[#343d52] transition-colors cursor-pointer rounded-sm group"
                    onClick={() => setExpanded(!expanded)}
                >
                    <div className="flex items-center gap-3">
                        {expanded ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
                        <LayoutList size={16} className="text-purple-950/40" />
                        <span className="text-sm font-semibold text-[#3b4358] group-hover:text-gray-100">
                            Season {season.number} {season.title ? `- ${season.title}` : ''}
                        </span>
                        <span className="text-xs bg-purple-950/40 text-purple-300 px-2 py-0.5 rounded-full font-mono">
                            {season.episodes?.length || 0} eps
                        </span>
                    </div>
                    <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => {
                                setEditSeasonId(season.id);
                                setEditSeasonOpen(true);
                            }}
                            className="p-1.5 hover:bg-blue-600/30 text-blue-600 rounded transition-colors cursor-pointer"
                            title="Edit Season"
                        >
                            <Edit size={13} />
                        </button>
                        <button
                            onClick={() => deleteSeason(season.id)}
                            className="p-1.5 hover:bg-red-600/30 text-red-600 rounded transition-colors cursor-pointer"
                            title="Delete Season"
                        >
                            <Trash2 size={13} />
                        </button>
                    </div>
                </div>
                {expanded && (
                    <div className="mt-1">
                        {season.episodes?.map(ep => <EpisodeRow key={ep.id} episode={ep} animeId={animeId} />)}
                        {(!season.episodes || season.episodes.length === 0) && (
                            <div className="ml-12 text-xs text-gray-500 py-3 italic">No episodes in this season yet.</div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const AnimeRow = ({ anime }: { anime: Anime }) => {
        const [expanded, setExpanded] = useState(false);
        const hasChildren = anime.type === 'TV' || anime.type === 'Drama' || (anime.seasons?.length > 0) || (anime.episodes?.length > 0);
        const isMovie = anime.type === 'Movie';

        return (
            <div className="flex flex-col mb-2">
                <div
                    className={`flex items-center justify-between py-3 px-4 bg-[#bdbfc3] shadow-[0_1px_3px_0_rgba(0,0,0,0.4)] hover:bg-[#9fa2a8] border-l-4 cursor-pointer transition-colors rounded-sm ${
                        anime.status === 'Airing'
                            ? 'border-[#009135]'
                            : anime.status === 'Upcoming'
                            ? 'border-[#0149a0]'
                            : 'border-[#626d7d]'
                    }`}
                    onClick={() => setExpanded(!expanded)}
                >
                    <div className="flex items-center gap-4">
                        {isMovie ? (
                            <Clapperboard size={20} className="text-purple-400 shrink-0" />
                        ) : hasChildren ? (
                            expanded ? (
                                <ChevronDown size={20} className="text-gray-400 shrink-0" />
                            ) : (
                                <ChevronRight size={20} className="text-gray-400 shrink-0" />
                            )
                        ) : (
                            <Film size={20} className="text-gray-500 shrink-0" />
                        )}
                        <div>
                            <h3 className="text-sm font-bold text-[#3b4358]">{anime.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] uppercase font-bold bg-[#3b4358] px-1.5 py-0.5 rounded text-gray-300 border border-[#4b5368]">
                                    {anime.type}
                                </span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 uppercase border rounded ${
                                    anime.status === 'Airing'
                                        ? 'text-[#009135] border-[#009135]/30 bg-[#009135]/10'
                                        : anime.status === 'Upcoming'
                                        ? 'text-[#0149a0] border-[#0149a0]/30 bg-[#0149a0]/10'
                                        : 'text-[#626d7d] border-[#626d7d]/30 bg-[#626d7d]/10'
                                }`}>
                                    {anime.status}
                                </span>
                                {!isMovie && (
                                    <span className="text-[10px] font-mono text-gray-400 bg-[#3b4358] px-1.5 py-0.5 rounded">
                                        {(anime.seasons?.length || 0) + (anime.episodes?.length || 0)} items
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => {
                                setEditAnimeId(anime.id);
                                setEditAnimeOpen(true);
                            }}
                            className="p-2 hover:bg-blue-600/20 text-blue-600 rounded transition-colors cursor-pointer"
                            title="Edit Anime"
                        >
                            <Edit size={15} />
                        </button>
                        <button
                            onClick={() => deleteAnime(anime.id)}
                            className="p-2 hover:bg-red-600/20 text-red-600 rounded transition-colors cursor-pointer"
                            title="Delete Anime"
                        >
                            <Trash2 size={15} />
                        </button>
                    </div>
                </div>

                {expanded && !isMovie && (
                    <div className="bg-[#bdbfc3] border border-[#999] rounded-b-md">
                        {anime.seasons?.map(s => <SeasonRow key={s.id} season={s} animeId={anime.id} />)}
                        {anime.episodes?.map(ep => <EpisodeRow key={ep.id} episode={ep} animeId={anime.id} />)}
                        {anime.seasons?.length === 0 && anime.episodes?.length === 0 && (
                            <div className="text-xs text-gray-500 p-6 text-center border border-dashed border-gray-700 rounded-sm italic">
                                No seasons or episodes yet. Use the commands in the sidebar to add some!
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-[calc(100vh-60px)] mt-5">
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2e384d #1a202c' }}>
                {loading ? (
                    <div className="flex items-center justify-center h-40">
                        <Loader2 size={24} className="text-gray-500 animate-spin" />
                        <span className="ml-3 text-gray-400 text-sm tracking-widest uppercase">Loading Database...</span>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {animeList.map(anime => <AnimeRow key={anime.id} anime={anime} />)}
                        {animeList.length === 0 && (
                            <div className="text-center py-12 text-gray-500 text-sm border-2 border-dashed border-gray-700 rounded-sm mx-auto max-w-md bg-[#1f2635]/50">
                                <Film size={32} className="mx-auto mb-3 opacity-40" />
                                <p className="font-mono text-xs uppercase tracking-wider">No Anime found in database</p>
                                <p className="text-[10px] mt-2 opacity-70">Use the ADD_ANIME button to create your first entry</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modals */}
            <ConfirmModal
                isOpen={confirmOpen}
                title={confirmConfig?.title || ''}
                message={confirmConfig?.message || ''}
                confirmText={confirmConfig?.confirmText || 'Confirm'}
                onConfirm={handleDeleteConfirm}
                onCancel={() => {
                    if (!isDeleting) {
                        setConfirmOpen(false);
                        setConfirmConfig(null);
                    }
                }}
                isLoading={isDeleting}
            />

            <EditAnimeModal
                isOpen={editAnimeOpen}
                animeId={editAnimeId}
                onClose={() => {
                    setEditAnimeOpen(false);
                    setEditAnimeId(null);
                }}
                onSaved={fetchAnime}
            />

            <EditSeasonModal
                isOpen={editSeasonOpen}
                seasonId={editSeasonId}
                onClose={() => {
                    setEditSeasonOpen(false);
                    setEditSeasonId(null);
                }}
                onSaved={fetchAnime}
            />

            <EditEpisodeModal
                isOpen={editEpisodeOpen}
                episodeId={editEpisodeId}
                animeId={editEpisodeAnimeId}
                onClose={() => {
                    setEditEpisodeOpen(false);
                    setEditEpisodeId(null);
                    setEditEpisodeAnimeId(null);
                }}
                onSaved={fetchAnime}
            />

        </div>
    );
}
