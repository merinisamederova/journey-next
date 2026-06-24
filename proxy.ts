import { NextResponse, type NextRequest } from "next/server";

const primaryHost = "journeykyrgyzstan.com";
const legacyHosts = new Set([
  "www.journeykyrgyzstan.com",
  "journey-kyrgyztan.vercel.app",
  "journey-kyrgyzstan.vercel.app",
  "www.journey-kyrgyzstan.vercel.app",
]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();

  if (!host || (!legacyHosts.has(host) && host !== primaryHost)) {
    return NextResponse.next();
  }

  if (host === primaryHost) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https";
  url.host = primaryHost;

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|favicon-48.png|favicon-96.png).*)"],
};
