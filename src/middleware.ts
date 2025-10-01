import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest) {

    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});

    const {data: {
        session
    }, error} = await supabase.auth
    .getSession()

if(req.nextUrl.pathname.startsWith('/dashboard')){
 if(!session){
      console.log('Middleware - Redirecting to login');


const redirectUrl = new URL('/auth/login', req.url);

    redirectUrl.searchParams.set('redirectedForm', req.nextUrl.pathname);
        return NextResponse.redirect(new URL(redirectUrl));

    }
}

if(req.nextUrl.pathname.startsWith('/login')&& session){
    return NextResponse.redirect(new URL('/dashboard', req.url));
}


return res;
    
}
export const config = {
   matcher: [
    '/dashboard/:path*',
    '/login'
]
}
