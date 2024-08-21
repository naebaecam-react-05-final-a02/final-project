import { createClient } from '@/supabase/client';
import { CommunityPostData } from '@/types/community';

// 게시글 상세 정보 가져오기
export async function getPostDetail(postId: string): Promise<CommunityPostData> {
  const supabase = createClient();
  const {
    data: { session },
    error: authError,
  } = await supabase.auth.getSession();

  if (authError) {
    throw new Error();
  }

  const userId = session?.user?.id;

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

  if (postError) throw new Error('게시글 가져오기 오류: ' + postError.message);

  const { data: viewData, error: viewError } = await supabase.rpc('incrementViewCount', {
    p_post_id: parseInt(postId),
    p_user_id: userId,
  });

  if (viewError) console.error('Error incrementing view count:', viewError);

  let responseCount;
  let isLiked;

  if (postData.category === 'Q&A 게시판') {
    const { data: isLike, error: isLikeError } = await supabase
      .from('communityPostsLikes')
      .select('*')
      .eq('userId', userId);

    if (isLikeError) throw new Error('좋아요 정보 가져오기 오류: ' + isLikeError.message);

    responseCount = postData.answerCount?.[0]?.count || 0;
    const likeInfo = isLike.find((like) => like.postId === postData.id);
    isLiked = likeInfo ? likeInfo.isLike : null;
  } else {
    responseCount = postData.commentCount?.[0]?.count || 0;
    isLiked = postData.isLiked.length > 0;
  }

  return {
    ...postData,
    responseCount,
    isLiked,
    views: viewData?.views || postData.views,
  };
}
