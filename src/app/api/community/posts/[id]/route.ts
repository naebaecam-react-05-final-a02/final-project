import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { id: postId } = params;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 401 });
  }

  const userId = user?.id;

  const { data: postData, error: postError } = await supabase
    .from('communityPosts')
    .select(
      `
      *,
      user:userId (
        id,
        nickname,
        profileURL,
        level
      ),
      isLiked:communityPostsLikes!left(id),
      commentCount:communityComment(count),
      answerCount:communityAnswer(count)
    `,
    )
    .eq('id', postId)
    .eq('communityPostsLikes.userId', userId)
    .single();

  if (postError) {
    return NextResponse.json({ error: postError.message }, { status: 400 });
  }

  const { data: viewData, error: viewError } = await supabase.rpc('incrementViewCount', {
    p_post_id: parseInt(postId),
    p_user_id: userId,
  });

  if (viewError) {
    console.error('Error incrementing view count:', viewError);
  }
  let responseCount;
  let isLiked;
  if (postData.category === 'Q&A 게시판') {
    const { data: isLike, error: isLikeError } = await supabase
      .from('communityPostsLikes')
      .select('*')
      .eq('userId', user?.id);

    if (isLikeError) throw isLikeError;
    responseCount = postData.answerCount?.[0]?.count || 0;

    const likeInfo = isLike.find((like) => like.postId === postData.id);
    const postWithLikes = {
      ...postData,
      isLiked: likeInfo ? likeInfo.isLike : null,
    };

    return NextResponse.json({
      ...postWithLikes,
      responseCount,
      views: viewData?.views || postData.views,
    });
  } else {
    responseCount = postData.commentCount?.[0]?.count || 0;
    isLiked = postData.isLiked.length > 0;
  }

  return NextResponse.json({
    ...postData,
    responseCount,
    isLiked,
    views: viewData?.views || postData.views,
  });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { id } = params;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, content, tags } = await request.json();

    const { data, error } = await supabase
      .from('communityPosts')
      .update({ title, content, tags })
      .eq('id', id)
      .eq('userId', user.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ message: '게시글이 성공적으로 수정되었습니다.', data }, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: '게시글 수정에 실패했습니다.' }, { status: 500 });
  }
}
