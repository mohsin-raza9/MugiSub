import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AnimeType, AnimeStatus } from '@prisma/client';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const anime = await prisma.anime.findUnique({
      where: { id },
      include: {
        seasons: true,
        episodes: true,
      },
    });

    if (!anime) {
      return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
    }

    return NextResponse.json(anime);
  } catch (error) {
    console.error('Failed to fetch Anime:', error);
    return NextResponse.json({ error: 'Failed to fetch Anime record' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const payload = await req.json();

    const typeMapping: Record<string, AnimeType> = {
      tv: 'TV', season: 'TV', movie: 'Movie', ova: 'OVA', ona: 'ONA', special: 'Special', drama: 'Drama',
      TV: 'TV', Movie: 'Movie', OVA: 'OVA', ONA: 'ONA', Special: 'Special', Drama: 'Drama',
    };

    const statusMapping: Record<string, AnimeStatus> = {
      airing: 'Airing', finished: 'Finished', upcoming: 'Upcoming',
      Airing: 'Airing', Finished: 'Finished', Upcoming: 'Upcoming',
    };

    const updateData: any = {};
    if (payload.title) updateData.title = payload.title.trim();
    if (payload.description !== undefined) updateData.description = payload.description?.trim() || null;
    if (payload.type) updateData.type = typeMapping[String(payload.type).toLowerCase()] || typeMapping[String(payload.type)];
    if (payload.status) updateData.status = statusMapping[String(payload.status).toLowerCase()] || statusMapping[String(payload.status)];
    if (payload.imageUrl !== undefined) updateData.image = payload.imageUrl || null;
    if (payload.episodesCount !== undefined) updateData.episodesCount = payload.episodesCount != null ? Number(payload.episodesCount) : null;
    if (payload.releaseDate || payload.upcomingDate) updateData.releaseDate = new Date(payload.releaseDate || payload.upcomingDate);

    const anime = await prisma.anime.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, anime });
  } catch (error) {
    console.error('Failed to update Anime:', error);
    return NextResponse.json({ error: 'Failed to update Anime record' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    await prisma.anime.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete Anime:', error);
    return NextResponse.json({ error: 'Failed to delete Anime record' }, { status: 500 });
  }
}
