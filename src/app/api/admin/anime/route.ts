import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AnimeType, AnimeStatus, SubtitleFormat } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const typeMapping: Record<string, AnimeType> = {
      tv: 'TV',
      season: 'TV',
      movie: 'Movie',
      ova: 'OVA',
      ona: 'ONA',
      special: 'Special',
      drama: 'Drama',
      TV: 'TV',
      Movie: 'Movie',
      OVA: 'OVA',
      ONA: 'ONA',
      Special: 'Special',
      Drama: 'Drama',
    };

    const statusMapping: Record<string, AnimeStatus> = {
      airing: 'Airing',
      finished: 'Finished',
      upcoming: 'Upcoming',
      Airing: 'Airing',
      Finished: 'Finished',
      Upcoming: 'Upcoming',
    };

    const animeType = payload.type ? typeMapping[String(payload.type).toLowerCase()] || typeMapping[String(payload.type)] : undefined;
    const animeStatus = payload.status ? statusMapping[String(payload.status).toLowerCase()] || statusMapping[String(payload.status)] : undefined;

    if (!animeType || !animeStatus) {
      return NextResponse.json({ error: 'Invalid anime type or status' }, { status: 400 });
    }

    if (!payload.title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const anime = await prisma.anime.create({
      data: {
        title: payload.title.trim(),
        description: payload.description?.trim() || null,
        type: animeType,
        status: animeStatus,
        image: payload.imageUrl || null,
        episodesCount: payload.episodesCount != null ? Number(payload.episodesCount) : null,
        releaseDate: payload.releaseDate || payload.upcomingDate ? new Date(payload.releaseDate || payload.upcomingDate) : null,
        ratingCount: payload.ratingCount != null ? Number(payload.ratingCount) : 0,
        popularityScore: payload.popularityScore != null ? Number(payload.popularityScore) : 0,
        trendingScore: payload.trendingScore != null ? Number(payload.trendingScore) : 0,
        viewsCount: payload.viewsCount != null ? Number(payload.viewsCount) : 0,
        likesCount: payload.likesCount != null ? Number(payload.likesCount) : 0,
      },
    });

    if (String(payload.type).toLowerCase() === 'movie' && payload.subtitleUrl) {
      const format = (payload.subtitleFormat as SubtitleFormat) || 'SRT';
      await prisma.subtitle.create({
        data: {
          animeId: anime.id,
          fileUrl: payload.subtitleUrl,
          language: payload.subtitleLanguage || 'en',
          languageName: payload.subtitleLanguageName || 'English',
          format,
          isVerified: payload.subtitleIsVerified || false,
          fileSizeKb: payload.subtitleFileSizeKb ?? null,
        },
      });
    }

    return NextResponse.json({ success: true, anime }, { status: 201 });
  } catch (error) {
    console.error('Failed to create Anime:', error);
    return NextResponse.json({ error: 'Failed to create Anime record' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const selectOnly = url.searchParams.get('select') === 'true';

    const animeList = selectOnly
      ? await prisma.anime.findMany({
          select: { id: true, title: true, type: true },
          orderBy: { createdAt: 'desc' },
        })
      : await prisma.anime.findMany({
          orderBy: { createdAt: 'desc' },
          include: { tags: { include: { tag: true } } },
        });

    return NextResponse.json(animeList);
  } catch (error) {
    console.error('Failed to fetch Anime:', error);
    return NextResponse.json({ error: 'Failed to fetch Anime records' }, { status: 500 });
  }
}
