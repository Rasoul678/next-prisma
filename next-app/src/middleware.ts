import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Routes } from "./lib/constants";
import { verifySession } from "./lib/dal";

//! Specify protected and public routes
const protectedRoutes = [Routes.HOME];
const publicRoutes = [Routes.AUTH];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const headers = new Headers(request.headers);
  headers.set("x-next-pathname", pathname);

  //! Check if the current route is protected or public
  const isProtectedRoute = protectedRoutes.includes(pathname as Routes);
  const isPublicRoute = publicRoutes.includes(pathname as Routes);

  //! Get session from the cookie
  const { isAuth } = await verifySession();

  //! Redirect to "/auth" if the user is not authenticated
  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL(Routes.AUTH, request.nextUrl));
  }

  //! Redirect to "/" if the user is authenticated
  if (isPublicRoute && isAuth) {
    return NextResponse.redirect(new URL(Routes.HOME, request.nextUrl));
  }

  return NextResponse.next({ headers });
}

//* Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)"],
};
