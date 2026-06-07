import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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
