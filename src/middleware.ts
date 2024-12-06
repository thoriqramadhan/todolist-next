import { cookies } from 'next/headers';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptSession } from "./lib/session";

export async function middleware(req: NextRequest) {
    const publicRoute = ['/login', '/register']
    const pathname = req.nextUrl.pathname;
    const cookie = await cookies()
    const session = cookie.get('session')
    const user = await decryptSession(session?.value)

    const isInPublicRoute = pathname.includes(publicRoute[0]) || pathname.includes(publicRoute[1])
    const isInRootRoute = pathname == '/';

    if (!user && !isInPublicRoute) {
        return NextResponse.redirect(new URL('/login' , req.nextUrl))
    }
    if (user && isInPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard' , req.nextUrl))
    }
    if (isInRootRoute) {
        return NextResponse.redirect(new URL('/dashboard' , req.nextUrl))
    }
    return NextResponse.next();
    // Lakukan pengalihan untuk semua route 
}

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};