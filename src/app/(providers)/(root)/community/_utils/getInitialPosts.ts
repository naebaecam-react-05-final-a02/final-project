import { createClient } from '@/supabase/server';

import { PostsResponse } from '@/types/community';

export async function getInitialPosts(
  category: string = '전체',
  page: number = 1,
  limit: number = 6,
): Promise<PostsResponse | undefined> {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error('Authentication error:', authError.message);
    return undefined;
  }

  const userId = user?.id;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // 투표 카테고리의 최신 게시글 가져오기
  const { data: latestVotePost, error: voteError } = await supabase
    .from('communityPosts')
    .select('*')
    .eq('category', '투표')
    .order('createdAt', { ascending: false })
    .limit(1)
    .single();

  if (voteError && voteError.code !== 'PGRST116') {
    console.error('Error fetching latest vote post:', voteError.message);
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
    { count: 'planned' },
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
    console.error('Error fetching posts:', postsError.message);
    return undefined;
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
