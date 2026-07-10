import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (!payload.animeId || !payload.episodeNumber) {
      return NextResponse.json({ error: 'Anime ID and Episode Number are required' }, { status: 400 });
    }

    // Use a transaction to ensure Episode and Subtitle (if present) are created together safely
    const result = await prisma.$transaction(async (tx) => {
      const episode = await tx.episode.create({
        data: {
          animeId: payload.animeId,
          episodeNumber: parseFloat(payload.episodeNumber),
          seasonId: payload.seasonId || null,
          title: payload.title || null,
          description: payload.description || null,
          airDate: payload.airDate || null,
        },
      });

      if (payload.subtitleUrl) {
        await tx.subtitle.create({
          data: {
            episodeId: episode.id,
            animeId: payload.animeId,
            fileUrl: payload.subtitleUrl,
            language: 'en', // Defaulting to en for now
            languageName: 'English',
          },
        });
      }

      return episode;
    });

    return NextResponse.json({ success: true, episode: result }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create Episode:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'An episode with this number already exists for this Anime.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create Episode record' }, { status: 500 });
  }
}
