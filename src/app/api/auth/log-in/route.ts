import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(requset: NextRequest) {
  const data = await requset.json();
  const password = data.password as string;
  const email = data.email as string;

  const supabase = createClient();
  const {
    data: { user },
    error: signInError,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (signInError) {
    return NextResponse.json({ error: signInError.message }, { status: 400 });
  }
  if (!user) {
    return NextResponse.json({ message: 'Sign in process initiated, but no data returned' }, { status: 200 });
  }

  return NextResponse.json(user);
}
