import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  const role = session.user.role || "User";

  const adminRoles = ["Developer", "SuperAdmin", "Admin", "Partner"];

  if (adminRoles.includes(role)) {
    redirect("/admin");
  } else {
    // If standard "User" or any other role, go to hxome or user dashboard
    redirect("/");
  }
}
