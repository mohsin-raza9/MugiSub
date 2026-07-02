import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const CLOUD_NAME = "dwkjorv82";
const API_KEY = "874132581783897";
const API_SECRET = "UCJz4EiJHWB7kZhfqYzo3NFNpDc";

/**
 * POST /api/cloudinary/upload
 * Body: FormData with fields:
 *   - file: File (image or video)
 *   - resource_type: "image" | "video"  (defaults to "image")
 *
 * Returns: { secure_url: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Auth guard — only logged-in admins/devs may upload
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allowedRoles = ["Admin", "SuperAdmin", "Developer"];
    if (!allowedRoles.includes(session.user.role as string)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const resourceType = (formData.get("resource_type") as string) || "image";

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    // Build signed Cloudinary upload params
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "mugisub";

    // Signature: SHA1 of "folder=mugisub&timestamp=<ts><secret>"
    const signatureStr = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureStr)
      .digest("hex");

    // Build the multipart form for Cloudinary
    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("api_key", API_KEY);
    cloudForm.append("timestamp", String(timestamp));
    cloudForm.append("signature", signature);
    cloudForm.append("folder", folder);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;
    const cloudRes = await fetch(uploadUrl, {
      method: "POST",
      body: cloudForm,
    });

    if (!cloudRes.ok) {
      const errText = await cloudRes.text();
      console.error("Cloudinary error:", errText);
      return NextResponse.json(
        { message: "Cloudinary upload failed", detail: errText },
        { status: 502 }
      );
    }

    const cloudData = await cloudRes.json();
    return NextResponse.json(
      { secure_url: cloudData.secure_url, public_id: cloudData.public_id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cloudinary proxy error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
