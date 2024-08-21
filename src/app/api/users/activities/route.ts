import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) return NextResponse.json(JSON.stringify({ error: authError.message }), { status: 401 });

  //TODO: 내가 쓴 글, 내 활동, 내가 좋아요 누른 글
  const { data: likesPosts, error: likesPostsError } = await supabase
    .from('communityPostsLikes')
    .select(`*, communityPosts(*)`)
    .eq('userId', user?.id);

  if (likesPostsError) return NextResponse.json(JSON.stringify({ error: likesPostsError.message }), { status: 500 });

  const { data: myPosts, error: myPostsError } = await supabase
    .from('communityPosts')
    .select('*')
    .eq('userId', user?.id);

  if (myPostsError) return NextResponse.json(JSON.stringify({ error: myPostsError.message }), { status: 500 });

  const { data: myAnswers, error: myAnswersError } = await supabase
    .from('communityAnswer')
    .select('*, communityPosts(*)')
    .eq('userId', user?.id);

  if (myAnswersError) return NextResponse.json(JSON.stringify({ error: myAnswersError.message }), { status: 500 });

  // console.log('likesPosts', likesPosts);
  // console.log('myPosts', myPosts);
  // console.log('myAnswers', myAnswers);

  return NextResponse.json({ likesPosts, myPosts, myAnswers });
}
