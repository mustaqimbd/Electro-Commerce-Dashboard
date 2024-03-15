import type { NextRequest } from "next/server";
import decodeJWT from "./utilities/decodeJWT";
import { TUser } from "./redux/features/auth/interface";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return Response.redirect(new URL("/login", request.url));
  }

  // try {
  const currentUser = decodeJWT(accessToken) as TUser;

  if (currentUser.role !== "admin") {
    return Response.redirect(new URL("/error", request.url));
  }

  // if (
  //   currentUser.role === "admin" &&
  //   request.nextUrl.pathname === "/registration"
  // ) {
  //   return Response.redirect(new URL("/registration", request.url));
  // }
  if (
    currentUser.role === "admin" &&
    !request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  // return new Response(null, { status: 200 });
  // } catch (error) {
  //   return Response.redirect(new URL("/error", request.url));
  // }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|login|registration|error).*)",
  ],
};
