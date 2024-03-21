import type { NextRequest } from "next/server";
import decodeJWT from "./utilities/decodeJWT";
import { TUser } from "./redux/features/auth/interface";
import getAccessToken from "./lib/getAccessToken";

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (!accessToken) {
    try {
      accessToken = await getAccessToken(refreshToken);
    } catch (error) {
      return Response.redirect(new URL("/login", request.url));
    }
  }

  // try {
  const currentUser = decodeJWT(accessToken as string) as TUser;

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
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|login|registration|error).*)",
  ],
};

//middleware.ts
// import type { NextRequest } from "next/server";
// import decodeJWT from "./utilities/decodeJWT";
// import { TUser } from "./redux/features/auth/interface";
// import getAccessToken from "./lib/getAccessToken";

// export async function middleware(request: NextRequest) {
//   let accessToken = request.cookies.get("accessToken")?.value;
//   if (!accessToken) {
//     try {
//       accessToken = await getAccessToken();
//     } catch (error) {
//       return Response.redirect(new URL("/login", request.url));
//     }
//   }

//   const currentUser = decodeJWT(accessToken as string) as TUser;

//   if (currentUser.role !== "admin") {
//     return Response.redirect(new URL("/error", request.url));
//   }

//   if (currentUser.role === "admin" && !request.nextUrl.pathname.startsWith("/dashboard")) {
//     return Response.redirect(new URL("/dashboard", request.url));
//   }

//   return Response;
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|login|registration|error).*)",
//   ],
// };
