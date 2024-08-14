import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const replyId = params.id;

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
      .from('communityReply')
      .update({ content })
      .eq('id', replyId)
      .eq('userId', user.id)
      .select('*, user:users(id, nickname, profileURL)')
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '답글 수정에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const replyId = params.id;

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류입니다.' }, { status: 401 });
    }

    const { error } = await supabase.from('communityReply').delete().eq('id', replyId).eq('userId', user.id);

    if (error) throw error;
    return NextResponse.json({ message: '답글이 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '답글 삭제에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
