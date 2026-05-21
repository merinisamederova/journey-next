import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "journey_admin_session";
const SESSION_DAYS = 7;

function getSessionSecret() {
  return process.env.ADMIN_AUTH_SECRET ?? process.env.ADMIN_ACCESS_TOKEN ?? "";
}

function sign(value: string) {
  const secret = getSessionSecret();

  if (!secret) {
    return "";
  }

  return createHmac("sha256", secret).update(value).digest("hex");
}

function isValidSignature(value: string, signature: string) {
  const expected = sign(value);

  if (!expected || expected.length !== signature.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD ?? process.env.ADMIN_ACCESS_TOKEN);
}

export function isAdminPassword(password: string) {
  const expectedPassword = process.env.ADMIN_PASSWORD ?? process.env.ADMIN_ACCESS_TOKEN;

  if (!expectedPassword || expectedPassword.length !== password.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(expectedPassword), Buffer.from(password));
}

export async function createAdminSession() {
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const value = `admin.${expiresAt}`;
  const signature = sign(value);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, `${value}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    expires: new Date(expiresAt),
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;

  if (!session) {
    return false;
  }

  const parts = session.split(".");

  if (parts.length !== 3) {
    return false;
  }

  const [role, expiresAt, signature] = parts;
  const value = `${role}.${expiresAt}`;

  if (role !== "admin" || Number(expiresAt) < Date.now()) {
    return false;
  }

  return isValidSignature(value, signature);
}

export async function requireAdmin() {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }
}
