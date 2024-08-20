import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category');

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 401 });
  }

  const userId = user?.id;

  // 투표 카테고리의 최신 게시글 가져오기
  const { data: latestVotePost, error: voteError } = await supabase
    .from('communityPosts')
    .select('*')
    .eq('category', '투표')
    .order('createdAt', { ascending: false })
    .limit(1)
    .single();

  if (voteError && voteError.code !== 'PGRST116') {
    return NextResponse.json({ error: voteError.message }, { status: 400 });
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
    return NextResponse.json({ error: postsError.message }, { status: 400 });
  }

  const processedData = posts.map((post) => ({
    ...post,
    commentCount: post.category === 'Q&A 게시판' ? post.answerCount[0]?.count || 0 : post.commentCount[0]?.count || 0,
    isLiked: post.isLiked.length > 0,
  }));
  return NextResponse.json({
    data: processedData,
    latestVotePost,
    page,
    limit,
    totalCount: count,
  });
}
