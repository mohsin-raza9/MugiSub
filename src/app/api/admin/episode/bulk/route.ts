import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SubtitleFormat } from '@prisma/client';

function buildSubtitleData(payload: Record<string, unknown>, episodeId: string, animeId: string) {
  if (!payload.subtitleUrl) return null;
  return {
    episodeId,
    animeId,
    fileUrl: payload.subtitleUrl as string,
    language: (payload.subtitleLanguage as string) || 'en',
    languageName: (payload.subtitleLanguageName as string) || 'English',
    format: ((payload.subtitleFormat as SubtitleFormat) || 'SRT') as SubtitleFormat,
    isVerified: payload.subtitleIsVerified || false,
    fileSizeKb: payload.subtitleFileSizeKb != null ? Number(payload.subtitleFileSizeKb) : null,
  };
}

export async function POST(req: Request) {
  try {
    const payloadArray = await req.json();

    if (!Array.isArray(payloadArray) || payloadArray.length === 0) {
      return NextResponse.json({ error: 'Payload must be a non-empty array' }, { status: 400 });
    }

    const results = await prisma.$transaction(async tx => {
      const createdEpisodes = [];

      for (const payload of payloadArray) {
        if (!payload.animeId || payload.episodeNumber == null || payload.episodeNumber === '') {
          throw new Error(
            `Anime ID and Episode Number are required. Failed on episode ${payload.episodeNumber ?? 'unknown'}`
          );
        }

        const episode = await tx.episode.create({
          data: {
            animeId: payload.animeId,
            episodeNumber: parseInt(String(payload.episodeNumber), 10),
            seasonId: payload.seasonId || null,
            title: payload.title?.trim() || null,
            description: payload.description?.trim() || null,
          },
        });

        const subtitleData = buildSubtitleData(payload, episode.id, payload.animeId);
        if (subtitleData) {
          await tx.subtitle.create({ data: subtitleData });
        }

        createdEpisodes.push(episode);
      }

      return createdEpisodes;
    });

    return NextResponse.json(
      { success: true, count: results.length, episodes: results },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Failed to create Bulk Episodes:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'One or more episodes already exist with that number for the given Anime.' },
        { status: 400 }
      );
    }
    const message = error instanceof Error ? error.message : 'Failed to create Bulk Episode records';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
