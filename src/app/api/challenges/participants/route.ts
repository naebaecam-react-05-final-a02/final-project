import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) return NextResponse.json({ status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const challengeId = searchParams.get('challengeId');

  const { error: challengeJoinError } = await supabase.from('challengeParticipants').insert({
    challengeId,
    userId: user?.id,
  });

  if (challengeJoinError) {
    return new NextResponse(challengeJoinError.message, { status: 500 });
  }

  const { count: participantsCount, error: participantsCountError } = await supabase
    .from('challengeParticipants')
    .select('*', { count: 'exact', head: true })
    .eq('challengeId', challengeId);

  if (participantsCountError) {
    return new NextResponse(participantsCountError.message, { status: 500 });
  }

  const { error: participantsCountUpdateError } = await supabase
    .from('challenges')
    .update({ participants: participantsCount })
    .eq('id', challengeId);

  if (participantsCountUpdateError) {
    return new NextResponse(participantsCountUpdateError.message, { status: 500 });
  }

  return NextResponse.json({
    status: 200,
  });
}
