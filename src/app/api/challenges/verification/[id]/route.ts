import { createClient } from '@/supabase/server';
import { verificationsType } from '@/types/challenge';
import _ from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const challengeId = params.id;
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) return NextResponse.json({ error: authError, status: 401 });
  const { data, error: fetchError } = await supabase
    .from('challengeVerify')
    .select(
      '*,users (id, nickname, email,profileURL, level),likes:challengeVerificationLikes(userId, verificationId), likes_count:challengeVerificationLikes(count)',
    )
    .eq('challengeId', challengeId)
    // .gte('date', getStartOfDayISO()) // 인증 오늘꺼만 가져오게?
    // .lte('date', getEndOfDayISO())
    .order('date', { ascending: false });

  if (fetchError) return NextResponse.json({ error: fetchError, status: 400 });

  const verifications = data?.map((item) => {
    // Ensure likes is an array and has the expected structure
    const isLiked = Array.isArray(item.likes)
      ? !_.isEmpty(item.likes.find((like: any) => like.userId === user?.id))
      : [];

    return {
      ...item,
      likes_count: item.likes_count.length !== 0 ? item.likes_count[0]?.count : 0,
      isLiked,
    };
  });

  return NextResponse.json(verifications as verificationsType[]);
}
