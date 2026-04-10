import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /portal routes (not /portal/login)
  if (!pathname.startsWith('/portal') || pathname === '/portal/login') {
    return NextResponse.next();
  }

  // Check for Supabase auth tokens in cookies
  const accessToken = req.cookies.get('sb-access-token')?.value
    || req.cookies.get(`sb-${getSupabaseProjectRef()}-auth-token`)?.value;

  // Also check for the session in the standard Supabase cookie format
  const allCookies = req.cookies.getAll();
  const hasAuthCookie = allCookies.some(
    (c) => c.name.includes('auth-token') || c.name.includes('sb-') && c.name.includes('-auth')
  );

  if (!hasAuthCookie && !accessToken) {
    const loginUrl = new URL('/portal/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

function getSupabaseProjectRef(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  // Extract project ref from URL: https://<ref>.supabase.co
  const match = url.match(/https:\/\/([^.]+)\.supabase/);
  return match?.[1] || '';
}

export const config = {
  matcher: ['/portal/:path*'],
};
