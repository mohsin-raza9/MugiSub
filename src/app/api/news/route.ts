import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const latestNews = await prisma.newsPost.findFirst({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        author: true
      }
    });

    if (!latestNews) {
      return NextResponse.json({ message: "No news available", data: null }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", data: latestNews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ message: "Internal server error", data: null }, { status: 500 });
  }
}
