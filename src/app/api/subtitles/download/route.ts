import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subtitleId = searchParams.get('subtitleId');

    if (!subtitleId) {
      return new Response('subtitleId is required', { status: 400 });
    }

    const subtitle = await prisma.subtitle.findUnique({
      where: { id: subtitleId },
      include: {
        anime: true,
        episode: {
          include: {
            anime: true,
          },
        },
      },
    });

    if (!subtitle) {
      return new Response('Subtitle not found', { status: 404 });
    }

    // Determine safe filename
    let animeTitle = '';
    let detail = '';

    if (subtitle.episode) {
      animeTitle = subtitle.episode.anime.title;
      detail = `EP${String(subtitle.episode.episodeNumber).padStart(2, '0')}`;
      if (subtitle.episode.title) {
        detail += ` - ${subtitle.episode.title}`;
      }
    } else if (subtitle.anime) {
      animeTitle = subtitle.anime.title;
      detail = 'Movie';
    } else {
      animeTitle = 'Subtitle';
      detail = subtitle.id;
    }

    const format = subtitle.format || 'SRT';
    const lang = subtitle.languageName || subtitle.language || 'English';
    const rawFileName = `${animeTitle} [${detail}] [${lang}].${format.toLowerCase()}`;
    const cleanFileName = rawFileName.replace(/[/\\?%*:|"<>\r\n]/g, '_');
    const encodedFileName = encodeURIComponent(cleanFileName);

    // Fetch the file contents from the URL (Cloudinary)
    const fileRes = await fetch(subtitle.fileUrl);
    if (!fileRes.ok) {
      return new Response('Failed to retrieve file from storage provider', { status: 502 });
    }

    const fileBuffer = await fileRes.arrayBuffer();

    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${cleanFileName}"; filename*=UTF-8''${encodedFileName}`,
      },
    });
  } catch (error) {
    console.error('Failed to download subtitle file:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subtitleId } = body;

    if (!subtitleId) {
      return NextResponse.json({ error: 'subtitleId is required' }, { status: 400 });
    }

    const updatedSubtitle = await prisma.subtitle.update({
      where: { id: subtitleId },
      data: {
        downloads: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true, downloads: updatedSubtitle.downloads });
  } catch (error) {
    console.error('Failed to increment download count:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

