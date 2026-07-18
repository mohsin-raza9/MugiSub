import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (!payload.animeId || payload.number == null || payload.number === '') {
      return NextResponse.json({ error: 'Anime and Season Number are required' }, { status: 400 });
    }

    const season = await prisma.season.create({
      data: {
        animeId: payload.animeId,
        number: parseInt(String(payload.number), 10),
        title: payload.title?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, season }, { status: 201 });
  } catch (error: unknown) {
    console.error('Failed to create Season:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A season with this number already exists for this Anime.' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Failed to create Season record' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const animeId = url.searchParams.get('animeId');
    const selectOnly = url.searchParams.get('select') === 'true';
    const filter = animeId ? { animeId } : {};

    const seasons = selectOnly
      ? await prisma.season.findMany({
          where: filter,
          select: { id: true, title: true, number: true },
          orderBy: { number: 'asc' },
        })
      : await prisma.season.findMany({
          where: filter,
          orderBy: { number: 'asc' },
        });

    return NextResponse.json(seasons);
  } catch (error) {
    console.error('Failed to fetch Seasons:', error);
    return NextResponse.json({ error: 'Failed to fetch Season records' }, { status: 500 });
  }
}
