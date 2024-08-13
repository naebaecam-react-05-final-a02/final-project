import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { id } = params;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, content, tags } = await request.json();

    const { data, error } = await supabase
      .from('communityPosts')
      .update({ title, content, tags })
      .eq('id', id)
      .eq('userId', user.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ message: '게시글이 성공적으로 수정되었습니다.', data }, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: '게시글 수정에 실패했습니다.' }, { status: 500 });
  }
}
