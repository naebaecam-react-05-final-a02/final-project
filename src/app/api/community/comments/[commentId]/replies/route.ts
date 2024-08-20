import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { commentId: string } }) {
  const supabase = createClient();
  const commentId = params.commentId;

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      return NextResponse.json({ message: '인증 오류입니다.' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('communityReply')
      .select(
        `
        *,
        user:users(id, nickname, profileURL, level),
        isLiked:communityReplyLikes!left(id)
      `,
      )
      .eq('commentId', commentId)
      .eq('communityReplyLikes.userId', user?.id)
      .order('createdAt', { ascending: true });

    if (error) throw error;

    const repliesWithLikeInfo = data.map((reply) => ({
      ...reply,
      isLiked: reply.isLiked.length > 0,
    }));

    return NextResponse.json(repliesWithLikeInfo, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '답글 조회에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
export async function POST(request: NextRequest, { params }: { params: { commentId: string } }) {
  const supabase = createClient();
  const commentId = params.commentId;

  try {
    const { content } = await request.json();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류입니다.' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('communityReply')
      .insert({ commentId, userId: user.id, content })
      .select('*, user:users(id, nickname, profileURL, level)')
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '답글 등록에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
