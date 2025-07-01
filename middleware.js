import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  if (!pathname.startsWith('/admin')) return NextResponse.next();

  const token = req.cookies.get('admin-token')?.value;

  // Permissions
  const readOnly = 'Jaishreekrishna@123';
  const fullAccess = 'Jaishreeram@bm';

  if (!token) {
    url.pathname = '/admin-login';
    return NextResponse.redirect(url);
  }

  if (token !== readOnly && token !== fullAccess) {
    url.pathname = '/admin-login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
