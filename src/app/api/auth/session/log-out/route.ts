import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const supabase = createClient();
  await supabase.auth.signOut();

  const redirectUrl = new URL('/log-in', request.url);

  return NextResponse.redirect(redirectUrl, {
    status: 302,
  });
}
