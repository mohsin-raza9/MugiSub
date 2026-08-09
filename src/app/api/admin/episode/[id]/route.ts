import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const episode = await prisma.episode.findUnique({
      where: { id },
      include: {
        subtitles: true,
      },
    });

    if (!episode) {
      return NextResponse.json({ error: 'Episode not found' }, { status: 404 });
    }

    return NextResponse.json(episode);
  } catch (error) {
    console.error('Failed to fetch Episode:', error);
    return NextResponse.json({ error: 'Failed to fetch Episode record' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const payload = await req.json();

    const updateData: any = {};
    if (payload.title !== undefined) updateData.title = payload.title?.trim() || null;
    if (payload.description !== undefined) updateData.description = payload.description?.trim() || null;
    if (payload.episodeNumber !== undefined) updateData.episodeNumber = parseInt(String(payload.episodeNumber), 10);
    if (payload.seasonId !== undefined) updateData.seasonId = payload.seasonId || null;
    if (payload.airingDate !== undefined) updateData.airingDate = payload.airingDate || null;
    if (payload.airDate !== undefined && !updateData.airingDate) updateData.airingDate = payload.airDate || null;

    const episode = await prisma.episode.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, episode });
  } catch (error: unknown) {
    console.error('Failed to update Episode:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'An episode with this number already exists for this Anime/Season.' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Failed to update Episode record' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    await prisma.episode.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete Episode:', error);
    return NextResponse.json({ error: 'Failed to delete Episode record' }, { status: 500 });
  }
}
