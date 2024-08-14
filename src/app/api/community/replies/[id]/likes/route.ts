import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { replyId: string } }) {
  const supabase = createClient();
  const replyId = params.replyId;

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류입니다.' }, { status: 401 });
    }

    // 1. 현재 좋아요 상태 확인
    const { data: existingLike, error: likeCheckError } = await supabase
      .from('communityReplyLikes')
      .select()
      .eq('replyId', replyId)
      .eq('userId', user.id)
      .single();

    if (likeCheckError && likeCheckError.code !== 'PGRST116') {
      throw likeCheckError;
    }

    let isLiked;

    // 2. 좋아요 토글
    if (existingLike) {
      const { error: deleteError } = await supabase
        .from('communityReplyLikes')
        .delete()
        .eq('replyId', replyId)
        .eq('userId', user.id);

      if (deleteError) throw deleteError;
      isLiked = false;
    } else {
      const { error: insertError } = await supabase.from('communityReplyLikes').insert({ replyId, userId: user.id });

      if (insertError) throw insertError;
      isLiked = true;
    }

    // 3. 좋아요 수 계산
    const { count, error: countError } = await supabase
      .from('communityReplyLikes')
      .select('*', { count: 'exact', head: true })
      .eq('replyId', replyId);

    if (countError) throw countError;

    // 4. communityReply 테이블 업데이트
    const { error: updateError } = await supabase.from('communityReply').update({ likes: count }).eq('id', replyId);

    if (updateError) throw updateError;

    return NextResponse.json({ isLiked, likes: count }, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '좋아요 토글에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest, { params }: { params: { replyId: string } }) {
  const supabase = createClient();
  const replyId = params.replyId;

  try {
    const { data, error } = await supabase.from('communityReplyLikes').select('userId').eq('replyId', replyId);

    if (error) throw error;

    const likedUserIds = data.map((like) => like.userId);
    return NextResponse.json(likedUserIds, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '좋아요 목록 조회에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
