import { redirect } from "next/navigation";
import { clearAdminSession } from "../../lib/adminAuth";

export async function GET() {
  await clearAdminSession();
  redirect("/admin/login");
}
