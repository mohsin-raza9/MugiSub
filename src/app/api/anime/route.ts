import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let queryArgs: Prisma.AnimeFindManyArgs = {
      take: 10,
    };

    switch (category) {
      case 'current-season':
        queryArgs = {
          where: { status: 'Airing' },
          take: 6, // Match the grid size (6 columns)
        };
        break;
      case 'current-popular':
        queryArgs = {
          where: { status: 'Airing' },
          orderBy: { ratingCount: 'desc' },
          take: 5, // Match list size
        };
        break;
      case 'latest':
        // No createdAt field, sort by id descending to simulate latest added
        queryArgs = {
          orderBy: { id: 'desc' },
          take: 5,
        };
        break;
      case 'popular':
        queryArgs = {
          orderBy: { ratingCount: 'desc' },
          take: 5,
        };
        break;
      case 'trending':
        queryArgs = {
          orderBy: { average: 'desc' },
          take: 5,
        };
        break;
      default:
        return NextResponse.json({ message: "Invalid category" }, { status: 400 });
    }

    const animes = await prisma.anime.findMany({
      ...queryArgs,
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        studios: {
          include: {
            studio: true
          }
        }
      }
    });

    if (!animes || animes.length === 0) {
      return NextResponse.json({ message: "No anime found", data: [] }, { status: 200 });
    }

    return NextResponse.json({ message: "Success", data: animes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching anime:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Auth guard
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const allowedRoles = ["Admin", "SuperAdmin", "Developer"];
    if (!allowedRoles.includes(session.user.role as string)) {
      return NextResponse.json({ message: "Forbidden: insufficient role" }, { status: 403 });
    }

    const body = await request.json();
    const {
      titleRomaji,
      titleEnglish,
      titleJapanese,
      description,
      type,        // "Movie" | "TV Series" | "OVA" | "Web" | "Special"
      status,      // "Airing" | "Finished" | "Upcoming"
      airDate,
      endDate,
      image,       // Cloudinary URL
      videoUrl,    // Cloudinary video URL (movies only)
      episodesCount,
    } = body;

    if (!titleRomaji || typeof titleRomaji !== "string" || titleRomaji.trim() === "") {
      return NextResponse.json({ message: "titleRomaji is required" }, { status: 400 });
    }
    if (!type || !["Movie", "TV Series", "OVA", "Web", "Special"].includes(type)) {
      return NextResponse.json({ message: "Valid type is required (Movie, TV Series, OVA, Web, Special)" }, { status: 400 });
    }
    if (!status || !["Airing", "Finished", "Upcoming"].includes(status)) {
      return NextResponse.json({ message: "Valid status is required (Airing, Finished, Upcoming)" }, { status: 400 });
    }

    const anime = await prisma.anime.create({
      data: {
        titleRomaji: titleRomaji.trim(),
        titleEnglish: titleEnglish?.trim() || null,
        titleJapanese: titleJapanese?.trim() || null,
        description: description?.trim() || null,
        type,
        status,
        airDate: airDate?.trim() || null,
        endDate: endDate?.trim() || null,
        image: image || null,
        videoUrl: videoUrl || null,
        episodesCount: episodesCount ? Number(episodesCount) : null,
      },
    });

    return NextResponse.json({ message: "Anime created", data: anime }, { status: 201 });
  } catch (error) {
    console.error("Error creating anime:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

