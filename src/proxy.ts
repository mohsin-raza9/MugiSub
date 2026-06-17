import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    // Determine the current path
    const pathname = request.nextUrl.pathname;

    // We only care about /admin routes for now
    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    try {
        // Fetch the session from the better-auth API endpoint
        const response = await fetch(new URL("/api/auth/get-session", request.url), {
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        });

        if (!response.ok) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        const sessionData = await response.json();

        if (!sessionData || !sessionData.user) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        // Role-based access control
        const role = sessionData.user.role || "User";
        const adminRoles = ["Developer", "Super Admin", "Admin", "Partner"];

        if (!adminRoles.includes(role)) {
            // User does not have access to admin routes
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        // If there's an error verifying the session, safely redirect to home
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/admin/:path*", "/admin"],
};
