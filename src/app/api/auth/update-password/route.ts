import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { newPassword, token } = await request.json();

  const supabase = createClient();

  try {
    await supabase.auth.exchangeCodeForSession(token);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      console.error('Password update error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'The password has been successfully changed.' }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred, please try again.' }, { status: 500 });
  }
}
