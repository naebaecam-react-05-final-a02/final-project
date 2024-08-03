import { createClient } from '@/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (typeof data.email !== 'string' || typeof data.password !== 'string' || typeof data.keepLoggedIn !== 'boolean') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { email, password, keepLoggedIn } = data;

  const supabase = createClient();
  const {
    data: { user },
    error: signInError,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (signInError) {
    console.error('Detailed sign-in error:', signInError);
    return NextResponse.json(
      {
        error: signInError.message,
        errorCode: signInError.status,
        details: signInError,
      },
      { status: signInError.status || 400 },
    );
  }
  if (!user) {
    return NextResponse.json({ message: 'Sign in process initiated, but no data returned' }, { status: 200 });
  }

  // 로그인 상태 유지 옵션을 쿠키에 저장
  if (keepLoggedIn) {
    cookies().set('keepLoggedIn', 'true', {
      httpOnly: true,
      secure: false, // secure: process.env.NODE_ENV === 'production', 배포 시 변경
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30일
    });
  } else {
    cookies().delete('keepLoggedIn');
  }

  return NextResponse.json(user);
}
