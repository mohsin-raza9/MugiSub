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
    const payload = await req.json();

    if (!payload.animeId || payload.episodeNumber == null || payload.episodeNumber === '') {
      return NextResponse.json({ error: 'Anime ID and Episode Number are required' }, { status: 400 });
    }

    const result = await prisma.$transaction(async tx => {
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

      return episode;
    });

    return NextResponse.json({ success: true, episode: result }, { status: 201 });
  } catch (error: unknown) {
    console.error('Failed to create Episode:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'An episode with this number already exists for this Anime.' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Failed to create Episode record' }, { status: 500 });
  }
}
