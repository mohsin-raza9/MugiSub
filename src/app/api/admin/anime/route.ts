import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AnimeType, AnimeStatus } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Map frontend payload types to Prisma enums
    const typeMapping: Record<string, AnimeType> = {
      movie: 'Movie',
      season: 'Season',
      drama: 'Daram',
    };
    
    const statusMapping: Record<string, AnimeStatus> = {
      Airing: 'Airing',
      Finished: 'Finished',
      Upcoming: 'Upcoming',
    };

    const animeType = typeMapping[payload.type];
    const animeStatus = statusMapping[payload.status];

    if (!animeType || !animeStatus) {
      return NextResponse.json({ error: 'Invalid anime type or status' }, { status: 400 });
    }

    if (!payload.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Create the main Anime record
    const anime = await prisma.anime.create({
      data: {
        title: payload.title,
        description: payload.description || null,
        type: animeType,
        status: animeStatus,
        airDate: payload.upcomingDate || null,
        image: payload.imageUrl || null,
        bannerImage: payload.bannerUrl || null,
        trailerUrl: payload.trailerUrl || null,
      },
    });

    // If it's a Movie and a subtitle is provided, create the Subtitle record
    if (payload.type === 'movie' && payload.subtitleUrl) {
      await prisma.subtitle.create({
        data: {
          animeId: anime.id,
          fileUrl: payload.subtitleUrl,
          language: 'en', // Defaulting to 'en', can be enhanced later to support selection
          languageName: 'English',
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

    let animeList;
    if (selectOnly) {
      animeList = await prisma.anime.findMany({
        select: { id: true, title: true, type: true },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      animeList = await prisma.anime.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(animeList);
  } catch (error) {
    console.error('Failed to fetch Anime:', error);
    return NextResponse.json({ error: 'Failed to fetch Anime records' }, { status: 500 });
  }
}
