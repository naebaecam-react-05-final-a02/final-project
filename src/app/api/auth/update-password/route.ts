import { createClient } from '@/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { new_password } = await request.json();

  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: new_password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
}
