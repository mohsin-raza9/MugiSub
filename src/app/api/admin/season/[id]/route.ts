import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const season = await prisma.season.findUnique({
      where: { id },
      include: {
        episodes: true,
      },
    });

    if (!season) {
      return NextResponse.json({ error: 'Season not found' }, { status: 404 });
    }

    return NextResponse.json(season);
  } catch (error) {
    console.error('Failed to fetch Season:', error);
    return NextResponse.json({ error: 'Failed to fetch Season record' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const payload = await req.json();

    const updateData: any = {};
    if (payload.title !== undefined) updateData.title = payload.title?.trim() || null;
    if (payload.number !== undefined) updateData.number = parseInt(String(payload.number), 10);

    const season = await prisma.season.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, season });
  } catch (error: unknown) {
    console.error('Failed to update Season:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A season with this number already exists for this Anime.' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Failed to update Season record' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    await prisma.season.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete Season:', error);
    return NextResponse.json({ error: 'Failed to delete Season record' }, { status: 500 });
  }
}
