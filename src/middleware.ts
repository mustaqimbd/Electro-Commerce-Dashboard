import con from "@/config/config";
import { NextRequest, NextResponse } from "next/server";
import getAccessToken, { getProfile } from "./lib/getAccessToken";
import { TUser } from "./redux/features/auth/interface";
import { permission } from "./types/order/order.interface";
import decodeJWT from "./utilities/decodeJWT";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("__app.ec.at")?.value || "";
  const refreshToken = request.cookies.get("__app.ec.rt")?.value;

  if (!refreshToken) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (!accessToken) {
    try {
      const token = await getAccessToken(refreshToken);
      const cookieOption = {
        domain: con.env === "production" ? `.${con.main_domain}` : "localhost",
        httpOnly: con.env === "production",
        secure: con.env === "production",
        sameSite: "lax" as const,
        maxAge: Number(con.token_data.access_token_cookie_expires),
      };
      const response = NextResponse.next();
      response.cookies.set("__app.ec.at", token, cookieOption);
      return response;
    } catch (error) {
      return Response.redirect(new URL("/login", request.url));
    }
  }

  const currentUser = decodeJWT(accessToken as string) as TUser; // Decode the JWT

  if (currentUser.role !== "admin" && currentUser.role !== "super admin") {
    return Response.redirect(new URL("/error", request.url));
  }

  const { permissions } = await getProfile(accessToken);

  if (!request.nextUrl.pathname.startsWith("/dashboard")) {
    if (permissions && [...permissions].includes(permission.manageOrder)) {
      return Response.redirect(new URL("/dashboard/orders", request.url));
    } else if (
      permissions &&
      [...permissions].includes(permission.manageProcessing)
    ) {
      return Response.redirect(
        new URL("/dashboard/processing-orders", request.url)
      );
    } else if (
      permissions &&
      [...permissions].includes(permission.manageCourier)
    ) {
      return Response.redirect(
        new URL("/dashboard/courier-management", request.url)
      );
    } else return Response.redirect(new URL("/dashboard", request.url));
  }

  // const { permissions } = await getProfile(accessToken)

  // if (request.nextUrl.pathname === "/dashboard/orders" && permissions && [...permissions].includes(permission.manageOrder)) {
  //   console.log("orders", permissions)
  //   return Response.redirect(new URL("/dashboard/orders", request.url));
  // }
  // if (request.nextUrl.pathname.startsWith("/processing-orders") && permissions && [...permissions].includes(permission.manegeProcessing)) {
  //   console.log("processing", permissions)
  //   return Response.redirect(new URL("/dashboard/processing-orders", request.url));
  // }
  // if (request.nextUrl.pathname.startsWith("/courier-management") && permissions && [...permissions].includes(permission.manegeCourier)) {
  //   console.log("courier", permissions)
  //   return Response.redirect(new URL("/dashboard/orders", request.url));
  // }

  return null;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|login|registration|error).*)",
  ],
};
