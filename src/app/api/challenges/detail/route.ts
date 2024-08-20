import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const supabase = createClient();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('challenges')
      .select(
        `*,participants:challengeParticipants(userId),user:users(*), challengeParticipants:challengeParticipants(count),
        challengeVerify:challengeVerify(count)
    `,
      )
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const sortedData = {
      ...data,
      participantsCount: data.challengeParticipants[0]?.count ?? 0,
      verificationsCount: data.challengeVerify[0]?.count ?? 0,
    };
    return NextResponse.json(sortedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
