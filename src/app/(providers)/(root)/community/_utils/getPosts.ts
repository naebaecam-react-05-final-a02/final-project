import { createClient } from '@/supabase/client';
import { PostsResponse } from '@/types/community';

export async function getPosts(page = 1, category = '전체'): Promise<PostsResponse> {
  const supabase = createClient();
  const limit = 6;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const {
    data: { session },
    error: authError,
  } = await supabase.auth.getSession();

  if (authError) {
    throw new Error();
  }

  const userId = session?.user?.id;

  // 투표 카테고리의 최신 게시글 가져오기
  const { data: latestVotePost, error: voteError } = await supabase
    .from('communityPosts')
    .select('*')
    .eq('category', '투표')
    .order('createdAt', { ascending: false })
    .limit(1)
    .single();

  if (voteError && voteError.code !== 'PGRST116') {
    throw Error;
  }

  // 일반 게시글
  let query = supabase.from('communityPosts').select(
    `
      *,
      user:userId (
        id,
        nickname,
        profileURL,
        level
      ),
      commentCount:communityComment(count),
      answerCount:communityAnswer(count),
      isLiked:communityPostsLikes!left(id)
    `,
    { count: 'exact' },
  );

  if (category && category !== '전체') {
    query = query.eq('category', category);
  }

  query = query.neq('category', '투표');

  const {
    data: posts,
    error: postsError,
    count,
  } = await query.eq('communityPostsLikes.userId', userId).range(from, to).order('createdAt', { ascending: false });

  if (postsError) {
    throw Error;
  }

  const processedData = posts.map((post) => ({
    ...post,
    commentCount: post.category === 'Q&A 게시판' ? post.answerCount[0]?.count || 0 : post.commentCount[0]?.count || 0,
    isLiked: post.isLiked.length > 0,
  }));
  return {
    data: processedData,
    latestVotePost,
    page,
    limit,
    totalCount: count || 0,
  };
}
