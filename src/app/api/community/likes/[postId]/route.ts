import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { postId: string } }) {
  const supabase = createClient();
  const postId = params.postId;
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류입니다.' }, { status: 401 });
    }

    const { data: post, error: postError } = await supabase.from('communityPosts').select().eq('id', postId).single();

    if (postError) {
      throw postError;
    }
    if (post.category !== 'Q&A 게시판') {
      // 1. 현재 좋아요 상태 확인
      const { data: existingLike, error: likeCheckError } = await supabase
        .from('communityPostsLikes')
        .select()
        .eq('postId', post.id)
        .eq('userId', user.id)
        .single();

      if (likeCheckError && likeCheckError.code !== 'PGRST116') {
        throw likeCheckError;
      }

      let isLiked;

      // 2. 좋아요 토글
      if (existingLike) {
        const { error: deleteError } = await supabase
          .from('communityPostsLikes')
          .delete()
          .eq('postId', postId)
          .eq('userId', user.id);

        if (deleteError) throw deleteError;
        isLiked = false;
      } else {
        const { error: insertError } = await supabase
          .from('communityPostsLikes')
          .insert({ postId: postId, userId: user.id });

        if (insertError) throw insertError;
        isLiked = true;
      }

      // 3. 좋아요 수 계산
      const { count, error: countError } = await supabase
        .from('communityPostsLikes')
        .select('*', { count: 'exact', head: true })
        .eq('postId', postId);

      if (countError) throw countError;
      // 4. communityPosts 테이블 업데이트
      const { error: updateError } = await supabase.from('communityPosts').update({ likes: count }).eq('id', postId);

      if (updateError) throw updateError;

      return NextResponse.json({ isLiked, likes: count }, { status: 200 });
    }
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '좋아요 토글에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
