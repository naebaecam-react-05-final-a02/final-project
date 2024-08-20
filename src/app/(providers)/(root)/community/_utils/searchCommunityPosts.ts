import { createClient } from '@/supabase/client';

export async function searchCommunityPosts(searchTerm: string = '', category: string = '전체', userId: string) {
  const supabase = createClient();

  let query = supabase.from('communityPosts').select(
    `
      *,
      user:userId (
        id,
        nickname,
        profileURL
      ),
      commentCount:communityComment(count),
      answerCount:communityAnswer(count),
      isLiked:communityPostsLikes!left(id)
    `,
    { count: 'exact' },
  );

  // 투표 카테고리 제외
  query = query.neq('category', '투표');

  // 카테고리 필터링
  if (category !== '전체') {
    query = query.eq('category', category);
  }

  // 제목 검색
  if (searchTerm) {
    query = query.ilike('title', `%${searchTerm}%`);
  }

  const {
    data: posts,
    error: postsError,
    count,
  } = await query.eq('communityPostsLikes.userId', userId).order('createdAt', { ascending: false });

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
    totalCount: count || 0,
  };
}
