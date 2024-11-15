import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const pathToRedirect: string = '/login'
    const pathname = req.nextUrl.pathname
    console.log(pathname)
    try {
        const cookie = await cookies()
        const session = cookie.get('session')
        if (session) {
            const response = NextResponse.redirect(new URL(pathToRedirect, req.url));
            response.cookies.set('session', '', { maxAge: -1 }); // Hapus cookie
            return response;
            // return new NextResponse({status: 200})
        }
    } catch (error) {
        return NextResponse.redirect(new URL(pathname, req.url));
    }
    return NextResponse.redirect(new URL(pathToRedirect, req.url));
}