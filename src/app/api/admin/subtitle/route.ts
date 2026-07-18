import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SubtitleFormat } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (!payload.fileUrl) {
      return NextResponse.json({ error: 'Subtitle file URL is required' }, { status: 400 });
    }

    const subtitle = await prisma.subtitle.create({
      data: {
        animeId: payload.animeId || null,
        episodeId: payload.episodeId || null,
        language: payload.language || 'en',
        languageName: payload.languageName || 'English',
        format: (payload.format as SubtitleFormat) || 'SRT',
        isVerified: payload.isVerified || false,
        fileUrl: payload.fileUrl,
        fileSizeKb: payload.fileSizeKb != null ? Number(payload.fileSizeKb) : null,
      },
    });

    return NextResponse.json({ success: true, subtitle }, { status: 201 });
  } catch (error) {
    console.error('Failed to create Subtitle:', error);
    return NextResponse.json({ error: 'Failed to create Subtitle record' }, { status: 500 });
  }
}
