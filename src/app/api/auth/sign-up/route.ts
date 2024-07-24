import { createClient } from '@/supabase/server';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  const nickname = data.nickname as string;
  const password = data.password as string;
  const email = data.email as string;

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
    },
  });
  if (signUpError) {
    console.error('Sign up error:', signUpError);
    return NextResponse.json({ error: signUpError.message }, { status: 400 });
  }
  if (!user) {
    return NextResponse.json({ message: 'Sign up process initiated, but no data returned' }, { status: 200 });
  }

  return NextResponse.json(user);
}
