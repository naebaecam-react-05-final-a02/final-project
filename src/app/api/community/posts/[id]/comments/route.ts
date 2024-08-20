import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const postId = params.id;

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    const { data: comments, error: commentsError } = await supabase
      .from('communityComment')
      .select('*, user:users(id, nickname, profileURL, level)')
      .eq('postId', postId)
      .order('createdAt', { ascending: true });

    if (commentsError) throw commentsError;

    const { data: likes, error: likesError } = await supabase
      .from('communityCommentLikes')
      .select('commentId')
      .eq('userId', user?.id)
      .in(
        'commentId',
        comments.map((comment) => comment.id),
      );

    if (likesError) throw likesError;

    const likedCommentIds = new Set(likes.map((like) => like.commentId));

    const commentsWithLikeInfo = comments.map((comment) => ({
      ...comment,
      isLiked: likedCommentIds.has(comment.id),
    }));

    return NextResponse.json(commentsWithLikeInfo, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '댓글 조회에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const postId = params.id;

  try {
    const { content } = await request.json();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류입니다.' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('communityComment')
      .insert({ postId, userId: user.id, content })
      .select('*, user:users(id, nickname, profileURL, level)')
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '댓글 등록에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = createClient();

  try {
    const { id, content } = await request.json();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류입니다.' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('communityComment')
      .update({ content })
      .eq('id', id)
      .eq('userId', user.id)
      .select('*, user:users(id, nickname, profileURL, level)')
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '댓글 수정에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = createClient();

  try {
    const { id } = await request.json();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류입니다.' }, { status: 401 });
    }

    const { error } = await supabase.from('communityComment').delete().eq('id', id).eq('userId', user.id);

    if (error) throw error;
    return NextResponse.json({ message: '댓글이 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '댓글 삭제에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
