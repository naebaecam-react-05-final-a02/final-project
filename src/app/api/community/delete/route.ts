import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  const supabase = createClient();

  // 사용자 인증 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id } = await request.json();

    // 게시물 존재 여부 및 사용자 권한 확인
    const { data: post, error: fetchError } = await supabase
      .from('communityPosts')
      .select('userId')
      .eq('id', id)
      .single();

    if (fetchError || !post) {
      return NextResponse.json({ error: '게시물을 찾을 수 없습니다.' }, { status: 404 });
    }

    if (post.userId !== user.id) {
      return NextResponse.json({ error: '삭제 권한이 없습니다.' }, { status: 403 });
    }

    // 게시물 삭제
    const { error: deleteError } = await supabase.from('communityPosts').delete().eq('id', id);

    if (deleteError) throw deleteError;

    return NextResponse.json({ message: '게시글이 성공적으로 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: '게시글 삭제에 실패했습니다.' }, { status: 500 });
  }
}
