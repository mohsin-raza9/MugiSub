import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const animeId = searchParams.get('animeId');

    if (!animeId) {
      return NextResponse.json({ error: 'animeId is required' }, { status: 400 });
    }

    const anime = await prisma.anime.findUnique({
      where: { id: animeId },
      select: {
        id: true,
        title: true,
        type: true,
        seasons: {
          orderBy: { number: 'asc' },
          select: {
            id: true,
            number: true,
            title: true,
            episodes: {
              orderBy: { episodeNumber: 'asc' },
              select: {
                id: true,
                episodeNumber: true,
                title: true,
                airingDate: true,
                subtitles: {
                  select: {
                    id: true,
                    language: true,
                    languageName: true,
                    format: true,
                    fileUrl: true,
                    fileSizeKb: true,
                    isVerified: true,
                    downloads: true,
                  },
                },
              },
            },
          },
        },
        episodes: {
          orderBy: { episodeNumber: 'asc' },
          select: {
            id: true,
            episodeNumber: true,
            title: true,
            airingDate: true,
            seasonId: true,
            subtitles: {
              select: {
                id: true,
                language: true,
                languageName: true,
                format: true,
                fileUrl: true,
                fileSizeKb: true,
                isVerified: true,
                downloads: true,
              },
            },
          },
        },
        subtitle: {
          where: { episodeId: null },
          select: {
            id: true,
            language: true,
            languageName: true,
            format: true,
            fileUrl: true,
            fileSizeKb: true,
            isVerified: true,
            downloads: true,
          },
        },
      },
    });

    if (!anime) {
      return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
    }

    const type = anime.type; // TV, Movie, OVA, ONA, Special, Drama

    // Movie type: return direct subtitles attached to the anime (not to any episode)
    if (type === 'Movie') {
      return NextResponse.json({
        contentType: 'movie',
        data: {
          title: anime.title,
          subtitles: anime.subtitle,
        },
      });
    }

    // Series (TV) with seasons: return tabbed seasons with their episodes
    if (type === 'TV' && anime.seasons.length > 0) {
      return NextResponse.json({
        contentType: 'series',
        seasons: anime.seasons,
      });
    }

    // Drama, OVA, ONA, Special, or TV without seasons: flat episode list
    // Filter episodes that are NOT assigned to a season (standalone)
    const standaloneEpisodes = anime.episodes.filter((ep) => !ep.seasonId);

    return NextResponse.json({
      contentType: 'drama',
      episodes: standaloneEpisodes,
    });
  } catch (error) {
    console.error('Failed to fetch anime files:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
