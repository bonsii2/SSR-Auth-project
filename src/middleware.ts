import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();

  // Debug logging
  console.log('Middleware - Path:', req.nextUrl.pathname);
  console.log('Middleware - Session exists:', !!session);

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      console.log('Middleware - Redirecting to login');

      const redirectUrl = new URL('/auth/login', req.url);
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Redirect if already logged in and trying to access login page
  if (req.nextUrl.pathname.startsWith('/auth/login') && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/login'
  ]
};