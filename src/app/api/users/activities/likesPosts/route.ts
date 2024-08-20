import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) return NextResponse.json(JSON.stringify({ error: authError.message }), { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page'));
  const limit = Number(searchParams.get('limit'));

  const from = (page - 1) * limit;
  const to = page * limit;

  const { data: processedData, error } = await supabase
    .from('communityPostsLikes')
    .select(
      `*, post:communityPosts(*
      , user:users!userId(id,
        nickname,
        profileURL,
        level
        )
        ,commentCount:communityComment!id(count),
      answerCount:communityAnswer!id(count),
      isLiked:communityPostsLikes!left(id))`,
      { count: 'exact' },
    )
    .eq('userId', user?.id)
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message, data: null, nextPage: null });
  }

  const data = processedData.map((item) => ({
    ...item,
    post: {
      ...item.post,
      commentCount:
        item.post.category === 'Q&A 게시판'
          ? item.post.answerCount[0]?.count || 0
          : item.post.commentCount[0]?.count || 0,
      isLiked: item.post.isLiked.length > 0,
    },
  }));

  if (!data || data.length < 1) {
    return NextResponse.json({
      error: `${page} Page does not exist`,
      data: null,
      nextPage: null,
    });
  }

  if (data.length > limit) {
    const response = data.slice(0, limit);
    const nextPage = page + 1;
    return NextResponse.json({ error: null, data: response, nextPage });
  } else {
    const nextPage = null;
    return NextResponse.json({ error: null, data, nextPage });
  }
}
