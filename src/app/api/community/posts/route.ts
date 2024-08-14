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

  let query = supabase.from('communityPosts').select(
    `
      *,
      user:userId (
        id,
        nickname,
        profileURL
      ),
      commentCount:communityComment(count),
      isLiked:communityPostsLikes!left(id)
    `,
    { count: 'exact' },
  );

  if (category && category !== '전체') {
    query = query.eq('category', category);
  }

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
    commentCount: post.commentCount[0]?.count || 0,
    isLiked: post.isLiked.length > 0,
  }));

  return NextResponse.json({
    data: processedData,
    page,
    limit,
    totalCount: count,
  });
}
