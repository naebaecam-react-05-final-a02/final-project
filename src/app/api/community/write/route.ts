import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const MAX_TITLE_LENGTH = 50;

export async function POST(request: NextRequest) {
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
    const { title, content, category, tags } = await request.json();

    // 서버 측 유효성 검사
    if (!title || title.trim().length === 0) {
      return NextResponse.json({ error: '제목을 입력해주세요.' }, { status: 400 });
    }
    if (title.length > MAX_TITLE_LENGTH) {
      return NextResponse.json({ error: `제목은 ${MAX_TITLE_LENGTH}자를 초과할 수 없습니다.` }, { status: 400 });
    }
    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: '내용을 입력해주세요.' }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ error: '카테고리를 선택해주세요.' }, { status: 400 });
    }

    // Supabase에 데이터 삽입
    const { data, error } = await supabase
      .from('communityPosts')
      .insert({
        userId: user.id,
        title: title.trim(),
        content: content.trim(),
        category,
        tags,
      })
      .select()
      .single();

    if (error) throw error;
    const postId = data?.id;
    if (category === 'Q&A 게시판') {
      const { error } = await supabase.from('communityQa').insert({
        questionId: postId,
        questionUserId: user.id,
      });
      if (error) throw error;
    }
    return NextResponse.json({ message: '게시글이 성공적으로 등록되었습니다.', data }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: '게시글 등록에 실패했습니다.' }, { status: 500 });
  }
}
