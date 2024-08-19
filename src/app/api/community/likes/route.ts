import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const supabase = createClient();
  const { id, likeType, isAnswer } = await request.json();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류입니다.' }, { status: 401 });
    }

    const table = isAnswer ? 'communityAnswer' : 'communityPosts';
    const likesTable = isAnswer ? 'communityAnswerLikes' : 'communityPostsLikes';
    const idField = isAnswer ? 'answerId' : 'postId';

    // 기존 좋아요 확인
    const { data: existingLike, error: likeCheckError } = await supabase
      .from(likesTable)
      .select()
      .eq(idField, id)
      .eq('userId', user.id)
      .single();

    if (likeCheckError && likeCheckError.code !== 'PGRST116') {
      throw likeCheckError;
    }

    // 좋아요 처리
    if (existingLike) {
      if (likeType === null) {
        // 좋아요 취소
        await supabase.from(likesTable).delete().eq(idField, id).eq('userId', user.id);
      } else if (existingLike.isLike !== (likeType === 'like')) {
        // 좋아요/싫어요 변경
        await supabase
          .from(likesTable)
          .update({ isLike: likeType === 'like' })
          .eq(idField, id)
          .eq('userId', user.id);
      }
    } else if (likeType !== null) {
      // 새 좋아요/싫어요
      await supabase.from(likesTable).insert({ [idField]: id, userId: user.id, isLike: likeType === 'like' });
    }

    // 좋아요 수 계산
    const { data: likeCounts, error: countError } = await supabase
      .from(likesTable)
      .select('isLike', { count: 'exact' })
      .eq(idField, id);

    if (countError) throw countError;

    const likes = likeCounts.filter((v) => v.isLike === true).length;
    const dislikes = likeCounts.filter((v) => v.isLike === false).length;
    const score = likes - dislikes;
    // 테이블 업데이트
    await supabase.from(table).update({ likes, dislikes, score }).eq('id', id);

    return NextResponse.json({ likes, dislikes, score, likeType }, { status: 200 });
  } catch (error) {
    console.error('Like error:', error);
    return NextResponse.json({ message: '좋아요 처리에 실패했습니다.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ message: '인증 오류입니다.' }, { status: 401 });
  }

  try {
    // 사용자가 좋아요한 게시물 ID 목록 가져오기
    const { data: likedPosts, error: likeError } = await supabase
      .from('communityPostsLikes')
      .select('postId')
      .eq('userId', user.id);

    if (likeError) throw likeError;

    // postId만 추출하여 배열로 반환
    const likedPostIds = likedPosts.map((item) => item.postId);

    return NextResponse.json({
      data: likedPostIds,
      message: '좋아요한 게시물 ID 목록을 성공적으로 가져왔습니다.',
    });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '좋아요한 게시물 ID 목록 조회에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
