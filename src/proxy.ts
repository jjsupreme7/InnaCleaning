import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return false;

  const secret = getSecret();
  if (!secret) return false;

  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

function isLocalPreview(req: NextRequest): boolean {
  if (process.env.NODE_ENV === 'production') return false;
  const hostname = req.nextUrl.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isLocalPreview(req)) {
    return NextResponse.next();
  }

  // Admin auth
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const authed = await isAuthenticated(req);
    if (!authed) {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // Portal auth is handled client-side in portal/page.tsx
  // Supabase JS v2 stores sessions in localStorage, not cookies,
  // so server-side proxy cannot check auth state

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
