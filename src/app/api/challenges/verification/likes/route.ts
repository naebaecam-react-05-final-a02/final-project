import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const challengeId = searchParams.get('challengeId');
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const isLike = await supabase
    .from('challengeVerificationLikes')
    .select('*')
    .eq('challengeId', challengeId)
    .eq('userId', user?.id)
    .single();

  console.log(isLike);
  return NextResponse.json({ status: 200 });
}
