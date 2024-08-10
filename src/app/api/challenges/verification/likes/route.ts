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
    .from('challengeVerify')
    .select(`*, challengeVerificationLikes(verificationId)`)
    .eq('challengeId', challengeId);

  return NextResponse.json({ status: 200 });
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const verificationId = searchParams.get('verificationId');
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) return NextResponse.json({ authError, status: 401 });

  const { data, error: postError } = await supabase.from('challengeVerificationLikes').insert({
    verificationId,
    userId: user?.id,
  });
  if (authError) return NextResponse.json({ postError, status: 400 });
  return NextResponse.json({ data, status: 200 });
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const verificationId = searchParams.get('verificationId');
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) return NextResponse.json({ authError, status: 401 });

  const { data, error: deleteError } = await supabase
    .from('challengeVerificationLikes')
    .delete()
    .eq('verificationId', verificationId)
    .eq('userId', user?.id);
  if (authError) return NextResponse.json({ deleteError, status: 400 });
  return NextResponse.json({ data, status: 200 });
}
