import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

/**
 * POST /api/anime/[id]/movie-video
 * Body: { videoUrl: string }
 * Updates the videoUrl field on an existing Anime record (intended for movies).
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Auth guard
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const allowedRoles = ["Admin", "SuperAdmin", "Developer"];
    if (!allowedRoles.includes(session.user.role as string)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { videoUrl } = body;

    if (!videoUrl || typeof videoUrl !== "string" || videoUrl.trim() === "") {
      return NextResponse.json({ message: "videoUrl is required" }, { status: 400 });
    }

    // Verify the anime exists and is a Movie
    const existing = await prisma.anime.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ message: "Anime not found" }, { status: 404 });
    }
    if (existing.type !== "Movie") {
      return NextResponse.json(
        { message: "This anime is not a Movie. Only movies support a single video URL." },
        { status: 400 }
      );
    }

    const updated = await prisma.anime.update({
      where: { id },
      data: { videoUrl: videoUrl.trim() },
    });

    return NextResponse.json({ message: "Video URL saved", data: updated }, { status: 200 });
  } catch (error) {
    console.error("Error saving movie video URL:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
