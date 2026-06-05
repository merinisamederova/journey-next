import { NextResponse, type NextRequest } from "next/server";

const primaryHost = "www.journeykyrgyzstan.com";
const legacyHosts = new Set([
  "journey-kyrgyzstan.vercel.app",
  "www.journey-kyrgyzstan.vercel.app",
  "journeykyrgyzstan.com",
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
  matcher: ["/((?!_next/static|_next/image|favicon.ico|favicon.svg).*)"],
};
