import { createClient } from '@/supabase/server';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();

  const nickname = data.nickname as string;
  const password = data.password as string;
  const email = data.email as string;
  console.log(nickname, password, email);
  const supabase = createClient();
  const {
    data: { user },
    error: signUpError,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
      // emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`, 배포할 때 사용, 이메일 확인 후 리디렉션
    },
  });
  if (signUpError) {
    return NextResponse.json({ error: signUpError.message }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json({ message: 'Sign up process initiated, but no data returned' }, { status: 200 });
  }

  return NextResponse.json(user);
}
