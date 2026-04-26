import { AUTH_COOKIE } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const isLoginRoute = request.nextUrl.pathname.startsWith("/login");
  const isStatic =
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/favicon");

  if (isStatic) {
    return NextResponse.next();
  }

  if (!token && !isLoginRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isLoginRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api).*)"],
};
