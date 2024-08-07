import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    },
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 'keepLoggedIn' 쿠키 확인
  const keepLoggedIn = request.cookies.get('keepLoggedIn')?.value === 'true';

  if (user && keepLoggedIn) {
    // 세션 갱신 시도
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      console.error('Failed to refresh session:', error);
    }
  }

  const publicRoutes = ['/log-in', '/sign-up', '/api', '/reset-password', '/reset-password-request'];
  const authRoutes = ['/log-in', '/sign-up'];

  const path = request.nextUrl.pathname;

  if (user && authRoutes.some((route) => path.startsWith(route))) {
    const redirectUrl = new URL('/', request.url);
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  if (!user && !publicRoutes.some((route) => path.startsWith(route))) {
    const redirectUrl = new URL('/log-in', request.url);
    redirectUrl.pathname = '/log-in';
    return NextResponse.redirect(redirectUrl);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
