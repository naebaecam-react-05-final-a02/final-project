import { createClient } from '@/supabase/server';
import { CommunityPostData } from '@/types/community';

export async function getPostDetail(postId: string): Promise<CommunityPostData> {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw new Error(authError.message);

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

  if (postError) throw new Error(postError.message);

  supabase
    .rpc('incrementViewCount', {
      p_post_id: parseInt(postId),
      p_user_id: userId,
    })
    .then(({ error }) => {
      if (error) console.error('Error incrementing view count:', error);
    });

  let responseCount;
  let isLiked;

  if (postData.category === 'Q&A 게시판') {
    const { data: isLike, error: isLikeError } = await supabase
      .from('communityPostsLikes')
      .select('*')
      .eq('userId', user?.id);

    if (isLikeError) throw new Error(isLikeError.message);

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
    views: postData.views + 1,
  };
}
