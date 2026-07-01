import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

export async function POST(request: NextRequest) {
  try {
    // Verify the session
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Only admins, super admins, and developers can post news
    const allowedRoles = ["Admin", "SuperAdmin", "Developer"];
    if (!allowedRoles.includes(session.user.role as string)) {
      return NextResponse.json({ message: "Forbidden: insufficient role" }, { status: 403 });
    }

    const body = await request.json();
    const { title, content } = body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json({ message: "Content is required" }, { status: 400 });
    }

    const newsPost = await prisma.newsPost.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        authorId: session.user.id,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json({ message: "News post created", data: newsPost }, { status: 201 });
  } catch (error) {
    console.error("Error creating news post:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
