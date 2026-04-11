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

function hasSupabaseSession(req: NextRequest): boolean {
  const cookies = req.cookies.getAll();
  return cookies.some(
    (c) => c.name.includes('auth-token') || (c.name.includes('sb-') && c.name.includes('-auth'))
  );
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

  // Portal auth — redirect to login if no Supabase session
  if (pathname.startsWith('/portal') && pathname !== '/portal/login' && !pathname.startsWith('/portal/reset-password')) {
    if (!hasSupabaseSession(req)) {
      return NextResponse.redirect(new URL('/portal/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/portal/:path*'],
};
