import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
  function middleware(request: NextRequest) {
    return NextResponse.rewrite(new URL(request.url));
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        // `/dashboard` requires admin role
        if (pathname.startsWith("/dashboard")) {
          return token?.role === "Admin" || token?.role === "Manager";
        }
        // `/other` only requires the user to be logged in
        return !!token;
      },
    },
  }
);

export const config = {
  // matcher: ["/profile/:patch*"],
  matcher: ["/dashboard/:patch*", "/profile/:patch*", "/success/:patch*"],
};
