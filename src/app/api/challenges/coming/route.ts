import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const today = dayjs().format('YYYY-MM-DD');

  const { data: challengesData, error: challengesError } = await supabase
    .from('challenges')
    .select(
      `
    *,
    challengeParticipants:challengeParticipants(count),
    challengeVerify:challengeVerify(count)
  `,
    )
    .gte('endDate', today)
    .order('startDate', { ascending: false });

  if (challengesError) {
    console.error('Error fetching challenges:', challengesError);
    return NextResponse.json({ error: 'Failed to fetch challenges' }, { status: 500 });
  }
  const sortedChallenges = challengesData
    .map((challenge) => ({
      ...challenge,
      participantsCount: challenge.challengeParticipants[0]?.count ?? 0,
      verificationsCount: challenge.challengeVerify[0]?.count ?? 0,
    }))
    .sort((a, b) => b.participantsCount - a.participantsCount || dayjs(b.startDate).unix() - dayjs(a.startDate).unix());

  const limitedChallenges = sortedChallenges.slice(0, 10);

  return NextResponse.json({ data: limitedChallenges });
}
