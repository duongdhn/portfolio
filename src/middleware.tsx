import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;

        if (!token) {
            return NextResponse.rewrite(new URL("/405", req.url));
        }

        if (req.nextUrl.pathname.startsWith("/profile")) {
            return NextResponse.next();
        }
        return NextResponse.next(); 
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);
export const config = {
    matcher: ["/dashboard", "/profile"],
}