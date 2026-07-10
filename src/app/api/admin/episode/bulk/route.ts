import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const payloadArray = await req.json();

    if (!Array.isArray(payloadArray) || payloadArray.length === 0) {
      return NextResponse.json({ error: 'Payload must be a non-empty array' }, { status: 400 });
    }

    // Process all episodes in a single transaction
    const results = await prisma.$transaction(async (tx) => {
      const createdEpisodes = [];

      for (const payload of payloadArray) {
        if (!payload.animeId || !payload.episodeNumber) {
          throw new Error(`Anime ID and Episode Number are required. Failed on episode ${payload.episodeNumber || 'unknown'}`);
        }

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

        createdEpisodes.push(episode);
      }

      return createdEpisodes;
    });

    return NextResponse.json({ success: true, count: results.length, episodes: results }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create Bulk Episodes:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'One or more episodes in the bulk payload already exist with that number for the given Anime.' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create Bulk Episode records' }, { status: 500 });
  }
}
